import { Fetch } from "./Fetch"
import { Demo } from "./Demo"
import LAMP from '../index'
import jsonata from "jsonata"

export class APIService {

  /**
   * Query the LAMP Database.
   */
  public async query(transform: string): Promise<{}> {
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-unavailable" } as any)
    }
    return await Fetch.post<{}>(`/`, transform, LAMP.Auth._auth)
  }

  /**
   * View the API schema document.
   */
  public async schema(): Promise<{}> {
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-unavailable" } as any)
    }
    return await Fetch.get<{}>(`/`, LAMP.Auth._auth)
  }
}
