import { Identifier } from "../model/Type";
import { DynamicAttachment } from "../model/DynamicAttachment";
export declare class TypeService {
    /**
     *
     * @param typeId
     * @param attachmentKey
     */
    getAttachment(typeId: Identifier, attachmentKey: string): Promise<any[]>;
    /**
     *
     * @param typeId
     * @param attachmentKey
     * @param invokeAlways
     * @param includeLogs
     * @param ignoreOutput
     */
    getDynamicAttachment(typeId: Identifier, attachmentKey: string, invokeAlways: boolean, includeLogs: boolean, ignoreOutput: boolean): Promise<DynamicAttachment[]>;
    /**
     *
     * @param typeId
     */
    listAttachments(typeId: Identifier): Promise<any[]>;
    /**
     * Get the parent type identifier of the data structure referenced by the identifier.
     * @param typeId
     */
    parent(typeId: Identifier, transform?: string): Promise<any>;
    /**
     *
     * @param typeId
     * @param target
     * @param attachmentKey
     * @param attachmentValue
     */
    setAttachment(typeId: Identifier, target: string, attachmentKey: string, attachmentValue: any): Promise<Identifier>;
    /**
     *
     * @param invokeOnce
     * @param typeId
     * @param target
     * @param attachmentKey
     * @param attachmentValue
     */
    setDynamicAttachment(invokeOnce: boolean, typeId: Identifier, target: string, attachmentKey: string, attachmentValue: DynamicAttachment): Promise<Identifier>;
}
