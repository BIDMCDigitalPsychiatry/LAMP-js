import { Identifier } from './Type';
/**
 * A sensor that may or may not be available on a physical device.
 */
export declare class Sensor {
    /**
     * The self-referencing identifier to this object.
     */
    id?: Identifier;
    /**
     * The specification, parameters, and type of the sensor.
     */
    spec?: Identifier;
    /**
     * The name of the sensor.
     */
    name?: string;
    /**
     * The configuration settings for the sensor.
     */
    settings?: any;
}
