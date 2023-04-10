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
import { Demo } from "./service/Demo"
import { Fetch } from "./service/Fetch"

import { decode } from "jsonwebtoken"

export * from "./service/index"
export * from "./model/index"

/**
 *
 */
interface IAuth {
  id?: string
  password?: string
  accessToken?: string
  refreshToken?: string
  serverAddress?: string
}

interface IdentityObj {
  id?: string
  password?: string
  accessToken?: string
  refreshToken?: string
  serverAddress?: string
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
      id: identity.accessKey,
      password: identity.secretKey,
      serverAddress: identity.serverAddress,
    }
  }

  public static Auth = class {
    public static _auth: IAuth = { id: null, password: null, serverAddress: "api.lamp.digital", accessToken: null, refreshToken: null }
    public static _me: Researcher[] | Researcher | Participant | null | undefined
    public static _type: "admin" | "researcher" | "participant" | null = null

    /**
     * Authenticate/authorize as a user of a given `type`.
     * If all values are null (especially `type`), the authorization is cleared.
     */
    public static async set_identity(identity: IdentityObj = {}) {
      let serverAddress
      if (identity.serverAddress) {
        serverAddress = identity.serverAddress.replace("http://", "").replace("https://", "")
      } else {
        serverAddress = LAMP.Auth._auth.serverAddress
      }

      // Propogate the authorization.
      LAMP.Auth._auth = {
        id: identity.id,
        password: identity.password,
        accessToken: identity.accessToken,
        refreshToken: identity.refreshToken,
        serverAddress: serverAddress,
      }

      try {
        // If we aren't clearing the credential, get the "self" identity.
        if (!!identity.id && !!identity.password || !!identity.accessToken) {
          let authorization: string
          let id: string
          if (!!identity.accessToken) {
            authorization = `Bearer ${identity.accessToken}`

            let payload: any
            try {
              payload = decode(identity.accessToken)
            } catch {
              throw Error("Invalid access token")
            }
            id = payload.id
          } else {
            authorization = `Basic ${identity.id}:${identity.password}`
            id = identity.id 
          }

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
            ? { id: id }
            : LAMP.Auth._type === "researcher"
            ? LAMP.Researcher.view("me")
            : LAMP.Participant.view("me"))

          LAMP.dispatchEvent("LOGIN", {
            authorizationToken: authorization,
            identityObject: LAMP.Auth._me,
            serverAddress: serverAddress
          })
        } else {
          LAMP.dispatchEvent("LOGOUT", {
            deleteCache: true, // FIXME!
          })
        }
      } catch (err) {
        // We failed: clear and propogate the authorization.
        LAMP.Auth._auth = { id: null, password: null, accessToken: null, refreshToken: null, serverAddress: null }

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
      await LAMP.Auth.set_identity(_saved)
    }

    public static async get_legacy_token(
      identity: { id: string; password: string },
    ): Promise<string> {
      const body = await Fetch.post<any>(
        "/token",
        { id: identity.id, password: identity.password },
      )

      return body.access_token
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
