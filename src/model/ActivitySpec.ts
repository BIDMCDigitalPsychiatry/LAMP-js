/**
 * tab setting for Activity Spec
 */
 type Tab = 'learn' | 'assess' | 'manage' | 'prevent'

/**
 * The ActivitySpec determines the parameters and properties of an Activity and its corresponding generated ActivityEvents.
 */
export class ActivitySpec {
    
    /**
     * The name of the activity spec.
     */
    name?: string
    
    /**
     * Either a binary blob containing a document or video, or a string containing instructional aid about the Activity.
     */
    helpContents?: string
    
    /**
     * The WebView-compatible script that provides this Activity on mobile or desktop (IFrame) clients.
     */
    scriptContents?: string
    
    /**
     * The data definition of an ActivitySpec.
     */
    dataSchema?: any
    
    /**
     * The temporal slice data definition of an ActivitySpec.
     */
    temporalSliceSchema?: any
    
    /**
     * The Activity settings definition of an ActivitySpec.
     */
    settingsSchema?: any

    /**
     * The tab settings definition of an ActivitySpec.
     */
    category?: Tab[] | null
}
