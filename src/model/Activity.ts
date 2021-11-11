import { Identifier, Timestamp } from './Type'

/**
 *
 */
export class DurationInterval { 
    
    /**
     *
     */
    start?: Timestamp
    
    /**
     *
     */
    interval?: Array<any>
    
    /**
     *
     */
    repeatCount?: number
    
    /**
     *
     */
    end?: Timestamp
}

/**
 *
 */
export class DurationIntervalLegacy { 
    
    /**
     *
     */
    repeatType?: string
    
    /**
     *
     */
    date?: Timestamp
    
    /**
     *
     */
    customTimes?: Array<any>
}

/**
 * tab setting for Activity
 */
type Tab = 'learn' | 'assess' | 'manage' | 'prevent'
/**
 * An activity that may be performed by a participant in a study.
 */
export class Activity { 
    
    /**
     *
     */
    id?: Identifier
    
    /**
     *
     */
    spec?: Identifier
    
    /**
     * The name of the activity.
     */
    name?: string
    
    /**
     *
     */
    schedule?: DurationIntervalLegacy
    
    /**
     * The configuration settings for the activity.
     */
    settings?: any

    /**
     * The tab settings for the activity.
     */
    category?: Tab | null
}
