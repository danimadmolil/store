import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { postRequest } from "../../auth/service/request";
import useUser from "../hooks/useUser";

export default function OrderProduct({ productId }) {
  const qc = useQueryClient();
  const { user } = useUser();
  console.log("OrderProduct ", { user });
  const mutation = useMutation(
    (_productId) => {
      return postRequest("http://localhost:4001/user/orderProduct", {
        productIds: Number(_productId),
      });
    },
    {
      onSuccess: () => {
        qc.invalidateQueries(["order"]);
      },
      networkMode: "always",
    }
  );
  return (
    user && (
      <Button
        onClick={() => mutation.mutate(productId)}
        fullWidth
        variant="contained"
        sx={{ borderRadius: 1, padding: "4px 0" }}
        color="primary">
        {"افزودن به سبد خرید"}
      </Button>
    )
  );
}
