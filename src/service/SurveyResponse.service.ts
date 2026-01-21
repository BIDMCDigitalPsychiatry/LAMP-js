import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"

// Types for survey response structure
export interface QuestionAnswer {
  item: string
  value: any
  type?: string
  questionText?: string
}

export interface SurveyResponse {
  date: number
  timestamp: number
  displayableAnswers: QuestionAnswer[] // Only answers from questions with displayInSurveyResponses: true
  isPinned?: boolean
}

export interface SurveyItem {
  id: string
  title: string
  binName?: string
  description?: string // Survey activity description
  responses: SurveyResponse[]
}

export interface SurveyGroup {
  id: string
  label: string
  surveys: SurveyItem[]
}

export interface GroupedSurveyResponse {
  groups: SurveyGroup[]
  ungroupedSurveys: SurveyItem[]
}

// Filter types for survey responses
export type FilterType = "weekly" | "daily" | "monthly" | "all" | "pinned"

export interface FilterParams {
  filterType: FilterType
  date?: number // For daily filter - specific date timestamp
  fromDate?: number // For weekly custom range
  toDate?: number // For weekly custom range
  month?: number // For monthly filter (1-12)
  year?: number // For monthly filter
  limit?: number // Limit number of responses per survey (e.g., 5 for latest 5)
}

export interface PinSurveyResponseParams {
  activity_id: string
  timestamp: number
}

// Types for single survey activity response
export interface SurveyQuestionAnswer {
  questionText: string
  answerText: string
  optionDescription?: string // Description of selected option (if available)
}

export interface SurveyActivityResponse {
  activityId: string
  activityName: string
  timestamp: number
  answers: SurveyQuestionAnswer[]
}

export interface PinSurveyResponseResult {
  success: boolean
  message: string
}

export class SurveyResponseService {
  public configuration?: Configuration

  /**
   * Get survey responses for a participant grouped by survey groups from researcher settings
   * @param participantId - The participant ID
   * @param filterParams - Filter parameters for the query
   * @returns Promise<GroupedSurveyResponse>
   * 
   * @example
   * // Get weekly responses (last 7 days)
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { filterType: 'weekly' });
   * 
   * @example
   * // Get weekly responses with custom date range
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { 
   *   filterType: 'weekly',
   *   fromDate: 1700000000000,
   *   toDate: 1700604800000
   * });
   * 
   * @example
   * // Get daily responses for a specific date
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { 
   *   filterType: 'daily',
   *   date: 1700000000000
   * });
   * 
   * @example
   * // Get monthly responses
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { 
   *   filterType: 'monthly',
   *   month: 12,
   *   year: 2025
   * });
   * 
   * @example
   * // Get all responses
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { filterType: 'all' });
   * 
   * @example
   * // Get pinned responses only
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { filterType: 'pinned' });
   * 
   * @example
   * // Get latest 5 responses per survey
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { filterType: 'all', limit: 5 });
   */
  public async getSurveyResponses(
    participantId: Identifier,
    filterParams: FilterParams = { filterType: "weekly" }
  ): Promise<GroupedSurveyResponse> {
    if (participantId === null || participantId === undefined) {
      throw new Error(
        "Required parameter participantId was null or undefined when calling getSurveyResponses."
      )
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      // DEMO - return empty structure for demo mode
      return Promise.resolve({
        groups: [],
        ungroupedSurveys: [],
      })
    }

    // Build query parameters
    const queryParams = new URLSearchParams()
    queryParams.set("filterType", filterParams.filterType)
    
    if (filterParams.date !== undefined) {
      queryParams.set("date", String(filterParams.date))
    }
    if (filterParams.fromDate !== undefined) {
      queryParams.set("fromDate", String(filterParams.fromDate))
    }
    if (filterParams.toDate !== undefined) {
      queryParams.set("toDate", String(filterParams.toDate))
    }
    if (filterParams.month !== undefined) {
      queryParams.set("month", String(filterParams.month))
    }
    if (filterParams.year !== undefined) {
      queryParams.set("year", String(filterParams.year))
    }
    if (filterParams.limit !== undefined) {
      queryParams.set("limit", String(filterParams.limit))
    }

    const result = await Fetch.get<{ data: GroupedSurveyResponse }>(
      `/participant/${participantId}/survey_responses?${queryParams.toString()}`,
      this.configuration
    )

    return result.data || { groups: [], ungroupedSurveys: [] }
  }

