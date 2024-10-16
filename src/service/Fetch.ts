import { jwtVerify } from 'jose';
/**
 *
 */
export type Configuration = {
  /**
   *
   */
  base: string

  /**
   *
   */
  authorization?: string

  /**
   *
   */
  headers?: { [header: string]: string }

  token?: string

  jwt_secret?: string

}

async function _fetch<ResultType>(
  method: string,
  route: string,
  configuration?: Configuration,
  body?: any
): Promise<ResultType> {
  if (!configuration) throw new Error("Cannot make HTTP request due to invalid configuration.")

  var result = await (
    await fetch(`${configuration!.base}${route}`, {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(configuration!.headers || {}),
        Authorization: !!configuration!.authorization ? `Basic ${configuration!.authorization}` : undefined,
        // Authorization: !!configuration!.token ? `Bearer ${configuration.token}`: undefined
        // Authorization: configuration.token ? `Bearer ${configuration.token}` : configuration.authorization ? `Basic ${configuration.authorization}` : undefined,
      } as any),
      body: body !== undefined ? JSON.stringify(body) : undefined
    })
  ).json()

  // if (result['error'] !== undefined)
  //    throw new Error(result['error'])
  return result as any
}

export class Fetch {
  public static async get<ResultType>(route: string, configuration?: Configuration): Promise<ResultType> {
    return await _fetch("get", route, configuration)
  }
  public static async post<ResultType>(route: string, body: any, configuration?: Configuration): Promise<ResultType> {
    return await _fetch("post", route, configuration, body)
  }
  public static async put<ResultType>(route: string, body: any, configuration?: Configuration): Promise<ResultType> {
    return await _fetch("put", route, configuration, body)
  }
  public static async patch<ResultType>(route: string, body: any, configuration?: Configuration): Promise<ResultType> {
    return await _fetch("patch", route, configuration, body)
  }
  public static async delete<ResultType>(route: string, configuration?: Configuration): Promise<ResultType> {
    return await _fetch("delete", route, configuration)
  }
}

// export async function verifyToken(token: string, secretKey: string) {
//   try {
//     const secret_Key = new TextEncoder().encode(this.configuration.jwt_secret);
//     const decoded = jwtVerify(token, secret_Key);
//     return decoded;
//   } catch (error) {
//     throw new Error('Invalid token');
//   }
// }