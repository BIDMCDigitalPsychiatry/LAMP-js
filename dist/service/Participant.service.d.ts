import { Identifier } from "../model/Type";
import { Participant } from "../model/Participant";
export declare class ParticipantService {
    /**
     * Get the set of all participants.
     */
    all(transform?: string): Promise<Participant[]>;
    /**
     * Get the set of all participants under a single researcher.
     * @param researcherId
     */
    allByResearcher(researcherId: Identifier, transform?: string): Promise<Participant[]>;
    /**
     * Get the set of all participants in a single study.
     * @param studyId
     */
    allByStudy(studyId: Identifier, transform?: string): Promise<Participant[]>;
    /**
     * Create a new Participant for the given Study.
     * @param studyId
     * @param participant
     */
    create(studyId: Identifier, participant: Participant): Promise<Identifier>;
    /**
     * Delete a participant AND all owned data or event streams.
     * @param participantId
     */
    delete(participantId: Identifier): Promise<Identifier>;
    /**
     * Update a Participant's settings.
     * @param participantId
     * @param participant
     */
    update(participantId: Identifier, participant: Participant): Promise<Identifier>;
    /**
     * Get a single participant, by identifier.
     * @param participantId
     */
    view(participantId: Identifier, transform?: string): Promise<Participant>;
}
