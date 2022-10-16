import { useQuery } from "@tanstack/react-query";

export default function usePostQuery(
  key,
  fetchFunction,
  options = { networkMode: "always" }
) {
  let _key = Array.isArray(key) ? [...key] : [key];

  return useQuery([_key], fetchFunction, {
    ...options,
  });
}
