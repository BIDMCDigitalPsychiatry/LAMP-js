import 'isomorphic-fetch';
import { Researcher, Participant } from "./model/index";
import { ActivityEventService, ActivityService, ActivitySpecService, APIService, CredentialService, OAuthService, ParticipantService, ResearcherService, SensorEventService, SensorService, SensorSpecService, StudyService, TypeService } from "./service/index";
export * from "./service/index";
export * from "./model/index";
/**
 *
 */
interface IAuth {
    id?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
    serverAddress?: string;
}
interface IdentityObj {
    id?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
    serverAddress?: string;
}
/**
 * The root type in LAMP. You must use `LAMP.connect(...)` to begin using any LAMP classes.
 */
export default class LAMP {
    static Activity: ActivityService;
    static ActivityEvent: ActivityEventService;
    static ActivitySpec: ActivitySpecService;
    static API: APIService;
    static Credential: CredentialService;
    static OAuth: OAuthService;
    static Participant: ParticipantService;
    static Researcher: ResearcherService;
    static Sensor: SensorService;
    static SensorEvent: SensorEventService;
    static SensorSpec: SensorSpecService;
    static Study: StudyService;
    static Type: TypeService;
    static addEventListener(event: string, callback: (any: any) => void): void;
    static removeEventListener(event: string, callback: (any: any) => void): void;
    static dispatchEvent(event: string, detail?: any): void;
    static initializeDemoDB(db: {
        [key: string]: any;
    }): void;
    static connect(identity?: {
        serverAddress: string | undefined;
        accessKey: string | null;
        secretKey: string | null;
    }): Promise<void>;
    static Auth: {
        new (): {};
        _auth: IAuth;
        _me: Participant | Researcher | Researcher[];
        _type: "admin" | "researcher" | "participant";
        /**
         * Authenticate/authorize as a user of a given `type`.
         * If all values are null (especially `type`), the authorization is cleared.
         */
        set_identity(identity?: IdentityObj): Promise<void>;
        refresh_identity(): Promise<void>;
        get_legacy_token(identity: {
            id: string;
            password: string;
        }): Promise<string>;
    };
}
export declare const main: () => void;
