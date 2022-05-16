import { Fetch } from "./Fetch"
import { Identifier } from "../model/Type"
import { Credential } from "../model/Credential"
import { Demo } from "./Demo"
import LAMP from '../index'
import jsonata from "jsonata"

export class CredentialService {

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

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      let exists =
        Demo.Researcher.filter(x => x["id"] === typeId).length > 0 ||
        Demo.Study.filter(x => x["id"] === typeId).length > 0 ||
        Demo.Participant.filter(x => x["id"] === typeId).length > 0 ||
        Demo.Activity.filter(x => x["id"] === typeId).length > 0 // ???
      let unique = Demo.Credential.filter(x => x["access_key"] === accessKey).length === 0
      if (exists && unique) {
        Demo.Credential.push({
          "#type": "Credential",
          "#parent": typeId,
          origin: typeId,
          access_key: accessKey,
          secret_key: secretKey,
          description: description
        })
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.post(
      `/type/${typeId}/credential`,
      { origin: typeId, access_key: accessKey, secret_key: secretKey, description: description },
      LAMP.Auth._auth
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

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      let idx = Demo.Credential.findIndex(x => x["#parent"] === typeId && x["access_key"] === accessKey)
      if (idx >= 0) {
        Demo.Credential.splice(idx, 1)
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.delete(`/type/${typeId}/credential/${accessKey}`, LAMP.Auth._auth)
  }

  /**
   *
   * @param typeId
   */
  public async list(typeId: Identifier, transform?: string): Promise<Credential[]> {
   
    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      let exists =
        Demo.Researcher.filter(x => x["id"] === typeId).length > 0 ||
        Demo.Study.filter(x => x["id"] === typeId).length > 0 ||
        Demo.Participant.filter(x => x["id"] === typeId).length > 0 ||
        Demo.Activity.filter(x => x["id"] === typeId).length > 0 // ???
      if (exists) {
        let output = Demo.Credential.filter(x => x["#parent"] === typeId).map(x =>
          Object.assign(new Credential(), { ...x, secret_key: "" })
        )
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/type/${typeId}/credential`, LAMP.Auth._auth)).data.map(x =>
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

    if (LAMP.Auth._auth.serverAddress === "https://demo.lamp.digital") {
      // DEMO
      let credential = Demo.Credential.filter(x => x["access_key"] === LAMP.Auth._auth.id && x["secret_key"] === LAMP.Auth._auth.password)
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (typeId === "me") typeId = credential.length > 0 ? credential[0]["origin"] : typeId

      let idx = Demo.Credential.findIndex(x => x["#parent"] === typeId && x["access_key"] === accessKey)
      if (idx >= 0) {
        Demo.Credential[idx] = {
          "#type": "Credential",
          "#parent": typeId,
          origin: typeId,
          access_key: accessKey,
          secret_key: secretKey ?? Demo.Credential[idx]["secret_key"],
          description: description ?? Demo.Credential[idx]["description"]
        }
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.put(`/type/${typeId}/credential/${accessKey}`, secretKey, LAMP.Auth._auth)
  }
}
