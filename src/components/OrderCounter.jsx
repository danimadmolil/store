import React, { useState } from "react";
import {
  ArrowDropDown,
  ArrowDropUpRounded,
  DeleteForever,
} from "@mui/icons-material";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRequest } from "../auth/service/request";

async function dropProductFromOrder(productId) {
  return postRequest("http://localhost:4001/product/dropProductFromOrder", {
    productId,
  });
}
export default function OrderCounter({ productId, initial = 1 }) {
  const qc = useQueryClient();
  const [count, setCount] = useState(initial);
  const mutation = useMutation((data) => dropProductFromOrder(data), {
    networkMode: "always",
    onSuccess: () => {
      qc.invalidateQueries(["user"]);
    },
  });
  function increment() {
    setCount((count) => count + 1);
  }
  function decrement() {
    setCount((count) => (count - 1 < 0 ? 0 : count - 1));
  }
  return (
    <Grid
      dir="ltr"
      alignItems={"center"}
      direction={"row"}
      container
      sx={{ height: "100px" }}>
      <Button
        onClick={() => mutation.mutate(productId)}
        sx={{ height: "30px" }}
        startIcon={<DeleteForever />}
        color="error">
        حذف از لیست خرید
      </Button>
      <Stack justifyContent={"space-between"}>
        <IconButton sx={{ color: "text.primary" }} onClick={increment}>
          <ArrowDropUpRounded />
        </IconButton>
        <IconButton sx={{ color: "text.primary" }} onClick={decrement}>
          <ArrowDropDown />
        </IconButton>
      </Stack>
      <Typography>{count}</Typography>
    </Grid>
  );
}
