import { Identifier } from "../model/Type";
import { Study } from "../model/Study";
export declare class StudyService {
    /**
     * Get the set of all studies.
     */
    all(transform?: string): Promise<Study[]>;
    /**
     * Get the set of studies for a single researcher.
     * @param researcherId
     */
    allByResearcher(researcherId: Identifier, transform?: string): Promise<Study[]>;
    /**
     * Create a new Study for the given Researcher.
     * @param researcherId
     * @param study
     */
    create(researcherId: Identifier, study: Study): Promise<Identifier>;
    /**
     * Delete a study.
     * @param studyId
     */
    delete(studyId: Identifier): Promise<Identifier>;
    /**
     * Update the study.
     * @param studyId
     * @param study
     */
    update(studyId: Identifier, study: Study): Promise<Identifier>;
    /**
     * Get a single study, by identifier.
     * @param studyId
     */
    view(studyId: Identifier, transform?: string): Promise<Study>;
}
