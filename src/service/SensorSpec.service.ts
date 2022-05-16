import { Fetch } from "./Fetch"
import { Identifier } from "../model/Type"
import { SensorSpec } from "../model/SensorSpec"
import { Demo } from "./Demo"
import LAMP from '../index'
import jsonata from "jsonata"

export class SensorSpecService {

  /**
   * Get all SensorSpecs registered by any Researcher.
   */
  public async all(transform?: string): Promise<SensorSpec[]> {
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let output = Demo.SensorSpec.map(x => Object.assign(new SensorSpec(), x))
      output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
      return Promise.resolve(output)
    }
    return (await Fetch.get<{ data: any[] }>(`/sensor_spec`, LAMP.Auth._auth)).data.map(x =>
      Object.assign(new SensorSpec(), x)
    )
  }

  /**
   * Create a new SensorSpec.
   * @param sensorSpec
   */
  public async create(sensorSpec: SensorSpec): Promise<Identifier> {
    if (sensorSpec === null || sensorSpec === undefined)
      throw new Error("Required parameter sensorSpec was null or undefined when calling sensorSpecCreate.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.post(`/sensor_spec`, sensorSpec, LAMP.Auth._auth)
  }

  /**
   * Delete an SensorSpec.
   * @param sensorSpecName
   */
  public async delete(sensorSpecName: string): Promise<Identifier> {
    if (sensorSpecName === null || sensorSpecName === undefined)
      throw new Error("Required parameter sensorSpecName was null or undefined when calling sensorSpecDelete.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.delete(`/sensor_spec/${sensorSpecName}`, LAMP.Auth._auth)
  }

  /**
   * Update an SensorSpec.
   * @param sensorSpecName
   * @param sensorSpec
   */
  public async update(sensorSpecName: string, sensorSpec: SensorSpec): Promise<Identifier> {
    if (sensorSpecName === null || sensorSpecName === undefined)
      throw new Error("Required parameter sensorSpecName was null or undefined when calling sensorSpecUpdate.")
    if (sensorSpec === null || sensorSpec === undefined)
      throw new Error("Required parameter sensorSpec was null or undefined when calling sensorSpecUpdate.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.put(`/sensor_spec/${sensorSpecName}`, sensorSpec, LAMP.Auth._auth)
  }

  /**
   * Get a SensorSpec.
   * @param sensorSpecName
   */
  public async view(sensorSpecName: string, transform?: string): Promise<SensorSpec> {
    if (sensorSpecName === null || sensorSpecName === undefined)
      throw new Error("Required parameter sensorSpecName was null or undefined when calling sensorSpecView.")

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let data = Demo.SensorSpec.filter(x => x["name"] === sensorSpecName).map(x => Object.assign(new SensorSpec(), x))
      if (data.length > 0) {
        let output = data[0]
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/sensor_spec/${sensorSpecName}`, LAMP.Auth._auth)).data.map(x =>
      Object.assign(new SensorSpec(), x)
    )[0]
  }
}
