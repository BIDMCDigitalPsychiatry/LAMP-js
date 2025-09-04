import { Identifier, Timestamp } from './Type'

/**
 *
 */

export class ResearcherSettings {

    /**
     * The banner greeting.
     */
    bannerGreeting?: string

    /**
     * The banner heading
     */
    bannerHeading?: string

    /**
     * The banner sub heading
     */
    bannerSubHeading?: string

    /**
     * The image icon for banner
     */
    imageBase64?: string

    /**
     * Activity selected for banner (if any)
     */
    selectedActivity?: string
    /**
     * The study ID this setting is associated with
     */
    studyId?: string
    /**
     * The timestamp
     */
    timestamp?: Timestamp

    /**
     * The deleted flag
     */
    deleted?: boolean

}

export type ResearcherBanner = {
    data: ResearcherSettings
}