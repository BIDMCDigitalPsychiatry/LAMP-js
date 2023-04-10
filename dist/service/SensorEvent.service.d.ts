import { Identifier } from "../model/Type";
import { SensorEvent } from "../model/SensorEvent";
export declare class SensorEventService {
    /**
     * Get the set of all sensor events produced by the given participant.
     * @param participantId
     * @param origin
     * @param from
     * @param to
     */
    allByParticipant(participantId: Identifier, origin?: string, from?: number, to?: number, limit?: number, transform?: string): Promise<SensorEvent[]>;
    /**
     * Get the set of all sensor events produced by participants  of any study conducted by a researcher, by researcher identifier.
     * @param researcherId
     * @param origin
     * @param from
     * @param to
     */
    allByResearcher(researcherId: Identifier, origin?: string, from?: number, to?: number, limit?: number, transform?: string): Promise<SensorEvent[]>;
    /**
     * Get the set of all sensor events produced by participants  participants of a single study, by study identifier.
     * @param studyId
     * @param origin
     * @param from
     * @param to
     */
    allByStudy(studyId: Identifier, origin?: string, from?: number, to?: number, limit?: number, transform?: string): Promise<SensorEvent[]>;
    /**
     * Create a new SensorEvent for the given Participant.
     * @param participantId
     * @param sensorEvent
     */
    create(participantId: Identifier, sensorEvent: SensorEvent): Promise<Identifier>;
    /**
     * Delete a sensor event.
     * @param participantId
     * @param origin
     * @param from
     * @param to
     */
    delete(participantId: Identifier, origin?: string, from?: number, to?: number): Promise<Identifier>;
}
