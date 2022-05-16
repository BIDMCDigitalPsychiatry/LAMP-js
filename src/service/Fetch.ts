import LAMP from '../index';
/**
 *
 */

async function _fetch<ResultType>(
  method: string,
  route: string,
  body?: any
): Promise<ResultType> {
  if (!LAMP.Auth._auth) throw new Error("Cannot make HTTP request due to invalid configuration.")
  
  const protocol = LAMP.Auth._auth.serverAddress.includes("api") ? "https" : "http" // TODO: Remove after we move to https only
  const authorization = !!LAMP.Auth._auth.accessToken ? `Bearer ${LAMP.Auth._auth.accessToken}` : `Basic ${LAMP.Auth._auth.id}:${LAMP.Auth._auth.password}`
  var result = await (
    await fetch(`${protocol}://${LAMP.Auth._auth!.serverAddress}${route}`, {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authorization
      } as any),
      body: body !== undefined ? JSON.stringify(body) : undefined
    })
  ).json()
  

  //if (result['error'] !== undefined)
  //    throw new Error(result['error'])
  return result as any
}

export class Fetch {
  public static async get<ResultType>(route: string, auth: IAuth): Promise<ResultType> {
    return await _fetch("get", route)
  }
  public static async post<ResultType>(route: string, body: any, auth: IAuth): Promise<ResultType> {
    return await _fetch("post", route, body)
  }
  public static async put<ResultType>(route: string, body: any, auth: IAuth): Promise<ResultType> {
    return await _fetch("put", route, body)
  }
  public static async patch<ResultType>(route: string, body: any, auth: IAuth): Promise<ResultType> {
    return await _fetch("patch", route, body)
  }
  public static async delete<ResultType>(route: string, auth: IAuth): Promise<ResultType> {
    return await _fetch("delete", route)
  }
}
