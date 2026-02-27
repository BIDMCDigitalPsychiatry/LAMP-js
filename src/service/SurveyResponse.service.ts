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
  timestamp: number
  displayableAnswers: QuestionAnswer[]
  isPinned?: boolean
}

// Per-response entry inside a bin — merged across all surveys in the bin
export interface BinResponseEntry {
  surveyId: string
  surveyTitle: string
  timestamp: number
  displayableAnswers: QuestionAnswer[]
  isPinned: boolean
}

// Bin: groups a set of surveys, exposes merged responses sorted timestamp desc
export interface SurveyBin {
  id: string
  label: string
  description?: string
  responses: BinResponseEntry[]
}

export interface SurveyGroup {
  id: string
  label: string
  bins: SurveyBin[]
}

export interface GroupedSurveyResponse {
  groups: SurveyGroup[]
}

// Single activity response when activityId filter is provided
export interface SingleActivitySurveyResponse {
  id: string
  title: string
  binName?: string
  description?: string
  responses: SurveyResponse[]
}

// Response type for bin-based survey responses endpoint
export interface BinSurveyResponse {
  groupId: string
  groupLabel: string
  binLabel: string
  binDescription?: string
  responses: BinResponseEntry[]
}

// Filter types for survey responses
export type FilterType = "weekly" | "daily" | "monthly" | "all" | "pinned"

// Filter for survey activities (pinned vs all)
export type SurveyFilter = "pinned" | "all"

export interface FilterParams {
  filterType: FilterType
  date?: number // For daily filter - specific date timestamp
  fromDate?: number // For weekly custom range
  toDate?: number // For weekly custom range
  month?: number // For monthly filter (1-12)
  year?: number // For monthly filter
  limit?: number // Limit number of responses bin-wide (latest N across all surveys in the bin)
  activityId?: string // Filter by specific survey activity ID
  surveyFilter?: SurveyFilter // Filter surveys by pinned status (default: "all")
}

// Filter params for bin-based endpoint (no activityId / surveyFilter / pinned filterType)
export interface BinFilterParams {
  filterType?: Exclude<FilterType, "pinned">
  date?: number
  fromDate?: number
  toDate?: number
  month?: number
  year?: number
  limit?: number // Latest N responses bin-wide after merging all surveys
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

export interface PinnedSurveyActivitiesResult {
  activityIds: string[]
}

export class SurveyResponseService {
  public configuration?: Configuration