  /**
   * Get weekly survey responses for a participant (last 7 days including today)
   * @param participantId - The participant ID
   * @param fromDate - Optional custom start date (timestamp)
   * @param toDate - Optional custom end date (timestamp)
   * @returns Promise<GroupedSurveyResponse>
   */
  public async getWeeklySurveyResponses(
    participantId: Identifier,
    fromDate?: number,
    toDate?: number
  ): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "weekly",
      fromDate,
      toDate,
    })
  }

  /**
   * Get daily survey responses for a participant
   * @param participantId - The participant ID
   * @param date - Optional specific date (timestamp). Defaults to today.
   * @returns Promise<GroupedSurveyResponse>
   */
  public async getDailySurveyResponses(
    participantId: Identifier,
    date?: number
  ): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "daily",
      date,
    })
  }

  /**
   * Get monthly survey responses for a participant
   * @param participantId - The participant ID
   * @param month - Month number (1-12). Defaults to current month.
   * @param year - Year. Defaults to current year.
   * @returns Promise<GroupedSurveyResponse>
   */
  public async getMonthlySurveyResponses(
    participantId: Identifier,
    month?: number,
    year?: number
  ): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "monthly",
      month,
      year,
    })
  }

  /**
   * Get all survey responses for a participant
   * @param participantId - The participant ID
   * @returns Promise<GroupedSurveyResponse>
   */
  public async getAllSurveyResponses(participantId: Identifier): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "all",
    })
  }

  /**
   * Get only pinned survey responses for a participant
   * @param participantId - The participant ID
   * @returns Promise<GroupedSurveyResponse>
   */
  public async getPinnedSurveyResponses(participantId: Identifier): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "pinned",
    })
  }

  /**
   * Get latest N survey responses per survey for a participant
   * @param participantId - The participant ID
   * @param limit - Number of responses per survey (default: 5)
   * @returns Promise<GroupedSurveyResponse>
   * 
   * @example
   * // Get latest 5 responses per survey
   * const result = await LAMP.SurveyResponse.getLatestSurveyResponses('participant_id', 5);
   */
  public async getLatestSurveyResponses(
    participantId: Identifier,
    limit: number = 5
  ): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "all",
      limit,
    })
  }

  /**
   * Get survey response for a specific survey activity at a specific timestamp
   * Returns the survey questions with participant's answers
   * @param participantId - The participant ID
   * @param activityId - The survey activity ID
   * @param timestamp - The timestamp of the survey response
   * @returns Promise<SurveyActivityResponse>
   * 
   * @example
   * // Get a specific survey response
   * const result = await LAMP.SurveyResponse.getSurveyActivityResponse('participant_id', 'activity_id', 1705968000000);
   */
  public async getSurveyActivityResponse(
    participantId: Identifier,
    activityId: string,
    timestamp: number
  ): Promise<SurveyActivityResponse> {
    if (participantId === null || participantId === undefined) {
      throw new Error(
        "Required parameter participantId was null or undefined when calling getSurveyActivityResponse."
      )
    }
    if (!activityId) {
      throw new Error(
        "Required parameter activityId was null or undefined when calling getSurveyActivityResponse."
      )
    }
    if (timestamp === null || timestamp === undefined) {
      throw new Error(
        "Required parameter timestamp was null or undefined when calling getSurveyActivityResponse."
      )
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      // DEMO - return empty structure for demo mode
      return Promise.resolve({
        activityId: activityId,
        activityName: "",
        timestamp: timestamp,
        answers: [],
      })
    }

    const url = `/participant/${participantId}/survey_responses/${activityId}/${timestamp}`

    const result = await Fetch.get<{ data: SurveyActivityResponse }>(
      url,
      this.configuration
    )

    return result.data || {
      activityId: activityId,
      activityName: "",
      timestamp: timestamp,
      answers: [],
    }
  }

  /**
   * Pin a survey response for a participant
   * @param participantId - The participant ID
   * @param activityId - The survey activity ID
   * @param timestamp - The timestamp of the response to pin
   * @returns Promise<PinSurveyResponseResult>
   * 
   * @example
   * const result = await LAMP.SurveyResponse.pinSurveyResponse('participant_id', 'activity_id', 1700000000000);
   */
  public async pinSurveyResponse(
    participantId: Identifier,
    activityId: string,
    timestamp: number
  ): Promise<PinSurveyResponseResult> {
    if (participantId === null || participantId === undefined) {
      throw new Error(
        "Required parameter participantId was null or undefined when calling pinSurveyResponse."
      )
    }
    if (!activityId) {
      throw new Error("Required parameter activityId was null or undefined when calling pinSurveyResponse.")
    }
    if (timestamp === null || timestamp === undefined) {
      throw new Error("Required parameter timestamp was null or undefined when calling pinSurveyResponse.")
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }

    const result = await Fetch.post<{ data: PinSurveyResponseResult }>(
      `/participant/${participantId}/survey_responses/pin`,
      {
        activity_id: activityId,
        timestamp: timestamp,
      },
      this.configuration
    )

    return result.data || { success: false, message: "Unknown error" }
  }

  /**
   * Unpin a survey response for a participant
   * @param participantId - The participant ID
   * @param activityId - The survey activity ID
   * @param timestamp - The timestamp of the response to unpin
   * @returns Promise<PinSurveyResponseResult>
   * 
   * @example
   * const result = await LAMP.SurveyResponse.unpinSurveyResponse('participant_id', 'activity_id', 1700000000000);
   */
  public async unpinSurveyResponse(
    participantId: Identifier,
    activityId: string,
    timestamp: number
  ): Promise<PinSurveyResponseResult> {
    if (participantId === null || participantId === undefined) {
      throw new Error(
        "Required parameter participantId was null or undefined when calling unpinSurveyResponse."
      )
    }
    if (!activityId) {
      throw new Error("Required parameter activityId was null or undefined when calling unpinSurveyResponse.")
    }
    if (timestamp === null || timestamp === undefined) {
      throw new Error("Required parameter timestamp was null or undefined when calling unpinSurveyResponse.")
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }

    const result = await Fetch.delete<{ data: PinSurveyResponseResult }>(
      `/participant/${participantId}/survey_responses/pin`,
      this.configuration,
      {
        activity_id: activityId,
        timestamp: timestamp,
      }
    )

    return result.data || { success: false, message: "Unknown error" }
  }
}

