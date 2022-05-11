import { Fetch } from "./Fetch"
import { ActivitySpec } from "../model/ActivitySpec"
import { Identifier } from "../model/Type"
import { Demo } from "./Demo"
import LAMP from '../index'
import jsonata from "jsonata"

export class ActivitySpecService {

  /**
   * Get all ActivitySpecs registered.
   */
  public async all(transform?: string): Promise<ActivitySpec[]> {
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let output = Demo.ActivitySpec.map(x => Object.assign(new ActivitySpec(), x))
      output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
      return Promise.resolve(output)
    }
    return (await Fetch.get<{ data: any[] }>(`/activity_spec`)).data.map(x =>
      Object.assign(new ActivitySpec(), x)
    )
  }

  /**
   * Create a new ActivitySpec.
   * @param activitySpec
   */
  public async create(activitySpec: ActivitySpec): Promise<Identifier> {
    if (activitySpec === null || activitySpec === undefined)
      throw new Error("Required parameter activitySpec was null or undefined when calling activitySpecCreate.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.post(`/activity_spec`, activitySpec)
  }

  /**
   * Delete an ActivitySpec.
   * @param activitySpecName
   */
  public async delete(activitySpecName: Identifier): Promise<Identifier> {
    if (activitySpecName === null || activitySpecName === undefined)
      throw new Error("Required parameter activitySpecName was null or undefined when calling activitySpecDelete.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.delete(`/activity_spec/${activitySpecName}`)
  }

  /**
   * Update an ActivitySpec.
   * @param activitySpecName
   * @param activitySpec
   */
  public async update(activitySpecName: Identifier, activitySpec: ActivitySpec): Promise<Identifier> {
    if (activitySpecName === null || activitySpecName === undefined)
      throw new Error("Required parameter activitySpecName was null or undefined when calling activitySpecUpdate.")
    if (activitySpec === null || activitySpec === undefined)
      throw new Error("Required parameter activitySpec was null or undefined when calling activitySpecUpdate.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.put(`/activity_spec/${activitySpecName}`, activitySpec)
  }

  /**
   * View an ActivitySpec.
   * @param activitySpecName
   */
  public async view(activitySpecName: string, transform?: string): Promise<ActivitySpec> {
    if (activitySpecName === null || activitySpecName === undefined)
      throw new Error("Required parameter activitySpecName was null or undefined when calling activitySpecView.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let data = Demo.ActivitySpec.filter(x => x["name"] === activitySpecName).map(x =>
        Object.assign(new ActivitySpec(), x)
      )
      if (data.length > 0) {
        let output = data[0]
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/activity_spec/${activitySpecName}`)).data.map(x =>
      Object.assign(new ActivitySpec(), x)
    )[0]
  }
}
