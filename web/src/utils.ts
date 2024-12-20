export async function fetchWithJson<T>(
  url: string,
  data: T,
  init?: RequestInit
) {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...init,
  });
}

export function checkStatus(response: Response): Response {
  if (!response.ok) {
    // TODO describe error
    throw new Error("");
  }

  return response;
}
