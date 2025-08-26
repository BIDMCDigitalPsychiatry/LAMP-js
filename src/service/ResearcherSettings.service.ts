import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"
import {ResearcherBanner, ResearcherSettings } from "../model/ResearcherSettings"

export class ResearcherSettingsService {
  public configuration?: Configuration
  
   /**
   * Create Researcher Settings.
   * @param researcherId
   */
  public async createResearcherSettings(researcherId: Identifier, researcherData: any): Promise<Identifier> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherSettingsCreate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const res: any = await Fetch.post(`/researcherSettings/${researcherId}`, researcherData, this.configuration)
    return res
  }

  /**
   * Get Researcher Settings.
   * @param researcherId
   */
  public async getResearcherSettings(researcherId: Identifier): Promise<ResearcherSettings> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherSettingsGet.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = await Fetch.get(`/researcherSettings/${researcherId}`, this.configuration) as ResearcherBanner
    return result.data
  }
}
