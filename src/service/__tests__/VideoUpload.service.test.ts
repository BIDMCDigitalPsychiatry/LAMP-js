import * as fs from 'fs';
import * as path from 'path';
import { VideoUploadService } from "../VideoUpload.service";
import { Configuration } from "../Fetch";
import { VideoMetadata, PartEtagData } from "../../model/VideoUpload";

const ACCESS_KEY = process.env.LAMP_ACCESS_KEY!
const SECRET_KEY = process.env.LAMP_SECRET_KEY!
const LAMP_SERVICE_API_BASE : string = process.env.LAMP_SERVICE_API_BASE!
const PARTICIPANT_ID = process.env.LAMP_PARTICIPANT_ID!

// const global : Record<string, any> = globalThis
// global.VIDEO_UPLOAD_SERVICE_CONFIG = {
//   base: "https://video.dev.lamp.digital",
//   authorization: Buffer.from(`${ACCESS_KEY}:${SECRET_KEY}`).toString('base64')
// } as Configuration

// var ffmpeg = require('fluent-ffmpeg');
// ffmpeg.ffprobe(path.join(__dirname, 'test-video.mp4'), function(err, metadata) {
//     console.dir(metadata);
// });

// Metadata collected via `ffmpeg` metadata code above
const TEST_VIDEO_METADATA: VideoMetadata = {
  size: 5510872,
  duration: 60.095011,
  codec: "h264",
  bitrate: 733621,
  frameRate: 24,
  height: 360,
  width: 640,
}

function createService(configOverrides?: Partial<Configuration>): VideoUploadService {
  const service = new VideoUploadService()
  service.configuration = {
    base: LAMP_SERVICE_API_BASE,
    authorization: Buffer.from(`${ACCESS_KEY}:${SECRET_KEY}`).toString('base64'),
    ...configOverrides,
  }
  return service
}

