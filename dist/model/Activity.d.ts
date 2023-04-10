import { Identifier, Timestamp } from './Type';
/**
 *
 */
export declare class DurationInterval {
    /**
     *
     */
    start?: Timestamp;
    /**
     *
     */
    interval?: Array<any>;
    /**
     *
     */
    repeatCount?: number;
    /**
     *
     */
    end?: Timestamp;
}
/**
 *
 */
export declare class DurationIntervalLegacy {
    /**
     *
     */
    repeatType?: string;
    /**
     *
     */
    date?: Timestamp;
    /**
     *
     */
    customTimes?: Array<any>;
}
/**
 * tab setting for Activity
 */
declare type Tab = 'learn' | 'assess' | 'manage' | 'prevent';
/**
 * An activity that may be performed by a participant in a study.
 */
export declare class Activity {
    /**
     *
     */
    id?: Identifier;
    /**
     *
     */
    spec?: Identifier;
    /**
     * The name of the activity.
     */
    name?: string;
    /**
     *
     */
    schedule?: DurationIntervalLegacy;
    /**
     * The configuration settings for the activity.
     */
    settings?: any;
    /**
     * The tab settings for the activity.
     */
    category?: Tab[] | null;
}
export {};
