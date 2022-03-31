import 'isomorphic-fetch'
import { Researcher, Participant } from "./model/index"
import {
  ActivityEventService,
  ActivityService,
  ActivitySpecService,
  APIService,
  CredentialService,
  OAuthService,
  ParticipantService,
  ResearcherService,
  SensorEventService,
  SensorService,
  SensorSpecService,
  StudyService,
  TypeService
} from "./service/index"
import { Configuration } from "./service/Fetch"
import { Demo } from "./service/Demo"

export * from "./service/index"
export * from "./model/index"

/**
 *
 */
interface IAuth {
  id: string | null
  password: string | null
  serverAddress: string | undefined
}

interface OAuthParams {
  serverAddress: string | undefined
  codeVerifier: string | undefined
}

//
const _bus: HTMLElement | undefined = (global as any).document?.createElement("_lamp_fake")

/**
 * The root type in LAMP. You must use `LAMP.connect(...)` to begin using any LAMP classes.
 */
export default class LAMP {
  public static Activity = new ActivityService()
  public static ActivityEvent = new ActivityEventService()
  public static ActivitySpec = new ActivitySpecService()
  public static API = new APIService()
  public static Credential = new CredentialService()
  public static OAuth = new OAuthService()
  public static Participant = new ParticipantService()
  public static Researcher = new ResearcherService()
  public static Sensor = new SensorService()
  public static SensorEvent = new SensorEventService()
  public static SensorSpec = new SensorSpecService()
  public static Study = new StudyService()
  public static Type = new TypeService()
  private static get configuration(): Configuration | undefined {
    return LAMP.API.configuration
  }
  private static set configuration(configuration: Configuration | undefined) {
    LAMP.Activity.configuration = configuration
    LAMP.ActivityEvent.configuration = configuration
    LAMP.ActivitySpec.configuration = configuration
    LAMP.API.configuration = configuration
    LAMP.Credential.configuration = configuration
    LAMP.OAuth.configuration = configuration
    LAMP.Participant.configuration = configuration
    LAMP.Researcher.configuration = configuration
    LAMP.Sensor.configuration = configuration
    LAMP.SensorEvent.configuration = configuration
    LAMP.SensorSpec.configuration = configuration
    LAMP.Study.configuration = configuration
    LAMP.Type.configuration = configuration
  }

  public static addEventListener(event: string, callback: (any) => void) {
    _bus?.addEventListener(event, callback)
  }
  public static removeEventListener(event: string, callback: (any) => void) {
    _bus?.removeEventListener(event, callback)
  }
  public static dispatchEvent(event: string, detail: any = null) {
    _bus?.dispatchEvent(new CustomEvent(event, { detail }))
  }

  //
  // [Demo API]
  //

  public static initializeDemoDB(db: { [key: string]: any; }) {
    db = JSON.parse(JSON.stringify(db)) // make a deep copy first!
    Demo.ActivitySpec = db.ActivitySpec ?? []
    Demo.SensorSpec = db.SensorSpec ?? []
    Demo.Researcher = db.Researcher ?? []
    Demo.Study = db.Study ?? []
    Demo.Participant = db.Participant ?? []
    Demo.Activity = db.Activity ?? []
    Demo.Sensor = db.Sensor ?? []
    Demo.ActivityEvent = db.ActivityEvent ?? []
    Demo.SensorEvent = db.SensorEvent ?? []
    Demo.Credential = db.Credential ?? []
    Demo.Tags = db.Tags ?? []
  }

  //
  // [Credential/Identity Management]
  //

  // Shorthand for console/data analysis usage.
  public static async connect(
    identity: {
      serverAddress: string | undefined
      accessKey: string | null
      secretKey: string | null
    } = {
      serverAddress: undefined,
      accessKey: null,
      secretKey: null
    }
  ) {
    // Propogate the authorization.
    LAMP.Auth._auth = {
        id: identity.accessKey,
        password: identity.secretKey,
        serverAddress: identity.serverAddress
    }
    LAMP.configuration = {
        base: !!identity.serverAddress ? `https://${identity.serverAddress}` : "https://api.lamp.digital",
        authorization: !!LAMP.Auth._auth.id ? `${LAMP.Auth._auth.id}:${LAMP.Auth._auth.password}` : undefined
    }
  }

