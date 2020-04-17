import { Fetch, Configuration } from "./Fetch"
import { Demo } from "./Demo"
import jsonata from "jsonata"

export class APIService {
  public configuration?: Configuration

  /**
   * Query the LAMP Database.
   */
  public async query(transform: string): Promise<{}> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-unavailable" } as any)
    }
    return await Fetch.post<{}>(`/`, transform, this.configuration)
  }

  /**
   * View the API schema document.
   */
  public async schema(): Promise<{}> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-unavailable" } as any)
    }
    return await Fetch.get<{}>(`/`, this.configuration)
  }
}
