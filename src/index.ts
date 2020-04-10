import { 
    Researcher, 
    Participant 
} from './model/index'
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
    TypeService 
} from './service/index'
import { Configuration } from './service/Fetch'

export * from './service/index'
export * from './model/index'

/**
 * 
 */
interface IAuth { 
    id: string | null; 
    password: string | null; 
    serverAddress: string | undefined; 
}

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
    }
    


    //
    // [Credential/Identity Management]
    //


    // Shorthand for console/data analysis usage.
    public static async connect(identity: { 
        serverAddress: string | undefined; 
        accessKey: string | null; 
        secretKey: string | null; 
    } = { 
        serverAddress: undefined, 
        accessKey: null, 
        secretKey: null 
    }) {
        return await LAMP.Auth.set_identity({ 
            id: identity.accessKey, 
            password: identity.secretKey, 
            serverAddress: identity.serverAddress 
        })
    }

    public static Auth = class {
        public static _auth: IAuth = { id: null, password: null, serverAddress: null }
        public static _me: Researcher[] | Researcher | Participant | null | undefined
        public static _type: 'admin' | 'researcher' | 'participant' | null = null

        /**
         * Authenticate/authorize as a user of a given `type`.
         * If all values are null (especially `type`), the authorization is cleared.
         */
        public static async set_identity(identity: { id: string | null; password: string | null; serverAddress: string | undefined; } = { id: null, password: null, serverAddress: undefined }) {
            LAMP.configuration = { base: (!!identity.serverAddress ? `https://${identity.serverAddress}` : 'https://api.lamp.digital') }

            // Ensure there's actually a change to process.
            let l: IAuth = LAMP.Auth._auth || { id: null, password: null, serverAddress: null }
            if (l.id === identity.id && 
                l.password === identity.password && 
                l.serverAddress === identity.serverAddress
            ) return

            // Propogate the authorization.
            LAMP.Auth._auth = { id: identity.id, password: identity.password, serverAddress: identity.serverAddress }
            LAMP.configuration = { ...(LAMP.configuration || { base: undefined, headers: undefined }), authorization: !!LAMP.Auth._auth.id ? `${LAMP.Auth._auth.id}:${LAMP.Auth._auth.password}` : undefined}

            try {

                // If we aren't clearing the credential, get the "self" identity.
                if (!!identity.id && !!identity.password) {

                    // Get our 'me' context so we know what object type we are.
                    let typeData
                    try { typeData = await LAMP.Type.parent('me') } catch(e) {}
                    LAMP.Auth._type = (typeData.error === '400.context-substitution-failed' ? 'admin' : (Object.entries(typeData.data).length === 0 ? 'researcher' : (!!typeData.data ? 'participant' : null)))

                    // Get our 'me' object now that we figured out our type.
                    LAMP.Auth._me = await (LAMP.Auth._type === 'admin' ? 
                        { id: identity.id } : (LAMP.Auth._type === 'researcher' ? 
                            LAMP.Researcher.view('me') : 
                            LAMP.Participant.view('me')))

                    // Tie-in for the mobile apps. Login only if we are a participant.
                    if (LAMP.Auth._type === 'participant') {
                        (<any>window)?.webkit?.messageHandlers?.login?.postMessage?.({ 
                            authorizationToken: LAMP.configuration.authorization, 
                            identityObject: LAMP.Auth._me,
                            serverAddress:  LAMP.configuration.base
                        });
                        (<any>window)?.login?.postMessage?.(JSON.stringify({ 
                            authorizationToken: LAMP.configuration.authorization, 
                            identityObject: LAMP.Auth._me,
                            serverAddress:  LAMP.configuration.base
                        }));
                    }
                } else {

                    // Tie-in for the mobile apps. 
                    // FIXME: Logout only if we were a participant... right now the app should ignore erroneous logouts.
                    (<any>window)?.webkit?.messageHandlers?.logout?.postMessage?.({ 
                        deleteCache: true // FIXME!
                    });
                    (<any>window)?.logout?.postMessage?.(JSON.stringify({ 
                        deleteCache: true // FIXME!
                    }));
                }
            } catch(err) {

                // We failed: clear and propogate the authorization.
                LAMP.Auth._auth = { id: null, password: null, serverAddress: null }
                if (!!LAMP.configuration)
                    LAMP.configuration.authorization = undefined

                // Delete the "self" identity and throw the error we received.
                LAMP.Auth._me = null
                LAMP.Auth._type = null
                throw new Error('invalid id or password')
            } finally {

                // Save the authorization in sessionStorage for later.
                sessionStorage.setItem('LAMP._auth', JSON.stringify(LAMP.Auth._auth))
            }
        }

        public static async refresh_identity() {
            let _saved = JSON.parse(sessionStorage.getItem('LAMP._auth') || 'null') || LAMP.Auth._auth
            await LAMP.Auth.set_identity({ id: _saved.id, password: _saved.password, serverAddress: _saved.serverAddress })
        }
    }
}
