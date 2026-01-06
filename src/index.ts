import "isomorphic-fetch"
import { Researcher, Participant, Identifier } from "./model/index"
import {
  APIService,
  ActivityService,
  ActivityEventService,
  ActivitySpecService,
  CredentialService,
  ParticipantService,
  ResearcherService,
  SensorService,
  SensorEventService,
  SensorSpecService,
  StudyService,
  TypeService,
  ResearcherSettingsService,
  OAuthProvider,
} from "./service/index"
import { Configuration, Fetch } from "./service/Fetch"
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
  token?: string | undefined
}

//
const _bus: HTMLElement | undefined = (global as any).document?.createElement("_lamp_fake")

/**
 * The root type in LAMP. You must use `LAMP.connect(...)` to begin using any LAMP classes.
 */
export default class LAMP {
  public static API = new APIService()
  public static Type = new TypeService()
  public static Credential = new CredentialService()
  public static Researcher = new ResearcherService()
  public static Participant = new ParticipantService()
  public static Study = new StudyService()
  public static Activity = new ActivityService()
  public static ActivityEvent = new ActivityEventService()
  public static ActivitySpec = new ActivitySpecService()
  public static Sensor = new SensorService()
  public static SensorEvent = new SensorEventService()
  public static SensorSpec = new SensorSpecService()
  public static ResearcherSettings = new ResearcherSettingsService()
  private static get configuration(): Configuration | undefined {
    return LAMP.API.configuration
  }
  private static set configuration(configuration: Configuration | undefined) {
    LAMP.API.configuration = configuration
    LAMP.Activity.configuration = configuration
    LAMP.ActivityEvent.configuration = configuration
    LAMP.ActivitySpec.configuration = configuration
    LAMP.Credential.configuration = configuration
    LAMP.Participant.configuration = configuration
    LAMP.Researcher.configuration = configuration
    LAMP.Sensor.configuration = configuration
    LAMP.SensorEvent.configuration = configuration
    LAMP.SensorSpec.configuration = configuration
    LAMP.Study.configuration = configuration
    LAMP.Type.configuration = configuration
    LAMP.ResearcherSettings.configuration = configuration
  }
  private static protocol = "https://"

