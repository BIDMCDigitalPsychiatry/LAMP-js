import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"
import { Researcher } from "../model/Researcher"
import { Demo } from "./Demo"
import jsonata from "jsonata"

export class ResearcherService {
  public configuration?: Configuration

  /**
   * Get the set of all researchers.
   */
  public async all(transform?: string): Promise<Researcher[]> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)

      let output = Demo.Researcher?.map((x) => Object.assign(new Researcher(), x))
      output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
      return Promise.resolve(output)
    }
    return (await Fetch.get<{ data: any[] }>(`/researcher`, this.configuration))?.data?.map((x) =>
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

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.post(`/researcher`, researcher, this.configuration)
  }

  /**
   * Delete a researcher.
   * @param researcherId
   */
  public async delete(researcherId: Identifier): Promise<Identifier> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherDelete.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.delete(`/researcher/${researcherId}`, this.configuration)
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

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    return await Fetch.put(`/researcher/${researcherId}`, researcher, this.configuration)
  }

  /**
   * Get a single researcher, by identifier.
   * @param researcherId
   */
  public async view(researcherId: Identifier, transform?: string): Promise<Researcher> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling researcherView.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (researcherId === "me") researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId

      let data = Demo.Researcher.filter((x) => x["id"] === researcherId)?.map((x) => Object.assign(new Researcher(), x))

      if (data.length > 0) {
        let output = data[0]
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/researcher/${researcherId}`, this.configuration))?.data?.map((x) =>
      Object.assign(new Researcher(), x)
    )[0]
  }

  public async usersList(id: string, filters: any): Promise<any> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)

      let output = Demo.Researcher?.map((x) => Object.assign(new Researcher(), x))
      return Promise.resolve(output)
    }
    const result = await Fetch.post(`/researcher/${id}/users`, filters, this.configuration) as any
    return result?.data
  }

  public async activitiesList(id: string, filters: any): Promise<any> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)

      let output = Demo.Researcher?.map((x) => Object.assign(new Researcher(), x))
      return Promise.resolve(output)
    }
    const result = await Fetch.post(`/researcher/activities/${id}`, filters, this.configuration) as any
    return result?.data
  }
  public async sensorsList(id: string, filters: any): Promise<any> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)

      let output = Demo.Researcher?.map((x) => Object.assign(new Researcher(), x))
      return Promise.resolve(output)
    }
    const result = await Fetch.post(`/researcher/sensors/${id}`, filters, this.configuration) as any
    return result?.data
  }

  /**
   * Create an activity export job.
   * @param researcherId
   * @param body - { studyIds: string[], specs?: string[], format?: "json" | "ndjson" }
   */
  public async createActivityExport(researcherId: Identifier, body: {
    studyIds: string[]
    specs?: string[]
    format?: "json" | "ndjson"
  }): Promise<{ jobId: string; status: string }> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling createActivityExport.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = await Fetch.post<{ data: { jobId: string; status: string }; error?: string }>(
      `/researcher/${researcherId}/activity-export`,
      body,
      this.configuration
    )
    if (result.error) {
      throw new Error(result.error)
    }
    if (!result.data) {
      throw new Error("Invalid response from export API")
    }
    return result.data
  }

  /**
   * Get activity export job status.
   * @param jobId
   */
  public async getActivityExportJob(jobId: string): Promise<any> {
    if (jobId === null || jobId === undefined)
      throw new Error("Required parameter jobId was null or undefined when calling getActivityExportJob.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = await Fetch.get<{ data: any; error?: string }>(`/exports/${jobId}`, this.configuration)
    if (result.error) {
      throw new Error(result.error)
    }
    if (!result.data) {
      throw new Error("Invalid response from export job API")
    }
    return result.data
  }

  /**
   * Get activity export download URL.
   * @param jobId
   * @param ttl - Time to live in seconds (default: 600)
   */
  public async getActivityExportDownloadUrl(jobId: string, ttl: number = 600): Promise<{
    url: string
    expiresIn: number
    contentType: string
    contentLength: number
  }> {
    if (jobId === null || jobId === undefined)
      throw new Error("Required parameter jobId was null or undefined when calling getActivityExportDownloadUrl.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = await Fetch.get<{ data: any; error?: string }>(`/exports/${jobId}/download?ttl=${ttl}`, this.configuration)
    if (result.error) {
      throw new Error(result.error)
    }
    if (!result.data) {
      throw new Error("Invalid response from export download API")
    }
    return result.data
  }

  /**
   * Create an activity import job.
   * @param researcherId
   * @param body - { studyId: string, format?: "json" | "ndjson" }
   */
  public async createActivityImport(researcherId: Identifier, body: {
    studyId: string
    format?: "json" | "ndjson"
  }): Promise<{ jobId: string; status: string }> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling createActivityImport.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = await Fetch.post<{ data: { jobId: string; status: string }; error?: string }>(
      `/researcher/${researcherId}/activity-import`,
      body,
      this.configuration
    )
    if (result.error) {
      throw new Error(result.error)
    }
    if (!result.data) {
      throw new Error("Invalid response from import API")
    }
    return result.data
  }

  /**
   * Get activity import job status.
   * @param jobId
   */
  public async getActivityImportJob(jobId: string): Promise<any> {
    if (jobId === null || jobId === undefined)
      throw new Error("Required parameter jobId was null or undefined when calling getActivityImportJob.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = await Fetch.get<{ data: any; error?: string }>(`/imports/${jobId}`, this.configuration)
    if (result.error) {
      throw new Error(result.error)
    }
    if (!result.data) {
      throw new Error("Invalid response from import job API")
    }
    return result.data
  }

  /**
   * Get activity import upload URL.
   * @param jobId
   * @param ttl - Time to live in seconds (default: 600)
   */
  public async getActivityImportUploadUrl(jobId: string, ttl: number = 600): Promise<{
    url: string
    expiresIn: number
    blobName: string
  }> {
    if (jobId === null || jobId === undefined)
      throw new Error("Required parameter jobId was null or undefined when calling getActivityImportUploadUrl.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = await Fetch.post<{ data: any; error?: string }>(`/imports/${jobId}/upload-url`, { ttl }, this.configuration)
    if (result.error) {
      throw new Error(result.error)
    }
    if (!result.data) {
      throw new Error("Invalid response from import upload URL API")
    }
    return result.data
  }

  /**
   * Complete activity import upload and trigger processing.
   * @param jobId
   * @param blobName
   */
  public async completeActivityImportUpload(jobId: string, blobName: string): Promise<any> {
    if (jobId === null || jobId === undefined)
      throw new Error("Required parameter jobId was null or undefined when calling completeActivityImportUpload.")
    if (this.configuration.base === "https://demo.lamp.digital") {
      return Promise.resolve({ error: "500.demo-restriction" } as any)
    }
    const result = await Fetch.post<{ data: any; error?: string }>(`/imports/${jobId}/complete-upload`, { blobName }, this.configuration)
    if (result.error) {
      throw new Error(result.error)
    }
    if (!result.data) {
      throw new Error("Invalid response from complete import upload API")
    }
    return result.data
  }
}