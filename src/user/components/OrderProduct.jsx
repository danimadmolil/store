import { Button, Grid, Stack, Typography, IconButton } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { postRequest } from "../../auth/service/request";
import useUser from "../hooks/useUser";
import OrderCounter from "../../components/OrderCounter";

export default function OrderProduct({ productId }) {
  const qc = useQueryClient();
  const { user } = useUser();
  console.log({ uuuuuuser: user });
  const [isProductInCart, setIsProductInCart] = useState(false);
  const mutation = useMutation(
    (_productId) => {
      return postRequest("http://localhost:4001/user/orderProduct", {
        productIds: Number(_productId),
      });
    },
    {
      onSuccess: () => {
        qc.invalidateQueries(["user"]);
        qc.invalidateQueries(["order"]);
      },
      networkMode: "always",
    }
  );

  useEffect(() => {
    let wasInOrders = false;
    user?.Order[0]?.ProductOnOrder?.forEach((item) => {
      console.log("fuuuuuuuuuuuuuck", { item, productId });
      if (item.productId === Number(productId)) {
        console.log({ isEqual: item.productId === productId });
        wasInOrders = true;
        setIsProductInCart(true);
      }
    });
    if (!wasInOrders) {
      setIsProductInCart(false);
    }
  }, [user?.Order[0]?.ProductOnOrder]);
  console.log({ isProductInCart });
  return isProductInCart ? (
    <OrderCounter productId={productId} />
  ) : (
    <Button
      onClick={() => mutation.mutate(productId)}
      fullWidth
      variant="contained"
      sx={{ borderRadius: 1, padding: "4px 0" }}
      color="primary">
      {"افزودن به سبد خرید"}
    </Button>
  );
}
