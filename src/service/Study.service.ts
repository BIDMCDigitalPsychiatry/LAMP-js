import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"
import { Study } from "../model/Study"
import { Demo } from "./Demo"
import jsonata from "jsonata"

export class StudyService {
  public configuration?: Configuration

  /**
   * Get the set of all studies.
   */
  public async all(transform?: string): Promise<Study[]> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)

      let output = Demo.Study.map(x => Object.assign(new Study(), x))
      output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
      return Promise.resolve(output)
    }
    return (await Fetch.get<{ data: any[] }>(`/study`, this.configuration)).data.map(x => Object.assign(new Study(), x))
  }

  /**
   * Get the set of studies for a single researcher.
   * @param researcherId
   */
  public async allByResearcher(researcherId: Identifier, transform?: string): Promise<Study[]> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling studyAllByResearcher.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (researcherId === "me") researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId

      if (Demo.Researcher.filter(x => x["id"] === researcherId).length > 0) {
        let output = Demo.Study.filter(x => x["#parent"] === researcherId).map(x => Object.assign(new Study(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/researcher/${researcherId}/study`, this.configuration)).data.map(x =>
      Object.assign(new Study(), x)
    )
  }

  /**
   * Create a new Study for the given Researcher.
   * @param researcherId
   * @param study
   */
  public async create(researcherId: Identifier, study: Study): Promise<Identifier> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling studyCreate.")
    if (study === null || study === undefined)
      throw new Error("Required parameter study was null or undefined when calling studyCreate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (researcherId === "me") researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId

      if (Demo.Researcher.filter(x => x["id"] === researcherId).length > 0) {
        return Promise.resolve({ error: "500.demo-restriction" } as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.post(`/researcher/${researcherId}/study`, study, this.configuration)
  }

  /**
   * Delete a study.
   * @param studyId
   */
  public async delete(studyId: Identifier): Promise<Identifier> {
    if (studyId === null || studyId === undefined)
      throw new Error("Required parameter studyId was null or undefined when calling studyDelete.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter(x => x["id"] === studyId).length > 0) {
        return Promise.resolve({ error: "500.demo-restriction" } as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.delete(`/study/${studyId}`, this.configuration)
  }

  /**
   * Update the study.
   * @param studyId
   * @param study
   */
  public async update(studyId: Identifier, study: Study): Promise<Identifier> {
    if (studyId === null || studyId === undefined)
      throw new Error("Required parameter studyId was null or undefined when calling studyUpdate.")
    if (study === null || study === undefined)
      throw new Error("Required parameter study was null or undefined when calling studyUpdate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter(x => x["id"] === studyId).length > 0) {
        return Promise.resolve({ error: "500.demo-restriction" } as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.put(`/study/${studyId}`, study, this.configuration)
  }

  /**
   * Get a single study, by identifier.
   * @param studyId
   */
  public async view(studyId: Identifier, transform?: string): Promise<Study> {
    if (studyId === null || studyId === undefined)
      throw new Error("Required parameter studyId was null or undefined when calling studyView.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      let data = Demo.Study.filter(x => x["id"] === studyId).map(x => Object.assign(new Study(), x))
      if (data.length > 0) {
        let output = data[0]
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/study/${studyId}`, this.configuration)).data.map(x =>
      Object.assign(new Study(), x)
    )[0]
  }
}
