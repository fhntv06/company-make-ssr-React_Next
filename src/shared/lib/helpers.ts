import React from 'react';

export function createUrlWithSearchParam(baseUrl: string, searchParams: Record<string, unknown>): URL {
  const url = new URL(baseUrl);

  const paramKeys = Object.keys(searchParams);

  if (paramKeys.length) {
    paramKeys.forEach((key) => {
      if (Array.isArray(searchParams[key])) {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        searchParams[key].forEach((item: string | number) => {
          url.searchParams.append(`${key}[]`, String(item));
        });
      } else {
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        url.searchParams.append(key, searchParams[key]);
      }
    });
  }

  return url;
}

export function getVideoSrc(str: string, regex: RegExp) {
  const matches = str.match(regex);

  if (!matches) {
    return null;
  }

  return matches[2];
}

export function getRawNumber(number: string): string {
  const parsedNumber = number.replace(/\s/g, '');
  return parsedNumber;
}

export const handleImageLoad = (
  index: number,
  setImageDimensions: React.Dispatch<React.SetStateAction<{ width: number; height: number }[]>>,
  event: React.SyntheticEvent<HTMLImageElement>,
) => {
  const { naturalWidth, naturalHeight } = event.currentTarget;
  setImageDimensions((prev) => {
    const newDimensions = [...prev];
    newDimensions[index] = { width: naturalWidth, height: naturalHeight };
    return newDimensions;
  });
};
