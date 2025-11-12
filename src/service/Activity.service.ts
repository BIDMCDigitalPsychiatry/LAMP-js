import { Fetch, Configuration } from "./Fetch"
import { Activity } from "../model/Activity"
import { Identifier } from "../model/Type"
import { Participant } from "../model/Participant"
import { Demo } from "./Demo"
import jsonata from "jsonata"

export class ActivityService {
  public configuration?: Configuration

  /**
   * Get the set of all activities.
   */
  public async all(transform?: string): Promise<Activity[]> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      let output = Demo.Activity?.map((x) => Object.assign(new Activity(), x))
      output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
      return Promise.resolve(output)
    }
    return (await Fetch.get<{ data: any[] }>(`/activity`, this.configuration)).data?.map((x) =>
      Object.assign(new Activity(), x)
    )
  }

  /**
   * Get the set of all activities available to a participant,  by participant identifier.
   * @param participantId
   */
  public async allByParticipant(
    participantId: Identifier,
    transform?: string,
    ignore_binary?: boolean
  ): Promise<Activity[]> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling activityAllByParticipant.")
    if (ignore_binary === null || ignore_binary === undefined) ignore_binary = false
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        let output = Demo.Activity.filter((x) =>
          Demo.Participant.filter((y) => y["id"] === participantId)
            ?.map((y) => y["#parent"])
            .includes(x["#parent"])
        )?.map((x) => Object.assign(new Activity(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (
      await Fetch.get<{ data: any[] }>(
        `/participant/${participantId}/activity?ignore_binary=${ignore_binary}`,
        this.configuration
      )
    ).data?.map((x) => Object.assign(new Activity(), x))
  }

  /**
   * Get the set of all activities available to participants  of any study conducted by a researcher, by researcher identifier.
   * @param researcherId
   */
  public async allByResearcher(researcherId: Identifier, transform?: string): Promise<Activity[]> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling activityAllByResearcher.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) {
        return Promise.resolve({ error: "403.invalid-credentials" } as any)
      }
      if (researcherId === "me") {
        researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId
      }

      if (Demo.Researcher.filter((x) => x["id"] === researcherId).length > 0) {
        let output = Demo.Activity.filter((x) =>
          Demo.Study.filter((y) => y["#parent"] === researcherId)
            ?.map((y) => y["id"])
            .includes(x["#parent"])
        )?.map((x) => Object.assign(new Activity(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/researcher/${researcherId}/activity`, this.configuration)).data?.map(
      (x) => Object.assign(new Activity(), x)
    )
  }

  /**
   * Get the set of all activities available to  participants of a single study, by study identifier.
   * @param studyId
   */
  public async allByStudy(studyId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Activity[]> {
    if (studyId === null || studyId === undefined)
      throw new Error("Required parameter studyId was null or undefined when calling activityAllByStudy.")
    if (ignore_binary === null || ignore_binary === undefined) ignore_binary = false
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter((x) => x["id"] === studyId).length > 0) {
        let output = Demo.Activity.filter((x) => x["#parent"] === studyId)?.map((x) => Object.assign(new Activity(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (
      await Fetch.get<{ data: any[] }>(`/study/${studyId}/activity?ignore_binary=${ignore_binary}`, this.configuration)
    ).data?.map((x) => Object.assign(new Activity(), x))
  }
  /**
   * Get the set of all activities available to  participants of a single study, by participant identifier.
   * @param participantId
   */
  public async listActivities(participantId: Identifier, tab?: string, transform?: string): Promise<{}> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling listActivities.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        let output = Demo.Activity.filter((x) => x["#parent"] === participantId)?.map((x) =>
          Object.assign(new Activity(), x)
        )
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.get<{ data: any[] }>(`/activity/${participantId}/activity?tab=${tab}`, this.configuration) //.data .map((x) => Object.assign(new Activity(), x))
  }

  /**
   * Create a new Activity under the given Study.
   * @param studyId
   * @param activity
   */
  public async create(studyId: Identifier, activity: Activity): Promise<Identifier> {
    if (studyId === null || studyId === undefined)
      throw new Error("Required parameter studyId was null or undefined when calling activityCreate.")
    if (activity === null || activity === undefined)
      throw new Error("Required parameter activity was null or undefined when calling activityCreate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter((x) => x["id"] === studyId).length > 0) {
        let data = {
          "#type": "Activity",
          "#parent": studyId,
          ...(activity as any),
          id: "activity" + Math.random().toString().substring(2, 6),
        }
        Demo.Activity.push(data)
        return Promise.resolve({ data: data["id"] } as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.post(`/study/${studyId}/activity`, activity, this.configuration)
  }

  /**
   * Delete an Activity.
   * @param activityId
   */
  public async delete(activityId: Identifier): Promise<Identifier> {
    if (activityId === null || activityId === undefined)
      throw new Error("Required parameter activityId was null or undefined when calling activityDelete.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (activityId === "me") activityId = credential.length > 0 ? credential[0]["origin"] : activityId

      let idx = Demo.Activity.findIndex((x) => x["id"] === activityId)
      if (idx >= 0) {
        Demo.Activity.splice(idx, 1)
        Demo.ActivityEvent = Demo.ActivityEvent.filter((x) => x["activity"] !== activityId)
        Demo.Credential = Demo.Credential.filter((x) => x["#parent"] !== activityId)
        Demo.Tags = Demo.Tags.filter((x) => x["#parent"] !== activityId && x["target"] !== activityId)
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.delete(`/activity/${activityId}`, this.configuration)
  }

  /**
   * Update an Activity's settings.
   * @param activityId
   * @param activity
   */
  public async update(activityId: Identifier, activity: Activity): Promise<Identifier> {
    if (activityId === null || activityId === undefined)
      throw new Error("Required parameter activityId was null or undefined when calling activityUpdate.")
    if (activity === null || activity === undefined)
      throw new Error("Required parameter activity was null or undefined when calling activityUpdate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (activityId === "me") activityId = credential.length > 0 ? credential[0]["origin"] : activityId

      let idx = Demo.Activity.findIndex((x) => x["id"] === activityId)
      if (idx >= 0) {
        Demo.Activity[idx] = {
          "#type": "Activity",
          "#parent": Demo.Activity[idx]["#parent"],
          id: Demo.Activity[idx]["id"],
          spec: Demo.Activity[idx]["spec"],
          name: activity.name ?? Demo.Activity[idx]["name"],
          settings:
            Demo.Activity[idx]["spec"] === "lamp.survey" ? Demo.Activity[idx]["settings"] : (activity.settings as any),
          schedule: activity.schedule as any,
        }
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.put(`/activity/${activityId}`, activity, this.configuration)
  }

  /**
   * Get a single activity, by identifier.
   * @param activityId
   */
  public async view(activityId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Activity> {
    if (activityId === null || activityId === undefined)
      throw new Error("Required parameter activityId was null or undefined when calling activityView.")
    if (ignore_binary === null || ignore_binary === undefined) ignore_binary = false
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (activityId === "me") activityId = credential.length > 0 ? credential[0]["origin"] : activityId

      let data = Demo.Activity.filter((x) => x["id"] === activityId)?.map((x) => Object.assign(new Activity(), x))
      if (data.length > 0) {
        let output = data[0]
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (
      await Fetch.get<{ data: any[] }>(`/activity/${activityId}?ignore_binary=${ignore_binary}`, this.configuration)
    ).data?.map((x) => Object.assign(new Activity(), x))[0]
  }

  /**
   * Get the set of all sub-activities available to a module,  by module identifier.
   * @param moduleId
   * @param participantId
   */
  public async moduleByParticipant(
    moduleId: Identifier,
    participantId: Identifier,
    startTime?: number,
    endTime?: number
  ): Promise<any[]> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling moduleByParticipant.")
    if (moduleId === null || moduleId === undefined)
      throw new Error("Required parameter moduleId was null or undefined when calling moduleByParticipant.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId
      if (moduleId === "me") moduleId = credential.length > 0 ? credential[0]["origin"] : moduleId

      if (Demo.Activity.filter((x) => x["id"] === moduleId).length > 0) {
        let output = Demo.Activity.filter((x) => x["#parent"] === moduleId)?.map((x) =>
          Object.assign(new Activity(), x)
        )

        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    const params = new URLSearchParams()
    if (startTime !== undefined && startTime !== null) {
      params.append('startTime', startTime.toString())
    }
    if (endTime !== undefined && endTime !== null) {
      params.append('endTime', endTime.toString())
    }
    const queryString = params.toString()
    const url = `/module/${moduleId}/${participantId}${queryString ? `?${queryString}` : ''}`
    return (
      await Fetch.get<{ data: any[] }>(
        url,
        this.configuration
      )
    ).data?.map((x) => Object.assign(new Activity(), x))
  }

  /**
   * Get the set of all scheduled activities available to a participant, by participant identifier.
   * @param participantId
   */
  public async scheduledActivities(
    participantId: Identifier,
    transform?: string,
    ignore_binary?: boolean
  ): Promise<Activity[]> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling activityAllByParticipant.")
    if (ignore_binary === null || ignore_binary === undefined) ignore_binary = false
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        let output = Demo.Activity.filter((x) =>
          Demo.Participant.filter((y) => y["id"] === participantId)
            ?.map((y) => y["#parent"])
            .includes(x["#parent"])
        )?.map((x) => Object.assign(new Activity(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }

    const result = (await Fetch.get<{ data: any[] }>(
      `/participant/${participantId}/activitySchedule?ignore_binary=${ignore_binary}`,
      this.configuration
    )) as any
    return result
  }

  /**
   * Get the set of all empty tabs by participant identifier.
   * @param participantId
   */
  public async emptyTabs(participantId: Identifier, transform?: string): Promise<Activity[]> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling activityAllByParticipant.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        let output = Demo.Activity.filter((x) =>
          Demo.Participant.filter((y) => y["id"] === participantId)
            ?.map((y) => y["#parent"])
            .includes(x["#parent"])
        )?.map((x) => Object.assign(new Activity(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }

    const result = (await Fetch.get<{ data: any[] }>(
      `/participant/${participantId}/emptyTab`,
      this.configuration
    )) as any
    return result
  }

  /**
   * Delete multiple activities.
   * @param activities
   */
  public async deleteActivities(activities:any): Promise<{ error?: string }> {
    if (!activities || activities.length === 0) {
      throw new Error("Required parameter 'activities' was null, undefined, or empty when calling deleteActivities.")
    }

    // Check if we are in DEMO mode
    if (this.configuration.base === "https://demo.lamp.digital") {
      // Parse demo credentials from authorization (format: "access_key:secret_key")
      const auth = (this.configuration.authorization || ":").split(":", 2)
      const [access_key, secret_key] = auth

      const credential = Demo.Credential.filter((x) => x["access_key"] === access_key && x["secret_key"] === secret_key)

      // Invalid credentials
      if (credential.length === 0) {
        return { error: "403.invalid-credentials" }
      }

      // Map "me" to the credential's origin if present
      const resolvedActivities = activities.map((id) =>
        id === "me" && credential[0]["origin"] ? credential[0]["origin"] : id
      )

      // Track deleted and not-found IDs (for debugging or reporting)
      const notFound: string[] = []

      for (const activityId of resolvedActivities) {
        const idx = Demo.Activity.findIndex((x) => x["id"] === activityId)

        if (idx >= 0) {
          // Remove related records
          Demo.ActivityEvent = Demo.ActivityEvent.filter((x) => x["activity"] !== activityId)
          Demo.Credential = Demo.Credential.filter((x) => x["#parent"] !== activityId)
          Demo.Tags = Demo.Tags.filter((x) => x["#parent"] !== activityId && x["target"] !== activityId)

          // Remove the activity itself
          Demo.Activity.splice(idx, 1)
        } else {
          notFound.push(activityId)
        }
      }

      // Return error if any IDs were not found
      if (notFound.length > 0) {
        return { error: `404.not-found: ${notFound.join(", ")}` }
      }
    }
    return await Fetch.delete(`/activities`, this.configuration, activities)
  }


  /**
   * Get the set of all sub-activities available to a module in participant feed,  by module identifier,participant Identifier,startTime and EndTime.
   * @param participantId
   * @param modules
   */
  public async feedModules(participantId: Identifier, modules: any): Promise<any[]> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling feedModules.")
    if (modules === null || modules === undefined)
      throw new Error("Required parameter modules was null or undefined when calling feedModules.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        let output = Demo.Activity.filter((x) =>
          Demo.Participant.filter((y) => y["id"] === participantId)
            ?.map((y) => y["#parent"])
            .includes(x["#parent"])
        )?.map((x) => Object.assign(new Activity(), x))

        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.post<{ data: any[] }>(`/feed/module/${participantId}`, this.configuration)).data?.map((x) =>
      Object.assign(new Activity(), x)
    )
  }

  /**
   * Get the list of favorite activity IDs for a participant.
   * Returns custom selected activity IDs if Researcher_settings choice is "custom",
   * otherwise returns the last 10 activity IDs most recently added to lamp.dashboard.favorite_activities tag.
   * @param participantId
   * @param transform
   */
  public async favoriteActivityIds(participantId: Identifier, transform?: string): Promise<string[]> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling favoriteActivityIds.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        // Return empty array for demo mode
        let output: string[] = []
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }

    const result = await Fetch.get<{ data: string[] }>(
      `/participant/${participantId}/favorite_activities`,
      this.configuration
    )
    let output = result.data || []
    output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
    return output
  }

  /**
   * Get feed details (schedule window entries with completion) for a participant and optional date (ms since epoch).
   * @param participantId
   * @param dateMs optional UTC ms for the day to fetch; defaults to today if omitted
   */
  public async feedDetails(participantId: Identifier, dateMs?: string): Promise<any> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling feedDetails.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO: no server-side computation; return empty set
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId
      return []
    }

    const tzOffsetMinutes = new Date().getTimezoneOffset()
    const url = `/participant/${participantId}/feedDetails?date=${dateMs}&tzOffsetMinutes=${tzOffsetMinutes}`
    const result = await Fetch.get<{ data: any }>(url, this.configuration)
    return result.data || {}
  }
}
