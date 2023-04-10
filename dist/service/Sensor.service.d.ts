import { Sensor } from "../model/Sensor";
import { Identifier } from "../model/Type";
export declare class SensorService {
    /**
     * Get the set of all activities.
     */
    all(transform?: string): Promise<Sensor[]>;
    /**
     * Get the set of all activities available to a participant,  by participant identifier.
     * @param participantId
     */
    allByParticipant(participantId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Sensor[]>;
    /**
     * Get the set of all activities available to participants  of any study conducted by a researcher, by researcher identifier.
     * @param researcherId
     */
    allByResearcher(researcherId: Identifier, transform?: string): Promise<Sensor[]>;
    /**
     * Get the set of all activities available to  participants of a single study, by study identifier.
     * @param studyId
     */
    allByStudy(studyId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Sensor[]>;
    /**
     * Create a new Sensor under the given Study.
     * @param studyId
     * @param sensor
     */
    create(studyId: Identifier, sensor: Sensor): Promise<Identifier>;
    /**
     * Delete an Sensor.
     * @param sensorId
     */
    delete(sensorId: Identifier): Promise<Identifier>;
    /**
     * Update an Sensor's settings.
     * @param sensorId
     * @param sensor
     */
    update(sensorId: Identifier, sensor: Sensor): Promise<Identifier>;
    /**
     * Get a single sensor, by identifier.
     * @param sensorId
     */
    view(sensorId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Sensor>;
}
