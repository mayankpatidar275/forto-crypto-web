import { handleResponse } from "./response";
// Todo: function to get header(authorization/token) and put in the request

export async function get(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include", // Default credentials can be overridden by options
    ...options,
  });
  return handleResponse(response, url);
}

export async function post(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any,
  options: RequestInit = {}
) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${body.token}`,
    },
    body: JSON.stringify(body),
    ...options,
  });
  return handleResponse(response, url);
}

export async function patch(
  url: string,
  body: unknown,
  options: RequestInit = {}
) {
  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...options,
  });
  return handleResponse(response, url);
}

export async function put(
  url: string,
  body: unknown,
  options: RequestInit = {}
) {
  const response = await fetch(url, {
    method: "PUT",
    credentials: "include",
    // When using credentials: "include" in your fetch request, browsers enforce stricter CORS policies
    // You cannot use origin: "*" with credentials - you must specify exact origins
    // The browser will be not receiving the proper Access-Control-Allow-Origin header
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...options,
  });
  return handleResponse(response, url);
}

export async function del(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return handleResponse(response, url);
}
