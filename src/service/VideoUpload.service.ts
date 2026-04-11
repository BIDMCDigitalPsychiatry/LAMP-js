import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"
import { PartEtagData, VideoMetadata, VideoUpload } from "../model/VideoUpload"
import { invariant } from "../utils/invariant"

// const VIDEO_UPLOAD_API_BASE = "https://video.dev.lamp.digital"

const VIDEO_UPLOAD_API_BASE = "http://localhost:8099"

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
      { // Note: temp override of base; remove after LAMP-server integration
        ... this.configuration,
        base: VIDEO_UPLOAD_API_BASE
      },
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
   * @param uploadId The identifier of the VideoUpload returned by `VideoUploadService.initiate`
   * @param parts 
   * @returns 
   */
  public async complete(
    participantId: Identifier,
    uploadId: Identifier,
    parts: PartEtagData[]
  ): Promise<{ status: string, sha256: string, uploadId: Identifier }> {

    invariant(isIdentifier(participantId), "Required parameter `participantId` missing or empty when calling VideoUploadService.complete")
    invariant(isIdentifier(uploadId), "Required parameter `uploadId` missing or empty when calling VideoUploadService.complete")
    invariant(Array.isArray(parts) && parts.length > 0, "Required parameter `parts` is missing or empty when calling VideoUploadService.complete" )
    invariant((this.configuration?.base != "https://demo.lamp.digital"), "VideoUploadService.complete is not available in the demo")

    return (await Fetch.post<{ status: string, sha256: string, uploadId: Identifier }>(
      `/participant/${participantId}/video/upload/complete`,
      {
        uploadId,
        parts
      },
      { // Note: temp override of base; remove after LAMP-server integration
        ... this.configuration,
        base: VIDEO_UPLOAD_API_BASE
      }
    ))
  }

  public async refreshUrls(
    participantId: Identifier,
    uploadId: Identifier,
    partNumbers: number[]
  ): Promise<VideoUpload> {

    invariant(isIdentifier(participantId), "Required parameter `participantId` missing or empty when calling VideoUploadService.refreshUrls")
    invariant(isIdentifier(uploadId), "Required parameter `uploadId` missing or empty when calling VideoUploadService.refreshUrls")
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
        uploadId,
        partNumbers: partNumbers
      },
      { // Note: temp override of base; remove after LAMP-server integration
        ... this.configuration,
        base: VIDEO_UPLOAD_API_BASE
      }
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
   * @param uploadId Required. The target video upload.
   */
  public async abort(
    participantId: Identifier,
    uploadId: Identifier
  ) : Promise<void> {
    invariant(isIdentifier(participantId), "Required parameter `participantId` missing or empty when calling VideoUploadService.abort")
    invariant(isIdentifier(uploadId), "Required parameter `uploadId` missing or empty when calling VideoUploadService.abort")
    invariant((this.configuration?.base != "https://demo.lamp.digital"), "VideoUploadService.abort not available in the demo")

    // Note: temp override of base; remove after LAMP-server integration
    const shouldUseDemoVideoUploadApi = true
    const apiBase = shouldUseDemoVideoUploadApi ? VIDEO_UPLOAD_API_BASE : this.configuration?.base

    // Note: using unwrapped `fetch` call here to surface the http status code returned
    // Warning! this may break with pending auth changes (TODO, FIXME)
    const headers : Record<string, string> = {}
    headers["Content-Type"] = "application/json"
    if (this.configuration && this.configuration.authorization) {
      headers["Authorization"] = `Basic ${this.configuration.authorization}`
    }

    const response = await fetch(`${apiBase}/participant/${participantId}/video/upload/abort`, {
      method: "POST",
      headers,
      body: JSON.stringify({ uploadId }),
    })

    if (! response.ok) {
      throw new Error("Failed to abort video upload using VideoUploadService.abort.")
    }
  }
}
