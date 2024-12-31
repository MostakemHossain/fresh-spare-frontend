/* eslint-disable @typescript-eslint/no-explicit-any */
export const validURLConvert = (name:any) => {
  const url = name
    ?.toString()
    .replaceAll(" ", "-")
    .replaceAll(",", "-")
    .replaceAll("&", "-");
  return url;
};
