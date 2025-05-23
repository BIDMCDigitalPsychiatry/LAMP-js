import { SignJWT } from "jose"
import { Fetch, Configuration } from "./Fetch"
import { Identifier } from "../model/Type"
import { Credential } from "../model/Credential"
import { Demo } from "./Demo"
import jsonata from "jsonata"

export class CredentialService {
  public configuration?: Configuration

  /**
   *
   * @param typeId
   * @param secretKey
   */
  public async create(
    typeId: Identifier,
    accessKey: string,
    secretKey: string,
    description?: string
  ): Promise<Credential> {
    if (accessKey === null || accessKey === undefined)
      throw new Error("Required parameter accessKey was null or undefined when calling credentialCreate.")
    if (secretKey === null || secretKey === undefined)
      throw new Error("Required parameter secretKey was null or undefined when calling credentialCreate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter((x) => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      const token = this.configuration.token
      if (!token) return Promise.resolve({ error: "401.missing-credentials" } as any)

      let decoded
      // try {
      //   // decoded = verifyToken(token, this.configuration.jwt_secret);
      // } catch (error) {
      //   return Promise.resolve({ error: "403.invalid-token" } as any);
      // }
      // const credential = Demo.Credential.filter(x => x["access_key"] === decoded.accessKey && x["secret_key"] === decoded.secretKey);
      // if (!credential) return Promise.resolve({ error: "403.invalid-credentials" } as any);
      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      let exists =
        Demo.Researcher.filter((x) => x["id"] === typeId).length > 0 ||
        Demo.Study.filter((x) => x["id"] === typeId).length > 0 ||
        Demo.Participant.filter((x) => x["id"] === typeId).length > 0 ||
        Demo.Activity.filter((x) => x["id"] === typeId).length > 0 // ???
      let unique = Demo.Credential.filter((x) => x["access_key"] === accessKey).length === 0
      if (exists && unique) {
        Demo.Credential.push({
          "#type": "Credential",
          "#parent": typeId,
          origin: typeId,
          access_key: accessKey,
          secret_key: secretKey,
          description: description,
        })
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.post(
      `/type/${typeId}/credential`,
      { origin: typeId, access_key: accessKey, secret_key: secretKey, description: description },
      this.configuration
    )
  }

  /**
   *
   * @param typeId
   * @param accessKey
   */
  public async delete(typeId: Identifier, accessKey: string): Promise<Identifier> {
    if (accessKey === null || accessKey === undefined)
      throw new Error("Required parameter accessKey was null or undefined when calling credentialDelete.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      // let auth = (this.configuration.authorization || ":").split(":")
      // let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      // if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      // if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      const token = this.configuration.token
      if (!token) return Promise.resolve({ error: "401.missing-credentials" } as any)

      let decoded
      // try {
      //   // decoded = verifyToken(token, this.configuration.jwt_secret);
      // } catch (error) {
      //   return Promise.resolve({ error: "403.invalid-token" } as any);
      // }
      const credential = Demo.Credential.find(
        (x) => x["access_key"] === decoded.accessKey && x["secret_key"] === decoded.secretKey
      )

      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      let idx = Demo.Credential.findIndex((x) => x["#parent"] === typeId && x["access_key"] === accessKey)
      if (idx >= 0) {
        Demo.Credential.splice(idx, 1)
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.delete(`/type/${typeId}/credential/${accessKey}`, this.configuration)
  }

  /**
   *
   * @param typeId
   */
  public async list(typeId: Identifier, transform?: string): Promise<Credential[]> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      // let auth = (this.configuration.authorization || ":").split(":")
      // let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      // if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      // if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      const token = this.configuration.token
      if (!token) return Promise.resolve({ error: "401.missing-credentials" } as any)

      let decoded
      // try {
      //   // decoded = verifyToken(token, this.configuration.jwt_secret);
      // } catch (error) {
      //   return Promise.resolve({ error: "403.invalid-token" } as any);
      // }
      const credential = Demo.Credential.find(
        (x) => x["access_key"] === decoded.accessKey && x["secret_key"] === decoded.secretKey
      )
      // if (!credential) return Promise.resolve({ error: "403.invalid-credentials" } as any);
      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      let exists =
        Demo.Researcher.filter((x) => x["id"] === typeId).length > 0 ||
        Demo.Study.filter((x) => x["id"] === typeId).length > 0 ||
        Demo.Participant.filter((x) => x["id"] === typeId).length > 0 ||
        Demo.Activity.filter((x) => x["id"] === typeId).length > 0 // ???
      if (exists) {
        let output = Demo.Credential.filter((x) => x["#parent"] === typeId).map((x) =>
          Object.assign(new Credential(), { ...x, secret_key: "" })
        )
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/type/${typeId}/credential`, this.configuration)).data.map((x) =>
      Object.assign(new Credential(), x)
    )
  }

  /**
   *
   * @param typeId
   * @param accessKey
   * @param secretKey
   */
  public async update(
    typeId: Identifier,
    accessKey: string,
    secretKey: string,
    description?: string
  ): Promise<Identifier> {
    if (accessKey === null || accessKey === undefined)
      throw new Error("Required parameter accessKey was null or undefined when calling credentialUpdate.")
    if (secretKey === null || secretKey === undefined)
      throw new Error("Required parameter secretKey was null or undefined when calling credentialUpdate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      // let auth = (this.configuration.authorization || ":").split(":")
      // let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      // if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      // if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      const token = this.configuration.token
      if (!token) return Promise.resolve({ error: "401.missing-credentials" } as any)

      let decoded
      // try {
      //   // decoded = verifyToken(token, this.configuration.jwt_secret);
      // } catch (error) {
      //   return Promise.resolve({ error: "403.invalid-token" } as any);
      // }
      const credential = Demo.Credential.find(
        (x) => x["access_key"] === decoded.accessKey && x["secret_key"] === decoded.secretKey
      )
      // if (!credential) return Promise.resolve({ error: "403.invalid-credentials" } as any);
      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      let idx = Demo.Credential.findIndex((x) => x["#parent"] === typeId && x["access_key"] === accessKey)
      if (idx >= 0) {
        Demo.Credential[idx] = {
          "#type": "Credential",
          "#parent": typeId,
          origin: typeId,
          access_key: accessKey,
          secret_key: secretKey ?? Demo.Credential[idx]["secret_key"],
          description: description ?? Demo.Credential[idx]["description"],
        }
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.put(`/type/${typeId}/credential/${accessKey}`, secretKey, this.configuration)
  }

  /**
   *
   * @param accessKey
   * @param secretKey
   */

  public async login(accessKey: string, secretKey: string): Promise<any> {
    if (accessKey === null || accessKey === undefined)
      throw new Error("Required parameter accessKey was null or undefined when calling login.")
    if (secretKey === null || secretKey === undefined)
      throw new Error("Required parameter secretKey was null or undefined when calling login.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      let credential = Demo.Credential.filter((x) => x["access_key"] === accessKey && x["secret_key"] === secretKey)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" })

      let exists =
        Demo.Researcher.filter((x) => x["id"] === accessKey).length > 0 ||
        Demo.Participant.filter((x) => x["id"] === accessKey).length > 0

      if (!exists) return Promise.resolve({ error: "403.invalid-credentials" })
      if (exists) {
        try {
          // this.configuration.token = jwt.sign({ accessKey, secretKey }, this.configuration.jwt_secret, { expiresIn: '1h' })
          const secretKeyEncoded = new TextEncoder().encode(this.configuration.jwt_secret)
          this.configuration.token = await new SignJWT({ accessKey, secretKey })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("2h")
            .sign(secretKeyEncoded)
          return Promise.resolve({ success: "Login successful", token: this.configuration.token })
        } catch (error) {
          console.error("Error generating token:", error)
          return Promise.resolve({ error: "500.server-error" })
        }
      }
    }

    return await Fetch.post("/login", { accessKey, secretKey }, this.configuration)
  }

  public async renewToken(refreshToken: string, base: string): Promise<any> {
    console.log("reniewToken inside refreshToken", refreshToken)
    console.log("this.configuration", this.configuration)
    const configuration: Configuration = { accesToken: refreshToken, base: base }
    return await Fetch.post("/renewToken", { refreshToken }, configuration)
  }
  public async logout(): Promise<any> {
    return await Fetch.post("/logout", this.configuration)
  }
}
