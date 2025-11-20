import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"

export class ImageUploadService {
  public configuration?: Configuration

  /**
   * Upload an image file to Azure Blob Storage
   * @param imageType - Type of image: "tip_images", "survey_question_icons", or "activity_images"
   * @param file - The image file to upload
   * @returns Promise with originalUrl and thumbnailUrl
   */
  public async uploadImage(
    imageType: "tip_images" | "survey_question_icons" | "activity_images",
    file: File
  ): Promise<{ originalUrl: string; thumbnailUrl: string }> {
    if (!file) {
      throw new Error("File is required for image upload")
    }

    if (!["tip_images", "survey_question_icons", "activity_images"].includes(imageType)) {
      throw new Error("Invalid image type. Must be one of: tip_images, survey_question_icons, activity_images")
    }

    if (!this.configuration) {
      throw new Error("Cannot make HTTP request due to invalid configuration.")
    }

    // Create FormData for file upload
    const formData = new FormData()
    formData.append("image", file)

    // Get authorization header - use the same format as Fetch class
    let authorization: string | undefined
    const userTokenFromLocalStore: any = JSON.parse(sessionStorage.getItem("tokenInfo") || "null")
    if (userTokenFromLocalStore?.accessToken) {
      authorization = `Bearer ${
        this.configuration.accessToken ? this.configuration.accessToken : userTokenFromLocalStore?.accessToken
      }`
    }

    // Build headers - don't set Content-Type for FormData (browser will set it with boundary)
    const headers: HeadersInit = {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      ...(this.configuration.headers || {}),
    }
    if (authorization) {
      headers.Authorization = authorization
    }

    // Make POST request with FormData
    const response = await fetch(`${this.configuration.base}/upload/image/${imageType}`, {
      method: "POST",
      headers,
      credentials: "include",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: `HTTP ${response.status}` }))
      throw new Error(error.error || `Upload failed with status ${response.status}`)
    }

    const result = await response.json()
    return result.data || result
  }
}

