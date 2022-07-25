import { Identifier } from "../model/Type";
import { SensorSpec } from "../model/SensorSpec";
export declare class SensorSpecService {
    /**
     * Get all SensorSpecs registered by any Researcher.
     */
    all(transform?: string): Promise<SensorSpec[]>;
    /**
     * Create a new SensorSpec.
     * @param sensorSpec
     */
    create(sensorSpec: SensorSpec): Promise<Identifier>;
    /**
     * Delete an SensorSpec.
     * @param sensorSpecName
     */
    delete(sensorSpecName: string): Promise<Identifier>;
    /**
     * Update an SensorSpec.
     * @param sensorSpecName
     * @param sensorSpec
     */
    update(sensorSpecName: string, sensorSpec: SensorSpec): Promise<Identifier>;
    /**
     * Get a SensorSpec.
     * @param sensorSpecName
     */
    view(sensorSpecName: string, transform?: string): Promise<SensorSpec>;
}
