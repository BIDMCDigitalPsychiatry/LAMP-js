import { Identifier } from "../model/Type";
import { Credential } from "../model/Credential";
export declare class CredentialService {
    /**
     *
     * @param typeId
     * @param secretKey
     */
    create(typeId: Identifier, accessKey: string, secretKey: string, description?: string): Promise<Credential>;
    /**
     *
     * @param typeId
     * @param accessKey
     */
    delete(typeId: Identifier, accessKey: string): Promise<Identifier>;
    /**
     *
     * @param typeId
     */
    list(typeId: Identifier, transform?: string): Promise<Credential[]>;
    /**
     *
     * @param typeId
     * @param accessKey
     * @param secretKey
     */
    update(typeId: Identifier, accessKey: string, secretKey: string, description?: string): Promise<Identifier>;
}
