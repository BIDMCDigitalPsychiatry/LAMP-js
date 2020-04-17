import { Fetch, Configuration } from "./Fetch"
import { Sensor } from "../model/Sensor"
import { Identifier } from "../model/Type"
import { Participant } from "../model/Participant"
import { Demo } from "./Demo"
import jsonata from "jsonata"

export class SensorService {
  public configuration?: Configuration

  /**
   * Get the set of all activities.
   */
  public async all(transform?: string): Promise<Sensor[]> {
    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      let output = Demo.Sensor.map(x => Object.assign(new Sensor(), x))
      output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
      return Promise.resolve(output)
    }
    return (await Fetch.get<{ data: any[] }>(`/sensor`, this.configuration)).data.map(x =>
      Object.assign(new Sensor(), x)
    )
  }

  /**
   * Get the set of all activities available to a participant,  by participant identifier.
   * @param participantId
   */
  public async allByParticipant(participantId: Identifier, transform?: string): Promise<Sensor[]> {
    if (participantId === null || participantId === undefined)
      throw new Error("Required parameter participantId was null or undefined when calling sensorAllByParticipant.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (participantId === "me") participantId = credential.length > 0 ? credential[0]["origin"] : participantId

      if (Demo.Participant.filter(x => x["id"] === participantId).length > 0) {
        let output = Demo.Sensor.filter(x =>
          Demo.Participant.filter(y => y["id"] === participantId)
            .map(y => y["#parent"])
            .includes(x["#parent"])
        ).map(x => Object.assign(new Sensor(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/participant/${participantId}/sensor`, this.configuration)).data.map(x =>
      Object.assign(new Sensor(), x)
    )
  }

  /**
   * Get the set of all activities available to participants  of any study conducted by a researcher, by researcher identifier.
   * @param researcherId
   */
  public async allByResearcher(researcherId: Identifier, transform?: string): Promise<Sensor[]> {
    if (researcherId === null || researcherId === undefined)
      throw new Error("Required parameter researcherId was null or undefined when calling sensorAllByResearcher.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) {
        return Promise.resolve({ error: "403.invalid-credentials" } as any)
      }
      if (researcherId === "me") {
        researcherId = credential.length > 0 ? credential[0]["origin"] : researcherId
      }

      if (Demo.Researcher.filter(x => x["id"] === researcherId).length > 0) {
        let output = Demo.Sensor.filter(x =>
          Demo.Study.filter(y => y["#parent"] === researcherId)
            .map(y => y["id"])
            .includes(x["#parent"])
        ).map(x => Object.assign(new Sensor(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/researcher/${researcherId}/sensor`, this.configuration)).data.map(x =>
      Object.assign(new Sensor(), x)
    )
  }

  /**
   * Get the set of all activities available to  participants of a single study, by study identifier.
   * @param studyId
   */
  public async allByStudy(studyId: Identifier, transform?: string): Promise<Sensor[]> {
    if (studyId === null || studyId === undefined)
      throw new Error("Required parameter studyId was null or undefined when calling sensorAllByStudy.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter(x => x["id"] === studyId).length > 0) {
        let output = Demo.Sensor.filter(x => x["#parent"] === studyId).map(x => Object.assign(new Sensor(), x))
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/study/${studyId}/sensor`, this.configuration)).data.map(x =>
      Object.assign(new Sensor(), x)
    )
  }

  /**
   * Create a new Sensor under the given Study.
   * @param studyId
   * @param sensor
   */
  public async create(studyId: Identifier, sensor: Sensor): Promise<Identifier> {
    if (studyId === null || studyId === undefined)
      throw new Error("Required parameter studyId was null or undefined when calling sensorCreate.")
    if (sensor === null || sensor === undefined)
      throw new Error("Required parameter sensor was null or undefined when calling sensorCreate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (studyId === "me") studyId = credential.length > 0 ? credential[0]["origin"] : studyId

      if (Demo.Study.filter(x => x["id"] === studyId).length > 0) {
        let data = {
          "#type": "Sensor",
          "#parent": studyId,
          ...(sensor as any),
          id:
            "sensor" +
            Math.random()
              .toString()
              .substring(2, 6)
        }
        Demo.Sensor.push(data)
        return Promise.resolve({ data: data["id"] } as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.post(`/study/${studyId}/sensor`, sensor, this.configuration)
  }

  /**
   * Delete an Sensor.
   * @param sensorId
   */
  public async delete(sensorId: Identifier): Promise<Identifier> {
    if (sensorId === null || sensorId === undefined)
      throw new Error("Required parameter sensorId was null or undefined when calling sensorDelete.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (sensorId === "me") sensorId = credential.length > 0 ? credential[0]["origin"] : sensorId

      let idx = Demo.Sensor.findIndex(x => x["id"] === sensorId)
      if (idx >= 0) {
        Demo.Sensor.splice(idx, 1)
        Demo.SensorEvent = Demo.SensorEvent.filter(x => x["sensor"] !== sensorId)
        Demo.Credential = Demo.Credential.filter(x => x["#parent"] !== sensorId)
        Demo.Tags = Demo.Tags.filter(x => x["#parent"] !== sensorId && x["target"] !== sensorId)
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.delete(`/sensor/${sensorId}`, this.configuration)
  }

  /**
   * Update an Sensor's settings.
   * @param sensorId
   * @param sensor
   */
  public async update(sensorId: Identifier, sensor: Sensor): Promise<Identifier> {
    if (sensorId === null || sensorId === undefined)
      throw new Error("Required parameter sensorId was null or undefined when calling sensorUpdate.")
    if (sensor === null || sensor === undefined)
      throw new Error("Required parameter sensor was null or undefined when calling sensorUpdate.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (sensorId === "me") sensorId = credential.length > 0 ? credential[0]["origin"] : sensorId

      let idx = Demo.Sensor.findIndex(x => x["id"] === sensorId)
      if (idx >= 0) {
        Demo.Sensor[idx] = {
          "#type": "Sensor",
          "#parent": Demo.Sensor[idx]["#parent"],
          id: Demo.Sensor[idx]["id"],
          spec: Demo.Sensor[idx]["spec"],
          name: sensor.name ?? Demo.Sensor[idx]["name"],
          settings: sensor.settings as any
        }
        return Promise.resolve({} as any)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return await Fetch.put(`/sensor/${sensorId}`, sensor, this.configuration)
  }

  /**
   * Get a single sensor, by identifier.
   * @param sensorId
   */
  public async view(sensorId: Identifier, transform?: string): Promise<Sensor> {
    if (sensorId === null || sensorId === undefined)
      throw new Error("Required parameter sensorId was null or undefined when calling sensorView.")

    if (this.configuration.base === "https://demo.lamp.digital") {
      // DEMO
      let auth = (this.configuration.authorization || ":").split(":")
      let credential = Demo.Credential.filter(x => x["access_key"] === auth[0] && x["secret_key"] === auth[1])
      if (credential.length === 0) return Promise.resolve({ error: "403.invalid-credentials" } as any)
      if (sensorId === "me") sensorId = credential.length > 0 ? credential[0]["origin"] : sensorId

      let data = Demo.Sensor.filter(x => x["id"] === sensorId).map(x => Object.assign(new Sensor(), x))
      if (data.length > 0) {
        let output = data[0]
        output = typeof transform === "string" ? jsonata(transform).evaluate(output) : output
        return Promise.resolve(output)
      } else {
        return Promise.resolve({ error: "404.not-found" } as any)
      }
    }
    return (await Fetch.get<{ data: any[] }>(`/sensor/${sensorId}`, this.configuration)).data.map(x =>
      Object.assign(new Sensor(), x)
    )[0]
  }
}
