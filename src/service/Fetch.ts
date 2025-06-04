import { jwtVerify } from "jose"
import { CredentialService } from "./Credential.service"
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
  accesToken?: string
  refreshToken?: string

  jwt_secret?: string
}

const userTokenKey = "tokenInfo"

//If refresh token expired, then logout from app
const handleSessionExpiry = async () => {
  sessionStorage.removeItem(userTokenKey)
  localStorage.setItem("verified", JSON.stringify({ value: false }))
  sessionStorage.setItem("LAMP._auth", JSON.stringify({ id: null, password: null, serverAddress: null }))
  // alert("Your session expired, Please login again.")
  // window.location.href = "/#/?expired=true"
}

//If access Token expired then call api for renewing the tokens
const handleRenewToken = async (refreshToken: string, base: string) => {
  try {
    const credService = new CredentialService()
    const res = await credService.renewToken(refreshToken, base)

    const accessToken = res?.data?.access_token

    if (accessToken) {
      sessionStorage.setItem(
        userTokenKey,
        JSON.stringify({ accessToken: res?.data?.access_token, refreshToken: res?.data?.refresh_token })
      )
    }
    return accessToken
  } catch (error) {
    console.log(error)
  }
}

async function _fetch<ResultType>(
  method: string,
  route: string,
  configuration?: Configuration,
  body?: any
): Promise<ResultType> {
  if (!configuration) throw new Error("Cannot make HTTP request due to invalid configuration.")
  let authorization
  if (
    route.includes("/parent") ||
    route.includes("/lamp.dashboard.admin_permissions") ||
    route.includes("/participant/me") ||
    route.includes("/researcher/me") ||
    route.includes("/publicKey")
  ) {
    authorization = !!configuration!.authorization ? `Basic ${configuration!.authorization}` : undefined
  }
  const userTokenFromLocalStore: any = JSON.parse(sessionStorage.getItem("tokenInfo"))
  if (userTokenFromLocalStore?.accessToken) {
    authorization = `Bearer ${
      configuration.accesToken ? configuration.accesToken : userTokenFromLocalStore?.accessToken
    }`
  }

  if (authorization || (!authorization && route.includes("/login"))) {
    try {
      var result = await (
        await fetch(`${configuration.base}${route}`, {
          method: method,
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // "Cache-Control": "no-store",
            Accept: "application/json",
            ...(configuration!.headers || {}),
            Authorization: authorization,
            // Authorization: !!configuration!.token ? `Bearer ${configuration.token}`: undefined
            // Authorization: configuration.token ? `Bearer ${configuration.token}` : configuration.authorization ? `Basic ${configuration.authorization}` : undefined,
          } as any),
          body: body !== undefined ? JSON.stringify(body) : undefined,
        })
      ).json()
      //Check token expiry

      if (result?.error === "401.invalid-token") {
        if (!route?.includes("renewToken")) {
          const token = await handleRenewToken(userTokenFromLocalStore?.refreshToken, configuration.base)
          configuration.accesToken = token
          switch (method) {
            case "post":
              await Fetch.post(route, body, configuration)
              break
            case "get":
              await Fetch.get(route, configuration)
              break
            case "put":
              await Fetch.put(route, body, configuration)
              break
            case "delete":
              await Fetch.delete(route, configuration)
              break
            case "patch":
              await Fetch.patch(route, body, configuration)
              break
          }
          return { data: [], error: "401.invalid-token" } as any
        } else {
          handleSessionExpiry()
          return { data: [], error: "401.invalid-token" } as any
        }
      } else {
        return result as any
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    return [] as any
  }
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
