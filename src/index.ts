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
import { Configuration, Fetch } from './service/Fetch';
import { Demo } from "./service/Demo"

import jwt_decode from "jwt-decode"

export * from "./service/index"
export * from "./model/index"

/**
 *
 */
interface IAuth {
  accessToken?: string,
  id?: null,
  password?: null,
  serverAddress?: string,
}

interface IdentityObj {
  accessToken?: string,
  serverAddress?: string,
}

interface UserAttributes {
  id: string,
  roles: ("admin" | "researcher" | "participant")[]
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

  public static initializeDemoDB(db: { [key: string]: any }) {
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
      secretKey: null,
    }
  ) {
    // Propogate the authorization.
    LAMP.Auth._auth = {
      serverAddress: identity.serverAddress,
    }
    LAMP.configuration = {
      base: !!identity.serverAddress ? identity.serverAddress : "api.lamp.digital",
      authorization: !!LAMP.Auth._auth.id ? `${LAMP.Auth._auth.id}:${LAMP.Auth._auth.password}` : undefined,
    }
  }

  public static Auth = class {
    public static _auth: IAuth = { id: null, password: null, serverAddress: null, accessToken: null }
    public static _me: Researcher[] | Researcher | Participant | null | undefined
    public static _type: "admin" | "researcher" | "participant" | null = null

    /**
     * Authenticate/authorize as a user of a given `type`.
     * If all values are null (especially `type`), the authorization is cleared.
     */
    public static async set_identity(
      identity: IdentityObj = {
        accessToken: null,
        serverAddress: null,
      }
    ) {
      let attributes: UserAttributes
      if (!!identity.accessToken) {
        attributes = getUserAttributes(identity.accessToken)
      } else {
        attributes = null
      }

      let serverAddress
      if(!!identity.serverAddress) {
        serverAddress = identity.serverAddress.replace("http://", "").replace("https://", "")
      } else if(!!LAMP.configuration?.base) {
        serverAddress = LAMP.configuration?.base
      } else {
        serverAddress = "api.lamp.digital"
      }

      LAMP.configuration = {
        ...LAMP.configuration,
        base: serverAddress,
      }

      // Ensure there's actually a change to process.
      let l: IAuth = LAMP.Auth._auth || { accessToken: null, serverAddress: null }
      if (l.accessToken === identity.accessToken && l.serverAddress === serverAddress) return

      // Propogate the authorization.
      LAMP.Auth._auth = {
        accessToken: identity.accessToken,
        serverAddress: serverAddress,
      }

      LAMP.configuration = {
        ...LAMP.configuration,
        authorization: `Bearer ${identity.accessToken}`,
      }

      try {
        // If we aren't clearing the credential, get the "self" identity.
        if (!!attributes) {
          // Get our 'me' context and 'me' object
          if (attributes.roles.includes("admin")) {
            this._type = "admin"
            this._me = { id: attributes.id }
          } else if (attributes.roles.includes("researcher")) {
            this._type = "researcher"
            this._me = await LAMP.Researcher.view("me")
          } else if (attributes.roles.includes("participant")) {
            this._type = "participant"
            this._me = await LAMP.Participant.view("me")
          } else {
            this._type = null
            this._me = null
          }

          LAMP.dispatchEvent("LOGIN", {
            authorizationToken: LAMP.configuration.authorization,
            identityObject: LAMP.Auth._me,
            serverAddress: LAMP.configuration.base,
          })
        } else {
          LAMP.dispatchEvent("LOGOUT", {
            deleteCache: true, // FIXME!
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
        ;(global as any).sessionStorage?.setItem("LAMP._auth", JSON.stringify(LAMP.Auth._auth))
      }
    }

    public static async refresh_identity() {
      let _saved = JSON.parse((global as any).sessionStorage?.getItem("LAMP._auth") ?? "null") || LAMP.Auth._auth
      await LAMP.Auth.set_identity({
        accessToken: _saved.accessToken,
        serverAddress: _saved.serverAddress,
      })
    }

    public static async get_legacy_token(
      identity: { id: string; password: string },
      serverAddress: string
    ): Promise<string> {
      LAMP.configuration = {
        ...LAMP.configuration,
        base: serverAddress,
      }

      const body = await Fetch.post<any>(
        "/token",
        { id: identity.id, password: identity.password },
        LAMP.configuration
      )

      return body.access_token
    }
  }
}

const getUserAttributes = (accessToken: string): UserAttributes => {
  try {
    const payload = jwt_decode<any>(accessToken)
    const { id, roles } = payload
    return { id, roles }
  } catch {
    throw Error("Invalid access token")
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
