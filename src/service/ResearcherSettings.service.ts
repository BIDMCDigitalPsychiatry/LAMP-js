import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"
import { ResearcherBanner, ResearcherSettings } from "../model/ResearcherSettings"

export class ResearcherSettingsService {
  public configuration?: Configuration

  /**
   * Create Researcher Settings.
   * @param researcherId
   */
  public async createResearcherSettings(
    researcherId: Identifier,
    researcherData: any,
    choice?: any
  ): Promise<Identifier> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherSettingsCreate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const res: any = await Fetch.post(
      `/researcherSettings/${researcherId}?choice=${choice}`,
      researcherData,
      this.configuration
    )
    return res
  }

  /**
   * Get Researcher Settings.
   * @param researcherId
   */
  public async getResearcherSettings(type: string, id: Identifier): Promise<any> {
    if (id === null || id === undefined)
      throw new Error("Required parameter id was null or undefined when calling researcherSettingsGet.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = (await Fetch.get(`/researcherSettings/${type}/${id}`, this.configuration)) as ResearcherBanner
    return result.data
  }

  public async getResearcherSettingsforParticipant(participantId: Identifier): Promise<any> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherSettingsGet.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = (await Fetch.get(
      `/participant/researcherSettings/${participantId}`,
      this.configuration
    )) as ResearcherBanner
    return result.data
  }
}
