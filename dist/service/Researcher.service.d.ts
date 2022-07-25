import { Identifier } from "../model/Type";
import { Researcher } from "../model/Researcher";
export declare class ResearcherService {
    /**
     * Get the set of all researchers.
     */
    all(transform?: string): Promise<Researcher[]>;
    /**
     * Create a new Researcher.
     * @param researcher
     */
    create(researcher: Researcher): Promise<Identifier>;
    /**
     * Delete a researcher.
     * @param researcherId
     */
    delete(researcherId: Identifier): Promise<Identifier>;
    /**
     * Update a Researcher's settings.
     * @param researcherId
     * @param body
     */
    update(researcherId: Identifier, researcher: Researcher): Promise<Identifier>;
    /**
     * Get a single researcher, by identifier.
     * @param researcherId
     */
    view(researcherId: Identifier, transform?: string): Promise<Researcher>;
}
