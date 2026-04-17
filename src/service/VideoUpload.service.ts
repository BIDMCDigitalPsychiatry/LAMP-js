import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"
import { PartEtagData, VideoMetadata, VideoUpload } from "../model/VideoUpload"
import { invariant } from "../utils/invariant"

function getVideoUploadServiceConfig(config: Record<string, any>) : Configuration {
  const global : Record<string, any> = globalThis
  const overrides : Configuration = global.VIDEO_UPLOAD_SERVICE_CONFIG || {}

  return {
    ...config,
    ...overrides
  }
}


function isIdentifier(val: any) : boolean {
  return (typeof val === 'string' && val.length > 0)
}


export class VideoUploadService {
  public configuration?: Configuration

  /**
   * Initiate a new multipart video upload for a participant.
   *
   * @param participantId The id of the participant to which the uploaded file should belong.
   * @param videoMetadata Details about the video file to be uploaded. Size,
   * bitrate, framerate, etc. See `VideoMetadata` interface for details.
   * @returns A `VideoUpload` object containing the multipart upload parameters.
   */
  public async initiate(
    participantId: Identifier,
    videoMetadata: VideoMetadata
  ): Promise<VideoUpload> {

    invariant(!! participantId, "Required parameter `participantId` missing or empty")
    invariant((this.configuration?.base != "https://demo.lamp.digital"), "Video upload service not available in the demo")

    return await Fetch.post<VideoUpload>(
      `/participant/${participantId}/video/upload/initiate`,
      {
        metadata: videoMetadata
      },
      getVideoUploadServiceConfig(this.configuration || {})
    )
  }

  /**
   * Finalize a multipart upload.
   *
   * Once each video part described by the `VideoUpload` information has
   * completed successfully, this method should be called to signal to the
   * server the full video complete and ready for processing.
   *
   * The server will complete the multipart upload and return the sha256 of the
   * file contents it received.
   * 
   * @param participantId The id of the participant to which the uploaded file belongs.
   * @param id The identifier of the VideoUpload returned by `VideoUploadService.initiate`
   * @param parts 
   * @returns 
   */
  public async complete(
    participantId: Identifier,
    id: Identifier,
    parts: PartEtagData[]
  ): Promise<void> {

    invariant(isIdentifier(participantId), "Required parameter `participantId` missing or empty when calling VideoUploadService.complete")
    invariant(isIdentifier(id), "Required parameter `id` missing or empty when calling VideoUploadService.complete")
    invariant(Array.isArray(parts) && parts.length > 0, "Required parameter `parts` is missing or empty when calling VideoUploadService.complete" )
    invariant((this.configuration?.base != "https://demo.lamp.digital"), "VideoUploadService.complete is not available in the demo")

    const response = await Fetch.post(
      `/participant/${participantId}/video/upload/complete`,
      {
        id,
        parts
      },
      getVideoUploadServiceConfig(this.configuration || {})
    )

    return
  }

  public async refreshUrls(
    participantId: Identifier,
    id: Identifier,
    partNumbers: number[]
  ): Promise<VideoUpload> {

    invariant(isIdentifier(participantId), "Required parameter `participantId` missing or empty when calling VideoUploadService.refreshUrls")
    invariant(isIdentifier(id), "Required parameter `id` missing or empty when calling VideoUploadService.refreshUrls")
    invariant(
      (
        Array.isArray(partNumbers) &&
        partNumbers.length > 0 &&
        partNumbers.every(item => typeof item === 'number')
      ), "Required parameter `parts` is missing or empty when calling VideoUploadService.refreshUrls" )
    invariant((this.configuration?.base != "https://demo.lamp.digital"), "VideoUploadService.refreshUrls not available in the demo")

    return await Fetch.post<VideoUpload>(
      `/participant/${participantId}/video/upload/refresh-urls`,
      {
        id,
        partNumbers: partNumbers
      },
      getVideoUploadServiceConfig(this.configuration || {})
    )
  }

  /**
   * Cancel an in-progress multipart upload.
   * 
   * Note: The API endpoint is idempotent and will return an 'ok' response in ALL of the following scenarios:
   *   - The multipart upload was in-flight and is now cancelled
   *   - The multipart upload has already been cancelled
   *   - The multipart upload has already been completed
   * 
   * @param participantId Required. The owner of the target video upload.
   * @param id Required. The target video upload.
   */
  public async abort(
    participantId: Identifier,
    id: Identifier
  ) : Promise<void> {
    invariant(isIdentifier(participantId), "Required parameter `participantId` missing or empty when calling VideoUploadService.abort")
    invariant(isIdentifier(id), "Required parameter `id` missing or empty when calling VideoUploadService.abort")
    invariant((this.configuration?.base != "https://demo.lamp.digital"), "VideoUploadService.abort not available in the demo")

    // Note: using unwrapped `fetch` call here to surface the http status code returned
    // Warning! this may break with pending auth changes (TODO, FIXME)
    const headers : Record<string, string> = {}
    headers["Content-Type"] = "application/json"
    const config = getVideoUploadServiceConfig(this.configuration || {})
    if (config.authorization) {
      headers["Authorization"] = `Basic ${config.authorization}`
    }

    const response = await fetch(`${config.base}/participant/${participantId}/video/upload/abort`, {
      method: "POST",
      headers,
      body: JSON.stringify({ id }),
    })

    if (! response.ok) {
      throw new Error("Failed to abort video upload using VideoUploadService.abort.")
    }
  }
}
