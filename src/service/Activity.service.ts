import { Fetch } from "./Fetch"
import { Activity } from "../model/Activity"
import { Identifier } from "../model/Type"
import { Participant } from "../model/Participant"
import { Demo } from "./Demo"
import LAMP from '../index'
import jsonata from "jsonata"

export class ActivityService {

  /**
   * Get the set of all activities.
   */
  public async all(transform?: string): Promise<Activity[]> {
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      let output = Demo.Activity.map(x => Object.assign(new Activity(), x))
      output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
      return Promise.resolve(output)
    }
    return (await Fetch.get<{ data: any[] }>(`/activity`)).data.map(x =>
      Object.assign(new Activity(), x)
    )
  }

  /**
   * Get the set of all activities available to a participant,  by participant identifier.
   * @param participantId
   */
  public async allByParticipant(participantId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Activity[]> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling activityAllByParticipant.")
    if (ignore_binary === null || ignore_binary === undefined) ignore_binary = false
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter(x => x["id"] === participantId).length > 0) {
        let output = Demo.Activity.filter(x =>
          Demo.Participant.filter(y => y["id"] === participantId)
            .map(y => y["#parent"])
            .includes(x["#parent"])
        ).map(x => Object.assign(new Activity(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (
      await Fetch.get<{ data: any[] }>(`/participant/${participantId}/activity?ignore_binary=${ignore_binary}`)
    ).data.map(x => Object.assign(new Activity(), x))
  }

  /**
   * Get the set of all activities available to participants  of any study conducted by a researcher, by researcher identifier.
   * @param researcherId
   */
  public async allByResearcher(researcherId: Identifier, transform?: string): Promise<Activity[]> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling activityAllByResearcher.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) {
        return Promise.resolve({ error: "403.invalid-credentials" } as any)
      }
      if (researcherId === "me") {
        researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId
      }

      if (Demo.Researcher.filter(x => x["id"] === researcherId).length > 0) {
        let output = Demo.Activity.filter(x =>
          Demo.Study.filter(y => y["#parent"] === researcherId)
            .map(y => y["id"])
            .includes(x["#parent"])
        ).map(x => Object.assign(new Activity(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/researcher/${researcherId}/activity`)).data.map(x =>
      Object.assign(new Activity(), x)
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
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter(x => x["id"] === studyId).length > 0) {
        let output = Demo.Activity.filter(x => x["#parent"] === studyId).map(x => Object.assign(new Activity(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/study/${studyId}/activity?ignore_binary=${ignore_binary}`)).data.map(x =>
      Object.assign(new Activity(), x)
    )
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

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter(x => x["id"] === studyId).length > 0) {
        let data = {
          "#type": "Activity",
          "#parent": studyId,
          ...(activity as any),
          id:
            "activity" +
            Math.random()
              .toString()
              .substring(2, 6)
        }
        Demo.Activity.push(data)
        return Promise.resolve({ data: data["id"] } as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.post(`/study/${studyId}/activity`, activity)
  }

  /**
   * Delete an Activity.
   * @param activityId
   */
  public async delete(activityId: Identifier): Promise<Identifier> {
    if (activityId === null || activityId === undefined)
      throw new Error("Required parameter activityId was null or undefined when calling activityDelete.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (activityId === "me") activityId = credential.length > 0 ? credential[0]["origin"] : activityId

      let idx = Demo.Activity.findIndex(x => x["id"] === activityId)
      if (idx >= 0) {
        Demo.Activity.splice(idx, 1)
        Demo.ActivityEvent = Demo.ActivityEvent.filter(x => x["activity"] !== activityId)
        Demo.Credential = Demo.Credential.filter(x => x["#parent"] !== activityId)
        Demo.Tags = Demo.Tags.filter(x => x["#parent"] !== activityId && x["target"] !== activityId)
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.delete(`/activity/${activityId}`)
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

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (activityId === "me") activityId = credential.length > 0 ? credential[0]["origin"] : activityId

      let idx = Demo.Activity.findIndex(x => x["id"] === activityId)
      if (idx >= 0) {
        Demo.Activity[idx] = {
          "#type": "Activity",
          "#parent": Demo.Activity[idx]["#parent"],
          id: Demo.Activity[idx]["id"],
          spec: Demo.Activity[idx]["spec"],
          name: activity.name ?? Demo.Activity[idx]["name"],
          settings:
            Demo.Activity[idx]["spec"] === "lamp.survey" ? Demo.Activity[idx]["settings"] : (activity.settings as any),
          schedule: activity.schedule as any
        }
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.put(`/activity/${activityId}`, activity)
  }

  /**
   * Get a single activity, by identifier.
   * @param activityId
   */
  public async view(activityId: Identifier, transform?: string, ignore_binary?:boolean): Promise<Activity> {
    if (activityId === null || activityId === undefined)
      throw new Error("Required parameter activityId was null or undefined when calling activityView.")
    if (ignore_binary === null || ignore_binary === undefined) ignore_binary = false
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (activityId === "me") activityId = credential.length > 0 ? credential[0]["origin"] : activityId

      let data = Demo.Activity.filter(x => x["id"] === activityId).map(x => Object.assign(new Activity(), x))
      if (data.length > 0) {
        let output = data[0]
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/activity/${activityId}?ignore_binary=${ignore_binary}`)).data.map(x =>
      Object.assign(new Activity(), x)
    )[0]
  }
}
