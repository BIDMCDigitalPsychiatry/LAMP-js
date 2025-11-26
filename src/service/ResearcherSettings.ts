import { Identifier, Timestamp } from "../model/Type"

/**
 *
 */
export class ResearcherSettings {
  /**
   * The banner greeting.
   */
  bannerSettings?: string

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
   * The selected activity
   */
  selectedActivity?: string

  /**
   * The selected group
   */
  selectedGroup?: string
  /**
   * The button text
   */
  buttonText?: string
  /**
   * The activityId
   */
  activityId?: string
  /**
   * The favourite activities
   */
  favouriteActivities?: any
  /**
   * The featured activity
   */
  featuredActivity?: string
  /**
   * The streak type
   */
  streak?: string
  /**
   * The Streak title
   */
  streakTitle?: string
  /**
   * The Streak description
   */
  streakDesc?: string
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
