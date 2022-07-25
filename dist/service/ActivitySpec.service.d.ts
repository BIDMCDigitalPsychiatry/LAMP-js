import { ActivitySpec } from "../model/ActivitySpec";
import { Identifier } from "../model/Type";
export declare class ActivitySpecService {
    /**
     * Get all ActivitySpecs registered.
     */
    all(transform?: string): Promise<ActivitySpec[]>;
    /**
     * Create a new ActivitySpec.
     * @param activitySpec
     */
    create(activitySpec: ActivitySpec): Promise<Identifier>;
    /**
     * Delete an ActivitySpec.
     * @param activitySpecName
     */
    delete(activitySpecName: Identifier): Promise<Identifier>;
    /**
     * Update an ActivitySpec.
     * @param activitySpecName
     * @param activitySpec
     */
    update(activitySpecName: Identifier, activitySpec: ActivitySpec): Promise<Identifier>;
    /**
     * View an ActivitySpec.
     * @param activitySpecName
     */
    view(activitySpecName: string, transform?: string): Promise<ActivitySpec>;
}
