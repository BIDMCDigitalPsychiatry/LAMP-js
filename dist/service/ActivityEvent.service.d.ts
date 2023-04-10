import { Identifier } from "../model/Type";
import { ActivityEvent } from "../model/ActivityEvent";
export declare class ActivityEventService {
    /**
     * Get the set of all activity events produced by a  given participant, by identifier.
     * @param participantId
     * @param origin
     * @param from
     * @param to
     */
    allByParticipant(participantId: Identifier, origin?: string, from?: number, to?: number, limit?: number, transform?: string): Promise<ActivityEvent[]>;
    /**
     * Get the set of all activity events produced by participants  of any study conducted by a researcher, by researcher identifier.
     * @param researcherId
     * @param origin
     * @param from
     * @param to
     */
    allByResearcher(researcherId: Identifier, origin?: string, from?: number, to?: number, limit?: number, transform?: string): Promise<ActivityEvent[]>;
    /**
     * Get the set of all activity events produced by participants of a single study, by study identifier.
     * @param studyId
     * @param origin
     * @param from
     * @param to
     */
    allByStudy(studyId: Identifier, origin?: string, from?: number, to?: number, limit?: number, transform?: string): Promise<ActivityEvent[]>;
    /**
     * Create a new ActivityEvent for the given Participant.
     * @param participantId
     * @param activityEvent
     */
    create(participantId: Identifier, activityEvent: ActivityEvent): Promise<Identifier>;
    /**
     * Delete a ActivityEvent.
     * @param participantId
     * @param origin
     * @param from
     * @param to
     */
    delete(participantId: Identifier, origin?: string, from?: number, to?: number): Promise<Identifier>;
}
