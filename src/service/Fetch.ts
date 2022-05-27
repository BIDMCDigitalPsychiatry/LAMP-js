import LAMP from '../index';
/**
 *
 */

async function _fetch<ResultType>(
  method: string,
  route: string,
  body?: any,
  tryRefreshToken: boolean = true,
): Promise<ResultType> {
  if (!LAMP.Auth._auth) throw new Error("Cannot make HTTP request due to invalid configuration.")
  
  const protocol = LAMP.Auth._auth.serverAddress.includes("api") ? "https" : "http" // TODO: Remove after we move to https only
  const authorization = !!LAMP.Auth._auth.accessToken ? `Bearer ${LAMP.Auth._auth.accessToken}` : `Basic ${LAMP.Auth._auth.id}:${LAMP.Auth._auth.password}`
  const response =
    await fetch(`${protocol}://${LAMP.Auth._auth!.serverAddress}${route}`, {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authorization
      } as any),
      body: body !== undefined ? JSON.stringify(body) : undefined
    })
  if (response.status === 401 && tryRefreshToken) { // The access token has expired; try to redeem refresh token
    await refreshToken()
    return await _fetch(method, route, body, false)
  }

  //if (result['error'] !== undefined)
  //    throw new Error(result['error'])
  return await response.json() as any
}

const refreshToken = async () => {
  const newAuth = await Fetch.post(
    "/token",
    { refresh_token: LAMP.Auth._auth.refreshToken, grant_type: "refresh_token" }
  ) as any
  if (newAuth.error) {
    return
  }

  LAMP.Auth._auth = {
    ...LAMP.Auth._auth,
    accessToken: newAuth.access_token,
    refreshToken: newAuth.refresh_token,
  }
}

export class Fetch {
  public static async get<ResultType>(route: string): Promise<ResultType> {
    return await _fetch("get", route)
  }
  public static async post<ResultType>(route: string, body: any): Promise<ResultType> {
    return await _fetch("post", route, body)
  }
  public static async put<ResultType>(route: string, body: any): Promise<ResultType> {
    return await _fetch("put", route, body)
  }
  public static async patch<ResultType>(route: string, body: any): Promise<ResultType> {
    return await _fetch("patch", route, body)
  }
  public static async delete<ResultType>(route: string): Promise<ResultType> {
    return await _fetch("delete", route)
  }
}