  public static enableDevMode() {
    // Make all future server requests over http
    // Only use this for local development
    LAMP.protocol = "http://"
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
      accessKey: string | null
      secretKey: string | null
      serverAddress: string | undefined
    } = {
      accessKey: null,
      secretKey: null,
      serverAddress: undefined,
    }
  ) {
    // Propogate the authorization.
    // await LAMP.Credential.login(identity.accessKey!, identity.secretKey!);
    LAMP.Auth._auth = {
      id: identity.accessKey,
      password: identity.secretKey,
      serverAddress: identity.serverAddress,
    }

    LAMP.configuration = {
      base: !!identity.serverAddress ? `${LAMP.protocol}${identity.serverAddress}` : `${LAMP.protocol}api.lamp.digital`,
      authorization: !!LAMP.Auth._auth.id ? `${LAMP.Auth._auth.id}:${LAMP.Auth._auth.password}` : undefined,
    }
  }

  public static Auth = class {
    public static _auth: IAuth = { id: null, password: null, serverAddress: null }
    public static _me: Researcher[] | Researcher | Participant | null | undefined
    public static _type: "admin" | "researcher" | "participant" | null = null
    public static _authScheme: "session" | "basic" | null = null
    public static _configuredProviders: OAuthProvider[] = []
    public static _requireAccountSetup: boolean = undefined

    static _get_base_address(serverAddress: string | null): string {
      return !!serverAddress ? `${LAMP.protocol}${serverAddress}` : `${LAMP.protocol}api.lamp.digital`
    }

    static async _login_basic(
      id: string | null,
      password: string | null,
      serverAddress: string | null
    ) {
      LAMP.Auth._auth = {
        id: id,
        password: password,
        serverAddress: serverAddress,
      }
      
      LAMP.configuration = {
        base: this._get_base_address(serverAddress),
        authType: "basic",
        authorization: !!LAMP.Auth._auth.id ? `${LAMP.Auth._auth.id}:${LAMP.Auth._auth.password}` : undefined,
      }

        // TODO: Cross reference last real release to get this right
    }

    static async _login_session(
      id: string | null,
      password: string | null,
      serverAddress: string | null
    ) {
      LAMP.configuration = {
        base: this._get_base_address(serverAddress),
        authType: "session"
      }

      LAMP.Auth._auth = {
        id: null,
        password: null,
        serverAddress: serverAddress
      }

      // Call await login
      const loginResult = await LAMP.Credential.login(id, password)

      // Set credential
    }

    static async _logout_basic() {
      LAMP.Auth._auth = {
        id: null,
        password: null,
        serverAddress: null
      }
      LAMP.configuration = {
        base: null
      }
    }

    static async _logout_session() {
      const result = await LAMP.Credential.logout()
      LAMP.Auth._auth = {
        id: null,
        password: null,
        serverAddress: null
      }
      LAMP.configuration = {
        base: null
      }
      this._requireAccountSetup = false
    }

    static async _load_self_information() {
      try {
        if (this._authScheme === "session") {
          const sessionInfoResult: any = await Fetch.get("/session-info", LAMP.configuration)
          if (sessionInfoResult?.message !== "403.no-such-credentials") {
            LAMP.Auth._type = sessionInfoResult.userType
            LAMP.Auth._me = sessionInfoResult.me
            this._requireAccountSetup = !sessionInfoResult?.isSetupComplete
          } else {
            throw new Error("Not logged in")
          }
        } else {
          // Get our 'me' context so we know what object type we are.
          let typeData
          try {
            typeData = await LAMP.Type.parent("me")
          } catch (e) {}
          LAMP.Auth._type = typeData.error === "400.context-substitution-failed"
            ? "admin"
            : Object.entries(typeData.data).length === 0
            ? "researcher"
            : !!typeData.data
            ? "participant"
            : null

          // Get our 'me' object now that we figured out our type.
          LAMP.Auth._me = await (LAMP.Auth?._type === "admin"
            ? { id: this._auth.id }
            : LAMP.Auth?._type === "researcher"
            ? LAMP.Researcher.view("me")
            : LAMP.Participant.view("me"))
          
        }

        LAMP.dispatchEvent("LOGIN", {
          authorizationToken: LAMP.configuration.authorization,
          identityObject: LAMP.Auth._me,
          serverAddress: LAMP.configuration.base,
        })
      } catch(err) {
        
        console.log(`#####LAMP err`, err)
        // We failed: clear and propogate the authorization.
        LAMP.Auth._auth = { id: null, password: null, serverAddress: LAMP.Auth._auth.serverAddress }
        if (!!LAMP.configuration) {
          LAMP.configuration.authorization = undefined
        }

        // Delete the "self" identity and throw the error we received.
        LAMP.Auth._me = null
        LAMP.Auth._type = null        
        throw new Error("invalid id or password")

      } finally {
        (global as any).sessionStorage?.setItem("LAMP._auth", JSON.stringify(LAMP.Auth._auth))
      }
    }

    public static async set_server(serverAddress:string) {
      console.log("_setServer with: ", serverAddress)
      let serverInfoResult
      try {
        serverInfoResult = await Fetch.get("/server-info", {base: this._get_base_address(serverAddress)})
        if ((serverInfoResult as any)?.authScheme === "session") {
          this._authScheme = "session"
          this._configuredProviders = serverInfoResult.configuredProviders
        } else {
          this._authScheme = "basic"
        }
      } catch (e) {
        this._authScheme = "basic"
      }

      LAMP.configuration = {
        base: this._get_base_address(serverAddress),
        authType: this._authScheme
      }
      
      LAMP.Auth._auth = {
        id: null,
        password: null,
        serverAddress: serverAddress
      }
      
      localStorage.setItem("lastServerSelected", serverAddress)
    }

    public static async clear_server() {
      LAMP.Auth._auth = {
        id: null,
        password: null,
        serverAddress: null
      }
      LAMP.configuration = {
        base: null
      }
      this._configuredProviders = []
      sessionStorage.setItem("LAMP._auth", JSON.stringify(LAMP.Auth._auth))
      localStorage.removeItem("lastServerSelected")
    }

    /**
     * Authenticate/authorize as a user of a given `type`.
     * If all values are null (especially `type`), the authorization is cleared.
     */
    public static async set_identity(
      identity: {
        id: string | null
        password: string | null
        serverAddress: string | null
      } = {
        id: null,
        password: null,
        serverAddress: null,
      }, 
    ) {
      let authType
      try {
        const serverInfoResult = await Fetch.get("/server-info", {base: this._get_base_address(identity.serverAddress)})
        if ((serverInfoResult as any)?.authScheme === "session") {
          authType = "session"
        } else {
          authType = "basic"
        }
      } catch (err) {
        authType = "basic"
      }

      this._authScheme = authType;

      // If neither id nor password are set, log out
      if (! (!!identity.id || !!identity.password)) {
        if (authType === "session") {
          await this._logout_session()
        } else {
          await this._logout_basic()
        }

        LAMP.dispatchEvent("LOGOUT", {
            deleteCache: true, // FIXME! TODO: Why does this say fixme?
        })

        return
      }

      // Attempt to log in
      if (authType === "session") {
        await this._login_session(identity.id, identity.password, identity.serverAddress)
      } else {
        await this._login_basic(identity.id, identity.password, identity.serverAddress)
      }

      // Set self identity
      await this._load_self_information()
    }

    public static async refresh_identity() {
      // refresh_identity is called when the browser is refreshed to reinitialize LAMP based on 
      // credentials stored in the browser

      // Get any credentials saved to the browser
      let _saved = JSON.parse((global as any).sessionStorage?.getItem("LAMP._auth") ?? "null") || LAMP.Auth._auth
      if (!_saved.serverAddress && localStorage.getItem("lastServerSelected")) {
        _saved.serverAddress = localStorage.getItem("lastServerSelected")
      }
      if (_saved.serverAddress) {
        await this.set_server(_saved.serverAddress)
      }

      LAMP.Auth._auth = {
        id: _saved.id,
        password: _saved.password,
        serverAddress: _saved.serverAddress
      }

      // Attempt to set self information
      // Will throw an error if _load_self_information is unsuccessful
      await LAMP.Auth._load_self_information()
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
