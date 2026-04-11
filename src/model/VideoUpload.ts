import { Identifier } from "./Type"

/**
 * Etags are ASCII strings _enclosed in double quotes_.
 * 
 * Bad: "33a64df5" 
 * Good: "\"33a64df5\""
 */
export type Etag = `\"{string}\"`

/**
 * Confirmation information about an uploaded "part" of a multipart video file
 * upload.
 */
export interface PartEtagData {
  partNumber: number,
  etag: Etag
}

export interface VideoMetadata {
  /**
   * Total file size in bytes.
   */
  size: number

  /**
   * Durration of the video in seconds.
   */
  duration: number,

  /**
   * The codec used when encoding the video. Eg, "H.264"
   */
  // TODO: likely want to just use a mime-type that has a codecs parameter
  // https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/codecs_parameter
  codec?: string,

  bitrate?: number,
  frameRate?: number,
  height?: number
  width?: number
}

/**
 * An array describing the composition and destination of each part of the
 * multipart upload.
 */
export interface PartUploadInstruction {
  /**
   * The upload id of the video upload.
   */
  partNumber: number

  /**
   * The range of bytes in the original video file that should be uploaded to the target url.
   */
  byteRange: ByteRange

  /**
   * The URL to which this part of the file should be 
   */
  presignedUrl: string

  /**
   * The HTTP method that should be used to send the data.
   */
  method: 'POST' | 'PUT'

  /**
   * The time at which the URL of this PartUploadInstruction expires as a UNIX
   * timestamp. At time of expiration, client will need to submit a request to
   * refresh this part's URL.
   */
  presignedUrlExpiration: number // UNIX timestamp
}

/**
 * A multipart video upload associated with a Participant.
 */
export interface VideoUpload {
  /**
   * The upload id of the video upload.
   */
  uploadId: Identifier

  /**
   * An array of PartUploadInstructions required by this VideoUpload.
   */
  parts: PartUploadInstruction[]
}

export interface ByteRange {
  /**
   * The first byte that should be included in this part of the multipart upload.
   */
  start: number

  /**
   * The last byte that should be included in this part of the multipart upload. Inclusive.
   */
  end: number
}
