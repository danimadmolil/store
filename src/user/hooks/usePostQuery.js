import { useQuery } from "@tanstack/react-query";
import useUser from "../hooks/useUser";

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
