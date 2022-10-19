import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../auth/service/request";
export default function useOrderQuery() {
  const { data, isLoading, isError, isFetching } = useQuery(
    ["order"],
    () => {
      return getRequest("http://localhost:4001/user/order");
    },
    { networkMode: "always" }
  );
  return { data, isLoading, isFetching, isError };
}
