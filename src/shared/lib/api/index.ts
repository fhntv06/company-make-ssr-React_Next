import { createUrlWithSearchParam } from '../helpers';

export function baseFetch(
  url: string,
  searchParams?: Record<string, unknown>,
  nextParams?: NextFetchRequestConfig,
  cache: RequestCache = 'no-cache',
) {
  let baseUrl = new URL(`${process.env.NEXT_PUBLIC_JSON_API_URL}/${url}`);

  if (searchParams && Object.keys(searchParams).length) {
    baseUrl = createUrlWithSearchParam(baseUrl.toString(), searchParams);
  }

  return fetch(baseUrl, { next: nextParams, cache });
}

export function get(url: string, searchParams?: Record<string, unknown>) {
  return baseFetch(url, searchParams);
}
