import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useOrderQuery from "../../../user/hooks/useOrderQuery";
import { DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderCounter from "../../../components/OrderCounter";
import useUser from "../../../user/hooks/useUser";
export default function Orders() {
  const [params] = useSearchParams();
  const status = params.get("status") || "completed";
  const [tabIndex, setTabIndex] = useState(
    status ? (status === "pending" ? 0 : 1) : 0
  );
  const theme = useTheme();
  const { data = [], isLoading } = useOrderQuery();
  const { user } = useUser();
  if (isLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  }
  function handleChange(e, newValue) {
    setTabIndex(newValue);
  }
  return (
    <>
      <Tabs dir="rtl" value={tabIndex} onChange={handleChange}>
        <Tab value={0} label="pending"></Tab>
        <Tab value={1} label="completed"></Tab>
      </Tabs>
      <TabsPanel tabIndex={tabIndex}>
        <TabPanel>
          <Paper sx={{ padding: "4px 8px" }}>
            {data.map((order) => {
              return (
                <Paper
                  sx={{
                    mt: 2,
                    height: "auto",
                    padding: "2px 18px",
                    background: "#323131",
                  }}>
                  <Grid
                    justifyContent={"space-between"}
                    alignItems="center"
                    container>
                    <Box
                      sx={{
                        minWidth: "50px",
                        width: "auto",
                        padding: "0 18px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "25px",
                        background: theme.palette.primary.main,
                      }}>
                      {order.status}
                    </Box>
                    <Grid
                      item
                      container
                      sx={{ width: "auto", padding: "0 25px" }}
                      justifyContent="space-evenly">
                      <Typography component={"b"} sx={{ fontSize: "28px" }}>
                        شماهره سفارش
                      </Typography>
                      <Typography sx={{ fontSize: "28px" }}>
                        {" "}
                        {" : "}
                      </Typography>
                      <Typography sx={{ fontSize: "28px" }}>
                        {order.id}
                      </Typography>
                    </Grid>
                  </Grid>

                  {order?.ProductOnOrder?.map(({ product }) => {
                    return (
                      <>
                        <Grid
                          alignItems="center"
                          justifyContent={"space-between"}
                          sx={{
                            padding: "4px 12px",
                            background: "#201f1f",
                            mt: 1,
                          }}
                          component={Paper}
                          container>
                          <Typography>{product.name}</Typography>
                          <Grid
                            container
                            sx={{ width: "auto" }}
                            alignItems="center">
                            <OrderCounter productId={product.id} />
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </Paper>
              );
            })}
          </Paper>
        </TabPanel>
        <TabPanel>2</TabPanel>
      </TabsPanel>
    </>
  );
}
function TabsPanel({ children, tabIndex }) {
  const child = React.Children.map(children, (child, index) => {
    if (index === tabIndex) {
      return child;
    }
  });
  return child;
}

function TabPanel({ children }) {
  return <Box>{children}</Box>;
}
