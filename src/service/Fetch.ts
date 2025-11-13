/**
 *
 */
export type Configuration = {
  /**
   *
   */
  base: string

  authType?: "basic" | "session"
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


async function _sessionAuthFetch<ResultType>(
  method: string,
  route: string,
  configuration?: Configuration,
  body?: any
): Promise<ResultType> {
  if (!configuration) {
    throw new Error("Cannot make HTTP request due to invalid configuration")
  }
  
  const result = await ( await fetch(
    `${configuration.base}${route}`,
    {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        ... (configuration!.headers || {}),
      }),
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined
    }
  )).json()

    return result as any
}

async function _basicAuthFetch<ResultType>(
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
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...(configuration!.headers || {}),
        Authorization: !!configuration!.authorization ? `Basic ${configuration!.authorization}` : undefined
      } as any),
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined
    },)
  ).json()
  
  return result as any
}

async function _fetch<ResultType>(
  method: string,
  route: string,
  configuration?: Configuration,
  body?: any,
): Promise<ResultType> {
  if (configuration.authType === "session") {
    return await _sessionAuthFetch(method, route, configuration, body)
  } else {
    return await _basicAuthFetch(method, route, configuration, body)
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
