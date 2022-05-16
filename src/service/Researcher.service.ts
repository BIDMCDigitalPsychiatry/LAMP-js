import { Fetch } from "./Fetch"
import { Identifier } from "../model/Type"
import { Researcher } from "../model/Researcher"
import { Demo } from "./Demo"
import LAMP from '../index'
import jsonata from "jsonata"

export class ResearcherService {

  /**
   * Get the set of all researchers.
   */
  public async all(transform?: string): Promise<Researcher[]> {
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)

      let output = Demo.Researcher.map(x => Object.assign(new Researcher(), x))
      output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
      return Promise.resolve(output)
    }
    return (await Fetch.get<{ data: any[] }>(`/researcher`, LAMP.Auth._auth)).data.map(x =>
      Object.assign(new Researcher(), x)
    )
  }

  /**
   * Create a new Researcher.
   * @param researcher
   */
  public async create(researcher: Researcher): Promise<Identifier> {
    if (researcher === null || researcher === undefined)
      throw new Error("Required parameter researcher was null or undefined when calling researcherCreate.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.post(`/researcher`, researcher, LAMP.Auth._auth)
  }

  /**
   * Delete a researcher.
   * @param researcherId
   */
  public async delete(researcherId: Identifier): Promise<Identifier> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherDelete.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.delete(`/researcher/${researcherId}`, LAMP.Auth._auth)
  }

  /**
   * Update a Researcher's settings.
   * @param researcherId
   * @param body
   */
  public async update(researcherId: Identifier, researcher: Researcher): Promise<Identifier> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherUpdate.")
    if (researcher === null || researcher === undefined)
      throw new Error("Required parameter researcher was null or undefined when calling researcherUpdate.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.put(`/researcher/${researcherId}`, researcher, LAMP.Auth._auth)
  }

  /**
   * Get a single researcher, by identifier.
   * @param researcherId
   */
  public async view(researcherId: Identifier, transform?: string): Promise<Researcher> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherView.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (researcherId === "me") researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId

      let data = Demo.Researcher.filter(x => x["id"] === researcherId).map(x => Object.assign(new Researcher(), x))
      if (data.length > 0) {
        let output = data[0]
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/researcher/${researcherId}`, LAMP.Auth._auth)).data.map(x =>
      Object.assign(new Researcher(), x)
    )[0]
  }
}
