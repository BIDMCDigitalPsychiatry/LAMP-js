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
    description?: string
    
    /**
     * The WebView-compatible script that provides this Activity on mobile or desktop (IFrame) clients.
     */
    executable?: string | null
    
    /**
     * The data definition of an ActivitySpec.
     */
    data?: any
    
    /**
     * The temporal slice data definition of an ActivitySpec.
     */
    temporalSlices?: any
    
    /**
     * The Activity settings definition of an ActivitySpec.
     */
    settings?: any

    /**
     * The tab settings definition of an ActivitySpec.
     */
    category?: Tab[] | null    
}