  /**
   * Get survey responses for a participant grouped by survey groups from researcher settings
   * If activityId is provided, returns only that activity's data in a simplified format (SingleActivitySurveyResponse)
   * @param participantId - The participant ID
   * @param filterParams - Filter parameters for the query
   * @returns Promise<GroupedSurveyResponse | SingleActivitySurveyResponse>
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
   * 
   * @example
   * // Get responses for a specific activity only (returns SingleActivitySurveyResponse)
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { filterType: 'all', activityId: 'activity_id' });
   * 
   * @example
   * // Get only pinned surveys
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { filterType: 'all', surveyFilter: 'pinned' });
   * 
   * @example
   * // Get all surveys (default)
   * const result = await LAMP.SurveyResponse.getSurveyResponses('participant_id', { filterType: 'all', surveyFilter: 'all' });
   */
  public async getSurveyResponses(
    participantId: Identifier,
    filterParams: FilterParams = { filterType: "weekly" }
  ): Promise<GroupedSurveyResponse | SingleActivitySurveyResponse> {
    if (participantId === null || participantId === undefined) {
      throw new Error(
        "Required parameter participantId was null or undefined when calling getSurveyResponses."
      )
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      // DEMO - return empty structure for demo mode
      if (filterParams.activityId) {
        return Promise.resolve({
          id: filterParams.activityId,
          title: "",
          binName: undefined,
          description: undefined,
          responses: [],
        })
      }
      return Promise.resolve({ groups: [] })
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
    if (filterParams.activityId !== undefined) {
      queryParams.set("activityId", filterParams.activityId)
    }
    if (filterParams.surveyFilter !== undefined) {
      queryParams.set("surveyFilter", filterParams.surveyFilter)
    }

    const result = await Fetch.get<{ data: GroupedSurveyResponse | SingleActivitySurveyResponse }>(
      `/participant/${participantId}/survey_responses?${queryParams.toString()}`,
      this.configuration
    )

    // Return appropriate default based on whether activityId was provided
    if (filterParams.activityId) {
      return result.data || { 
        id: filterParams.activityId, 
        title: "", 
        binName: undefined,
        description: undefined,
        responses: [] 
      }
    }
    return result.data || { groups: [] }
  }

  /**
   * Get survey responses for a specific activity only
   * Returns simplified format without groups structure
   * @param participantId - The participant ID
   * @param activityId - The activity ID to filter by
   * @param filterParams - Optional additional filter parameters (excluding activityId)
   * @returns Promise<SingleActivitySurveyResponse>
   * 
   * @example
   * // Get all responses for a specific survey
   * const result = await LAMP.SurveyResponse.getActivitySurveyResponses('participant_id', 'activity_id');
   * 
   * @example
   * // Get latest 5 responses for a specific survey
   * const result = await LAMP.SurveyResponse.getActivitySurveyResponses('participant_id', 'activity_id', { filterType: 'all', limit: 5 });
   */
  public async getActivitySurveyResponses(
    participantId: Identifier,
    activityId: string,
    filterParams: Omit<FilterParams, 'activityId'> = { filterType: "all" }
  ): Promise<SingleActivitySurveyResponse> {
    if (participantId === null || participantId === undefined) {
      throw new Error(
        "Required parameter participantId was null or undefined when calling getActivitySurveyResponses."
      )
    }
    if (!activityId) {
      throw new Error(
        "Required parameter activityId was null or undefined when calling getActivitySurveyResponses."
      )
    }

    const result = await this.getSurveyResponses(participantId, {
      ...filterParams,
      activityId,
    })

    return result as SingleActivitySurveyResponse
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
    }) as Promise<GroupedSurveyResponse>
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
    }) as Promise<GroupedSurveyResponse>
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
    }) as Promise<GroupedSurveyResponse>
  }

  /**
   * Get all survey responses for a participant
   * @param participantId - The participant ID
   * @returns Promise<GroupedSurveyResponse>
   */
  public async getAllSurveyResponses(participantId: Identifier): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "all",
    }) as Promise<GroupedSurveyResponse>
  }

  /**
   * Get only pinned survey responses for a participant
   * @param participantId - The participant ID
   * @returns Promise<GroupedSurveyResponse>
   */
  public async getPinnedSurveyResponses(participantId: Identifier): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "pinned",
    }) as Promise<GroupedSurveyResponse>
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
    }) as Promise<GroupedSurveyResponse>
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

  // ==================== SURVEY ACTIVITY PIN METHODS ====================

  /**
   * Pin a survey activity for a study
   * @param studyId - The study ID
   * @param activityId - The survey activity ID to pin
   * @returns Promise<PinSurveyResponseResult>
   * 
   * @example
   * const result = await LAMP.SurveyResponse.pinSurveyActivity('study_id', 'activity_id');
   */
  public async pinSurveyActivity(
    studyId: Identifier,
    activityId: string
  ): Promise<PinSurveyResponseResult> {
    if (studyId === null || studyId === undefined) {
      throw new Error(
        "Required parameter studyId was null or undefined when calling pinSurveyActivity."
      )
    }
    if (!activityId) {
      throw new Error("Required parameter activityId was null or undefined when calling pinSurveyActivity.")
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }

    const result = await Fetch.post<{ data: PinSurveyResponseResult }>(
      `/study/${studyId}/survey_activities/pin`,
      {
        activity_id: activityId,
      },
      this.configuration
    )

    return result.data || { success: false, message: "Unknown error" }
  }

  /**
   * Unpin a survey activity for a study
   * @param studyId - The study ID
   * @param activityId - The survey activity ID to unpin
   * @returns Promise<PinSurveyResponseResult>
   * 
   * @example
   * const result = await LAMP.SurveyResponse.unpinSurveyActivity('study_id', 'activity_id');
   */
  public async unpinSurveyActivity(
    studyId: Identifier,
    activityId: string
  ): Promise<PinSurveyResponseResult> {
    if (studyId === null || studyId === undefined) {
      throw new Error(
        "Required parameter studyId was null or undefined when calling unpinSurveyActivity."
      )
    }
    if (!activityId) {
      throw new Error("Required parameter activityId was null or undefined when calling unpinSurveyActivity.")
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }

    const result = await Fetch.delete<{ data: PinSurveyResponseResult }>(
      `/study/${studyId}/survey_activities/pin`,
      this.configuration,
      {
        activity_id: activityId,
      }
    )

    return result.data || { success: false, message: "Unknown error" }
  }

  /**
   * Get all pinned survey activities for a study
   * @param studyId - The study ID
   * @returns Promise<PinnedSurveyActivitiesResult>
   * 
   * @example
   * const result = await LAMP.SurveyResponse.getPinnedSurveyActivities('study_id');
   * console.log(result.activityIds); // ['activity_id_1', 'activity_id_2']
   */
  public async getPinnedSurveyActivities(
    studyId: Identifier
  ): Promise<PinnedSurveyActivitiesResult> {
    if (studyId === null || studyId === undefined) {
      throw new Error(
        "Required parameter studyId was null or undefined when calling getPinnedSurveyActivities."
      )
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ activityIds: [] })
    }

    const result = await Fetch.get<{ data: PinnedSurveyActivitiesResult }>(
      `/study/${studyId}/survey_activities/pinned`,
      this.configuration
    )

    return result.data || { activityIds: [] }
  }

  /**
   * Get only pinned survey responses for pinned surveys only
   * Combines surveyFilter: 'pinned' with filterType: 'all'
   * @param participantId - The participant ID
   * @returns Promise<GroupedSurveyResponse>
   * 
   * @example
   * // Get responses only from pinned surveys
   * const result = await LAMP.SurveyResponse.getPinnedSurveysResponses('participant_id');
   */
  public async getPinnedSurveysResponses(participantId: Identifier): Promise<GroupedSurveyResponse> {
    return this.getSurveyResponses(participantId, {
      filterType: "all",
      surveyFilter: "pinned",
    }) as Promise<GroupedSurveyResponse>
  }

  /**
   * Get all survey responses under a specific bin, merged across all surveys in the bin
   * and sorted by timestamp descending.
   *
   * The bin is identified by its `id` field from the researcher's surveyDisplayConfig
   * (groups[].bins[].id). Each response entry includes `surveyId` and `surveyTitle`
   * so the caller knows which survey it came from.
   *
   * When `limit` is provided it applies bin-wide — the latest N responses across
   * all surveys in the bin are returned (not N per survey).
   *
   * @param participantId - The participant ID
   * @param binId - The bin ID (bin.id from surveyDisplayConfig)
   * @param filterParams - Optional filter parameters
   * @returns Promise<BinSurveyResponse>
   *
   * @example
   * // Get all responses under a bin (no date filter)
   * const result = await LAMP.SurveyResponse.getBinSurveyResponses('participant_id', 'bin_id');
   *
   * @example
   * // Get latest 5 responses across all surveys in the bin
   * const result = await LAMP.SurveyResponse.getBinSurveyResponses('participant_id', 'bin_id', { limit: 5 });
   *
   * @example
   * // Get responses for the current week
   * const result = await LAMP.SurveyResponse.getBinSurveyResponses('participant_id', 'bin_id', {
   *   filterType: 'weekly'
   * });
   *
   * @example
   * // Get responses for a specific month
   * const result = await LAMP.SurveyResponse.getBinSurveyResponses('participant_id', 'bin_id', {
   *   filterType: 'monthly',
   *   month: 3,
   *   year: 2026
   * });
   */
  public async getBinSurveyResponses(
    participantId: Identifier,
    binId: string,
    filterParams: BinFilterParams = { filterType: "all" }
  ): Promise<BinSurveyResponse> {
    if (participantId === null || participantId === undefined) {
      throw new Error(
        "Required parameter participantId was null or undefined when calling getBinSurveyResponses."
      )
    }
    if (!binId) {
      throw new Error(
        "Required parameter binId was null or undefined when calling getBinSurveyResponses."
      )
    }

    if (this.configuration?.base === "https://demo.lamp.digital") {
      return Promise.resolve({
        groupId: "",
        groupLabel: "",
        binLabel: "",
        binDescription: undefined,
        responses: [],
      })
    }

    const queryParams = new URLSearchParams()
    queryParams.set("filterType", filterParams.filterType ?? "all")

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

    const result = await Fetch.get<{ data: BinSurveyResponse }>(
      `/participant/${participantId}/survey_responses/bin/${binId}?${queryParams.toString()}`,
      this.configuration
    )

    return result.data || {
      groupId: "",
      groupLabel: "",
      binLabel: "",
      binDescription: undefined,
      responses: [],
    }
  }
}

