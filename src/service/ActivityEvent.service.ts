import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"
import { ActivityEvent } from "../model/ActivityEvent"
import { Demo } from "./Demo"
import jsonata from "jsonata"

export class ActivityEventService {
  public configuration?: Configuration

  /**
   * Get the set of all activity events produced by a  given participant, by identifier.
   * @param participantId
   * @param origin
   * @param from
   * @param to
   * @param limit
   * @param ignoreBinary
   */
  public async allByParticipant(
    participantId: Identifier,
    origin?: string,
    from?: number,
    to?: number,
    limit?: number,
    ignoreBinary?: boolean,
    transform?: string
  ): Promise<ActivityEvent[]> {
    if (participantId === null || participantId === undefined)
      throw new Error(
        "Required parameter participantId was null or undefined when calling activityEventAllByParticipant."
      )

    let queryParameters = new URLSearchParams()
    if (origin !== undefined && origin !== null) queryParameters.set("origin", <any>origin)
    if (from !== undefined && from !== null) queryParameters.set("from", <any>from)
    if (to !== undefined && to !== null) queryParameters.set("to", <any>to)
    if (limit !== undefined && limit !== null) queryParameters.set("limit", <any>limit)
    queryParameters.set("ignore_binary", <any>ignoreBinary ?? false)
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        let output = Demo.ActivityEvent.filter(
          (x) => x["#parent"] === participantId && (!!origin ? x["activity"] === origin : true)
        ).map((x) => Object.assign(new ActivityEvent(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (
      await Fetch.get<{ data: any[] }>(
        `/participant/${participantId}/activity_event?${queryParameters.toString()}`,
        this.configuration
      )
    ).data?.map((x) => Object.assign(new ActivityEvent(), x))
  }

  /**
   * Get the set of all activity events produced by participants  of any study conducted by a researcher, by researcher identifier.
   * @param researcherId
   * @param origin
   * @param from
   * @param to
   */
  public async allByResearcher(
    researcherId: Identifier,
    origin?: string,
    from?: number,
    to?: number,
    limit?: number,
    transform?: string
  ): Promise<ActivityEvent[]> {
    if (researcherId === null || researcherId === undefined)
      throw new Error(
        "Required parameter researcherId was null or undefined when calling activityEventAllByResearcher."
      )

    let queryParameters = new URLSearchParams()
    if (origin !== undefined && origin !== null) queryParameters.set("origin", <any>origin)
    if (from !== undefined && from !== null) queryParameters.set("from", <any>from)
    if (to !== undefined && to !== null) queryParameters.set("to", <any>to)
    if (limit !== undefined && limit !== null) queryParameters.set("limit", <any>limit)

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (researcherId === "me") researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId

      if (Demo.Researcher.filter((x) => x["id"] === researcherId).length > 0) {
        let participants = Demo.Study.filter((x) => x["#parent"] === researcherId)
          .map((x) => Demo.Participant.filter((y) => y["#parent"] === x["id"]))
          .flat(1)
        let fn = (id: string) =>
          Demo.ActivityEvent.filter((x) => x["#parent"] === id && (!!origin ? x["activity"] === origin : true)).map(
            (x) => Object.assign(new ActivityEvent(), x)
          )
        let output = participants.reduce(
          (all, participant) => ({ ...all, [participant["id"]]: fn(participant["id"]) }),
          {}
        ) as any
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (
      await Fetch.get<{ data: any[] }>(
        `/researcher/${researcherId}/activity_event?${queryParameters.toString()}`,
        this.configuration
      )
    ).data.map((x) => Object.assign(new ActivityEvent(), x))
  }

  /**
   * Get the set of all activity events produced by participants of a single study, by study identifier.
   * @param studyId
   * @param origin
   * @param from
   * @param to
   */
  public async allByStudy(
    studyId: Identifier,
    origin?: string,
    from?: number,
    to?: number,
    limit?: number,
    transform?: string
  ): Promise<ActivityEvent[]> {
    if (studyId === null || studyId === undefined)
      throw new Error("Required parameter studyId was null or undefined when calling activityEventAllByStudy.")

    let queryParameters = new URLSearchParams()
    if (origin !== undefined && origin !== null) queryParameters.set("origin", <any>origin)
    if (from !== undefined && from !== null) queryParameters.set("from", <any>from)
    if (to !== undefined && to !== null) queryParameters.set("to", <any>to)
    if (limit !== undefined && limit !== null) queryParameters.set("limit", <any>limit)

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter((x) => x["id"] === studyId).length > 0) {
        let participants = Demo.Participant.filter((x) => x["#parent"] === studyId)
        let fn = (id: string) =>
          Demo.ActivityEvent.filter((x) => x["#parent"] === id && (!!origin ? x["activity"] === origin : true)).map(
            (x) => Object.assign(new ActivityEvent(), x)
          )
        let output = participants.reduce(
          (all, participant) => ({ ...all, [participant["id"]]: fn(participant["id"]) }),
          {}
        ) as any
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (
      await Fetch.get<{ data: any[] }>(
        `/study/${studyId}/activity_event?${queryParameters.toString()}`,
        this.configuration
      )
    ).data.map((x) => Object.assign(new ActivityEvent(), x))
  }

  /**
   * Create a new ActivityEvent for the given Participant.
   * @param participantId
   * @param activityEvent
   */
  public async create(participantId: Identifier, activityEvent: ActivityEvent): Promise<Identifier> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling activityEventCreate.")
    if (activityEvent === null || activityEvent === undefined)
      throw new Error("Required parameter activityEvent was null or undefined when calling activityEventCreate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        Demo.ActivityEvent.push({
          "#type": "ActivityEvent",
          "#parent": participantId,
          ...(activityEvent as any),
        })
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.post(`/participant/${participantId}/activity_event`, activityEvent, this.configuration)
  }

  /**
   * Delete a ActivityEvent.
   * @param participantId
   * @param origin
   * @param from
   * @param to
   */
  public async delete(participantId: Identifier, origin?: string, from?: number, to?: number): Promise<Identifier> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling activityEventDelete.")

    let queryParameters = new URLSearchParams()
    if (origin !== undefined && origin !== null) queryParameters.set("origin", <any>origin)
    if (from !== undefined && from !== null) queryParameters.set("from", <any>from)
    if (to !== undefined && to !== null) queryParameters.set("to", <any>to)

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter((x) => x["id"] === participantId).length > 0) {
        return Promise.resolve({ error: "500.demo-restriction" } as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.delete(
      `/participant/${participantId}/activity_event?${queryParameters.toString()}`,
      this.configuration
    )
  }
}
