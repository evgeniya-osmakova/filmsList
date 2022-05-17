export const api = "https://api.themoviedb.org/3";
export const key = "eaf0ee6171945fd67609cdd12421904b";
export const lang = "en-US";

const getResponse = async (url: string | URL, init?: RequestInit) => {
  const response = await fetch(url.toString(), init)
  const text = await response.text()
  const data = (text && JSON.parse(text)) ?? null
  return { response, text, data }
}

export const doFetch = async <T>(url: string | URL, init?: RequestInit) => {
  const { response, text, data } = await getResponse(url, init);

  if (!response.ok) {
    const err = data?.status_message || text || response.statusText
    return Promise.reject(err)
  }
  return data as T
}

