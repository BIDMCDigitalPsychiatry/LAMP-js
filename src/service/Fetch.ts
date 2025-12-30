import { jwtVerify } from "jose"
import { CredentialService } from "./Credential.service"

// Safe wrappers for browser APIs (Node.js compatibility)
const safeSessionStorage = {
  getItem: (key: string): string | null => {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string): void => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(key, value)
    }
  },
  removeItem: (key: string): void => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem(key)
    }
  },
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string): void => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, value)
    }
  },
  removeItem: (key: string): void => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key)
    }
  },
}

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
  accessToken?: string
  refreshToken?: string

  jwt_secret?: string
}

const userTokenKey = "tokenInfo"

//If refresh token expired, then logout from app
const handleSessionExpiry = async () => {
  safeLocalStorage.removeItem(userTokenKey)
  safeLocalStorage.setItem("verified", JSON.stringify({ value: false }))
  safeSessionStorage.setItem("LAMP._auth", JSON.stringify({ id: null, password: null, serverAddress: null }))
  // alert("Your session expired, Please login again.")
  // window.location.href = "/#/?expired=true"
}

//If access Token expired then call api for renewing the tokens
const handleRenewToken = async (refreshToken: string, base: string, configuration?: Configuration) => {
  try {
    const credService = new CredentialService()
    const res = await credService.renewToken(refreshToken, base)

    const accessToken = res?.data?.access_token

    if (accessToken) {
      const newRefreshToken = res?.data?.refresh_token || refreshToken
      safeSessionStorage.setItem(
        userTokenKey,
        JSON.stringify({ accessToken: res?.data?.access_token, refreshToken: newRefreshToken })
      )
      
      // Dispatch renewToken event similar to LOGIN event
      // Use lazy import to avoid circular dependency issues
      try {
        // Dynamically import LAMP to avoid circular dependency
        const LAMP = await import("../index").then((module) => module.default)
        
        // Get identity object from LAMP.Auth if available
        const identityObject = LAMP.Auth?._me || null
        const serverAddress = configuration?.base || base || LAMP.API?.configuration?.base
        
        // Dispatch the renewToken event
        LAMP.dispatchEvent("renewToken", {
          authorizationToken: configuration?.authorization || LAMP.API?.configuration?.authorization,
          identityObject: identityObject,
          serverAddress: serverAddress,
          accessToken: accessToken,
          refreshToken: newRefreshToken,
        })
      } catch (error) {
        // Silently fail if dispatchEvent is not available (e.g., in Node.js environment)
        console.warn("Failed to dispatch renewToken event:", error)
      }
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

  // Get token from sessionStorage (for browser usage)
  const userTokenFromLocalStore: any = JSON.parse(safeSessionStorage.getItem("tokenInfo") || "null")

  // Check configuration.accessToken first (for server-side/Node.js usage)
  // Then fallback to sessionStorage (for browser usage)
  if (configuration.accessToken) {
    authorization = `Bearer ${configuration.accessToken}`
  } else if (userTokenFromLocalStore?.accessToken) {
    authorization = `Bearer ${userTokenFromLocalStore.accessToken}`
  } else if (configuration.authorization) {
    // Fallback to Basic auth if provided
    authorization = configuration.authorization.includes(":") 
      ? `Basic ${typeof Buffer !== "undefined" ? Buffer.from(configuration.authorization).toString("base64") : btoa(configuration.authorization)}`
      : configuration.authorization
  }

  try {
    var response = await fetch(`${configuration.base}${route}`, {
      method: method,
      headers: new Headers(
        typeof authorization !== "undefined" && !!authorization
          ? {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              ...(configuration!.headers || {}),
              Authorization: authorization,
            }
          : ({
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              ...(configuration!.headers || {}),
            } as any)
      ),
      credentials: "include",                                                           
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
    if (!response.ok) {
      console.warn(`HTTP error ${response.status}`)
    }

    const result = await response.json().catch(() => {
      throw new Error("Invalid JSON response")
    })

    // Handle invalid token
    if (result?.error === "401.invalid-token" || result?.message === "401.invalid-token") {
      if (!route.includes("renewToken")) {
        try {
          const refreshToken = configuration.refreshToken ?? userTokenFromLocalStore?.refreshToken
          if (!refreshToken) {
            handleSessionExpiry()
            return { data: [], error: "401.invalid-token" } as unknown as ResultType
          }
          const token = await handleRenewToken(refreshToken, configuration.base, configuration)
          if (token) {
            configuration.authorization = token
            // retry the same request
            switch (method) {
              case "post":
                return await Fetch.post(route, body, configuration)
                break
              case "get":
                return await Fetch.get(route, configuration)
                break
              case "put":
                return await Fetch.put(route, body, configuration)
                break
              case "delete":
                return await Fetch.delete(route, configuration)
                break
              case "patch":
                return await Fetch.patch(route, body, configuration)
                break
            }
          } else {
            handleSessionExpiry()
            return { data: [], error: "401.invalid-token" } as any
          }
        } catch (tokenError) {
          console.error("Token renewal failed:", tokenError)
          handleSessionExpiry()
          return { data: [], error: "401.invalid-token" } as unknown as ResultType
        }
      } else {
        handleSessionExpiry()
        return { data: [], error: "401.invalid-token" } as unknown as ResultType
      }
    }
    return result
  } catch (error) {
    const message = (error as any)?.message || String(error)
    console.error("Fetch failed:", message)
    return { data: [], error: message || "Unknown error" } as unknown as ResultType
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
  public static async delete<ResultType>(
    route: string,
    configuration?: Configuration,
    body?: any
  ): Promise<ResultType> {
    return await _fetch("delete", route, configuration, body)
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