  public static Auth = class {
    public static _auth: IAuth = { id: null, password: null, serverAddress: null }
    public static _oauth: OAuthParams = { serverAddress: undefined, codeVerifier: undefined }
    public static _me: Researcher[] | Researcher | Participant | null | undefined
    public static _type: "admin" | "researcher" | "participant" | null = null

    public static async set_oauth_params(params: OAuthParams) {
      LAMP.configuration = {
        base: !!params.serverAddress ? `https://${params.serverAddress}` : "https://api.lamp.digital"
      }

      // Propagate the authorization.
      LAMP.Auth._oauth = params

      // Save the authorization in sessionStorage for later.
      sessionStorage?.setItem("LAMP._oauth", JSON.stringify(LAMP.Auth._oauth))
    }

    /**
     * Authenticate/authorize as a user of a given `type`.
     * If all values are null (especially `type`), the authorization is cleared.
     */
    public static async set_identity(
      identity: { id: string | null; password: string | null; serverAddress: string | undefined } = {
        id: null,
        password: null,
        serverAddress: undefined
      }
    ) {
      LAMP.configuration = {
        base: !!identity.serverAddress ? `https://${identity.serverAddress}` : "https://api.lamp.digital"
      }

      // Ensure there's actually a change to process.
      let l: IAuth = LAMP.Auth._auth || { id: null, password: null, serverAddress: null }
      if (l.id === identity.id && l.password === identity.password && l.serverAddress === identity.serverAddress) return

      // Propogate the authorization.
      LAMP.Auth._auth = {
        id: identity.id,
        password: identity.password,
        serverAddress: identity.serverAddress
      }
      LAMP.configuration = {
        ...(LAMP.configuration || { base: undefined, headers: undefined }),
        authorization: !!LAMP.Auth._auth.id ? `${LAMP.Auth._auth.id}:${LAMP.Auth._auth.password}` : undefined
      }

      try {
        // If we aren't clearing the credential, get the "self" identity.
        if (!!identity.id && !!identity.password) {
          // Get our 'me' context so we know what object type we are.
          let typeData
          try {
            typeData = await LAMP.Type.parent("me")
          } catch (e) {}
          LAMP.Auth._type =
            typeData.error === "400.context-substitution-failed"
              ? "admin"
              : Object.entries(typeData.data).length === 0
              ? "researcher"
              : !!typeData.data
              ? "participant"
              : null

          // Get our 'me' object now that we figured out our type.
          LAMP.Auth._me = await (LAMP.Auth._type === "admin"
            ? { id: identity.id }
            : LAMP.Auth._type === "researcher"
            ? LAMP.Researcher.view("me")
            : LAMP.Participant.view("me"))

          LAMP.dispatchEvent("LOGIN", {
            authorizationToken: LAMP.configuration.authorization,
            identityObject: LAMP.Auth._me,
            serverAddress: LAMP.configuration.base
          })
        } else {
          LAMP.dispatchEvent("LOGOUT", {
            deleteCache: true // FIXME!
          })
        }
      } catch (err) {
        // We failed: clear and propogate the authorization.
        LAMP.Auth._auth = { id: null, password: null, serverAddress: null }
        if (!!LAMP.configuration) LAMP.configuration.authorization = undefined

        // Delete the "self" identity and throw the error we received.
        LAMP.Auth._me = null
        LAMP.Auth._type = null
        throw new Error("invalid id or password")
      } finally {
        // Save the authorization in sessionStorage for later.
        (global as any).sessionStorage?.setItem("LAMP._auth", JSON.stringify(LAMP.Auth._auth))
      }
    }

    public static async refresh_identity() {
      let _saved = JSON.parse((global as any).sessionStorage?.getItem("LAMP._auth") ?? "null") || LAMP.Auth._auth
      await LAMP.Auth.set_identity({
        id: _saved.id,
        password: _saved.password,
        serverAddress: _saved.serverAddress
      })
    }
  }
}

export const main = () => {
  if (process === undefined) {
    console.error("This function cannot be invoked from within the library.")
    return
  }
  console.log("This command-line tool is currently disabled.")
  process?.exit(1)
}
