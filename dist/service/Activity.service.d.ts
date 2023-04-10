import { Activity } from "../model/Activity";
import { Identifier } from "../model/Type";
export declare class ActivityService {
    /**
     * Get the set of all activities.
     */
    all(transform?: string): Promise<Activity[]>;
    /**
     * Get the set of all activities available to a participant,  by participant identifier.
     * @param participantId
     */
    allByParticipant(participantId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Activity[]>;
    /**
     * Get the set of all activities available to participants  of any study conducted by a researcher, by researcher identifier.
     * @param researcherId
     */
    allByResearcher(researcherId: Identifier, transform?: string): Promise<Activity[]>;
    /**
     * Get the set of all activities available to  participants of a single study, by study identifier.
     * @param studyId
     */
    allByStudy(studyId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Activity[]>;
    /**
     * Create a new Activity under the given Study.
     * @param studyId
     * @param activity
     */
    create(studyId: Identifier, activity: Activity): Promise<Identifier>;
    /**
     * Delete an Activity.
     * @param activityId
     */
    delete(activityId: Identifier): Promise<Identifier>;
    /**
     * Update an Activity's settings.
     * @param activityId
     * @param activity
     */
    update(activityId: Identifier, activity: Activity): Promise<Identifier>;
    /**
     * Get a single activity, by identifier.
     * @param activityId
     */
    view(activityId: Identifier, transform?: string, ignore_binary?: boolean): Promise<Activity>;
}
