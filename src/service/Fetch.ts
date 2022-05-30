import LAMP from '../index'
import { Semaphore } from "await-semaphore"
/**
 *
 */

 interface UpdateTokenResult {
  access_token: string
  refresh_token: string
  success: boolean
}

const _tokenSemaphore = new Semaphore(1)

const _fetch = async <ResultType>(
  method: string,
  route: string,
  body?: any,
  tryRefreshToken: boolean = true,
  waitForToken: boolean = true,
): Promise<ResultType> => {
  if (waitForToken) {
    const release = await _tokenSemaphore.acquire()
    release()
  }

  if (!LAMP.Auth._auth)
    throw new Error("Cannot make HTTP request due to invalid configuration.")

  const protocol = LAMP.Auth._auth.serverAddress.includes("api") ? "https" : "http" // TODO: Remove after we move to https only
  const { id, password, accessToken } = LAMP.Auth._auth
  const authorization = accessToken
    ? `Bearer ${accessToken}`
    : id && password
    ? `Basic ${id}:${password}`
    : undefined

  const response = await fetch(
    `${protocol}://${LAMP.Auth._auth.serverAddress}${route}`,
    {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: authorization
      } as any),
      body: !!body ? JSON.stringify(body) : undefined
    }
  )

  if (response.status === 401 && tryRefreshToken) { // The access token has expired; try to redeem refresh token
    await refreshToken(accessToken)
    return _fetch(method, route, body, false)
  }

  return response.json()
}

const refreshToken = async (expiredToken: string) =>
  _tokenSemaphore.use(async () => {
    if (LAMP.Auth._auth.accessToken !== expiredToken) {
      return
    }

    const newAuth = await _fetch<UpdateTokenResult>(
      "post",
      "/token",
      { refresh_token: LAMP.Auth._auth.refreshToken },
      false,
      false,
    )
    if (!newAuth.success) {
      LAMP.Auth._auth = {
        ...LAMP.Auth._auth,
        accessToken: null,
        refreshToken: null,
      }

      // Log out
      return
    }

    LAMP.Auth._auth = {
      ...LAMP.Auth._auth,
      accessToken: newAuth.access_token,
      refreshToken: newAuth.refresh_token
    }
  })

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