describe("VideoUploadService", () => {
  let service: VideoUploadService
  const uploadsToCleanup: string[] = []

  beforeAll(() => {
    if (!ACCESS_KEY || !SECRET_KEY || !PARTICIPANT_ID ) {
      throw new Error(
        "Missing required environment variables. " +
          "Copy .env.example to .env and fill in LAMP_ACCESS_KEY, LAMP_SECRET_KEY, TARGET_VIDEO_UPLOAD_API_BASE, and LAMP_PARTICIPANT_ID."
      )
    }
    service = createService()
  })

  afterEach(async () => {
    for (const id of uploadsToCleanup) {
      try {
        await service.abort(PARTICIPANT_ID, id)
      } catch (_) {
        // best-effort cleanup
      }
    }
    uploadsToCleanup.length = 0
  })

  // ---------------------------------------------------------------------------
  // initiate
  // ---------------------------------------------------------------------------
  describe("initiate", () => {
    it("should return a VideoUpload with an id and parts", async () => {
      const result = await service.initiate(PARTICIPANT_ID, TEST_VIDEO_METADATA)
      uploadsToCleanup.push(result.id as string)

      expect(result).toHaveProperty("id")
      expect(result.id).toBeTruthy()
      expect(result).toHaveProperty("parts")
      expect(Array.isArray(result.parts)).toBe(true)
      expect(result.parts.length).toBeGreaterThan(0)


      for (const part of result.parts) {
        expect(part).toHaveProperty("partNumber")
        expect(typeof part.partNumber).toBe("number")
        expect(part).toHaveProperty("byteRange")
        expect(typeof part.byteRange.start).toBe("number")
        expect(typeof part.byteRange.end).toBe("number")
        expect(part.byteRange.end).toBeGreaterThanOrEqual(part.byteRange.start)
        expect(part).toHaveProperty("presignedUrl")
        expect(typeof part.presignedUrl).toBe("string")
        expect(part).toHaveProperty("method")
        expect(["POST", "PUT"]).toContain(part.method)
        expect(part).toHaveProperty("presignedUrlExpiration")
        expect(typeof part.presignedUrlExpiration).toBe("number")
      }
    })

    it("should throw when participantId is empty", async () => {
      await expect(service.initiate("", TEST_VIDEO_METADATA)).rejects.toThrow()
    })

    it("should throw when in demo mode", async () => {
      const demoService = createService({ base: "https://demo.lamp.digital" })
      await expect(demoService.initiate(PARTICIPANT_ID, TEST_VIDEO_METADATA)).rejects.toThrow(/demo/i)
    })
  })

  // ---------------------------------------------------------------------------
  // refreshUrls
  // ---------------------------------------------------------------------------
  describe("refreshUrls", () => {
    it("should return a VideoUpload with refreshed part URLs", async () => {
      const upload = await service.initiate(PARTICIPANT_ID, TEST_VIDEO_METADATA)
      uploadsToCleanup.push(upload.id as string)

      const partNumbers = upload.parts.map((p) => p.partNumber)
      const refreshed = await service.refreshUrls(PARTICIPANT_ID, upload.id, partNumbers)

      expect(refreshed).toHaveProperty("id")
      expect(refreshed).toHaveProperty("parts")
      expect(refreshed.parts.length).toBe(upload.parts.length)

      for (const part of refreshed.parts) {
        expect(part.presignedUrl).toBeTruthy()
        expect(part.presignedUrlExpiration).toBeGreaterThan(0)
      }
    })

    it("should throw when participantId is empty", async () => {
      await expect(service.refreshUrls("", "some-id", [1])).rejects.toThrow()
    })

    it("should throw when id is empty", async () => {
      await expect(service.refreshUrls(PARTICIPANT_ID, "", [1])).rejects.toThrow()
    })

    it("should throw when partNumbers is empty", async () => {
      await expect(service.refreshUrls(PARTICIPANT_ID, "some-id", [])).rejects.toThrow()
    })

    it("should throw when in demo mode", async () => {
      const demoService = createService({ base: "https://demo.lamp.digital" })
      await expect(demoService.refreshUrls(PARTICIPANT_ID, "some-id", [1])).rejects.toThrow(/demo/i)
    })
  })

  // ---------------------------------------------------------------------------
  // abort
  // ---------------------------------------------------------------------------
  describe("abort", () => {
    it("should successfully abort an in-flight upload", async () => {
      const upload = await service.initiate(PARTICIPANT_ID, TEST_VIDEO_METADATA)
      await expect(service.abort(PARTICIPANT_ID, upload.id)).resolves.toBeUndefined()
    })

    it("should be idempotent — aborting twice does not throw", async () => {
      const upload = await service.initiate(PARTICIPANT_ID, TEST_VIDEO_METADATA)
      await service.abort(PARTICIPANT_ID, upload.id)
      await expect(service.abort(PARTICIPANT_ID, upload.id)).resolves.toBeUndefined()
    })

    it("should throw when participantId is empty", async () => {
      await expect(service.abort("", "some-id")).rejects.toThrow()
    })

    it("should throw when id is empty", async () => {
      await expect(service.abort(PARTICIPANT_ID, "")).rejects.toThrow()
    })

    it("should throw when in demo mode", async () => {
      const demoService = createService({ base: "https://demo.lamp.digital" })
      await expect(demoService.abort(PARTICIPANT_ID, "some-id")).rejects.toThrow(/demo/i)
    })
  })

  // ---------------------------------------------------------------------------
  // complete (full integration: initiate → upload parts → complete)
  // ---------------------------------------------------------------------------
  describe("complete", () => {
    it("should throw when participantId is empty", async () => {
      const parts: PartEtagData[] = [{ partNumber: 1, etag: "\"abc\"" as any }]
      await expect(service.complete("", "some-id", parts)).rejects.toThrow()
    })

    it("should throw when id is empty", async () => {
      const parts: PartEtagData[] = [{ partNumber: 1, etag: "\"abc\"" as any }]
      await expect(service.complete(PARTICIPANT_ID, "", parts)).rejects.toThrow()
    })

    it("should throw when parts is empty", async () => {
      await expect(service.complete(PARTICIPANT_ID, "some-id", [])).rejects.toThrow()
    })

    it("should throw when in demo mode", async () => {
      const demoService = createService({ base: "https://demo.lamp.digital" })
      const parts: PartEtagData[] = [{ partNumber: 1, etag: "\"abc\"" as any }]
      await expect(demoService.complete(PARTICIPANT_ID, "some-id", parts)).rejects.toThrow(/demo/i)
    })

    it("should complete a multipart upload after all parts are uploaded", async () => {
      // // Simulate video data as a zero-filled buffer
      // const videoData = Buffer.alloc(TEST_VIDEO_METADATA.size, 0)
      const videoData = fs.readFileSync(path.join(__dirname, 'test-video.mp4')); 

      const upload = await service.initiate(PARTICIPANT_ID, TEST_VIDEO_METADATA)
      uploadsToCleanup.push(upload.id as string)

      // Upload each part to its presigned URL and collect etags
      const partEtags: PartEtagData[] = []
      for (const part of upload.parts) {
        const chunk = videoData.slice(part.byteRange.start, part.byteRange.end + 1)
        const response = await fetch(part.presignedUrl, {
          method: part.method,
          body: chunk,
          headers: { "Content-Type": "application/octet-stream" },
        })

        expect(response.ok).toBe(true)
        const etag = response.headers.get("etag")
        expect(etag).toBeTruthy()

        partEtags.push({ partNumber: part.partNumber, etag: etag! as any })
      }

      const result = await service.complete(PARTICIPANT_ID, upload.id, partEtags)

      // Already completed — remove from cleanup list
      const idx = uploadsToCleanup.indexOf(upload.id as string)
      if (idx >= 0) uploadsToCleanup.splice(idx, 1)

      // expect(result).toHaveProperty("status")
      // expect(result).toHaveProperty("sha256")
      // expect(typeof result.sha256).toBe("string")
      // expect(result).toHaveProperty("id")
    }, 60000) // longer timeout for actual file uploads
  })
})
