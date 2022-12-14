import React from "react";
import {
  Box,
  Divider,
  Paper,
  styled,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Grid,
  Badge,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import usePostQuery from "../../../user/hooks/usePostQuery";
import { BASE_URL } from "../../../utils/constatnts";
import { getItemWithExpire } from "../../../utils/localStorage";

import ListMenu from "../../../components/ListMenu";
import { Delete, Edit } from "@mui/icons-material";
const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    "&.Mui-selected": {
      color: theme.palette.primary.main,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);
const AntTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    color: theme.palette.primary.main,
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function calculateInitialIndex(selectedTab, defaultIndex = 0) {
  let initialIndex = defaultIndex;
  if (selectedTab === "comments") {
    initialIndex = 1;
  } else if (selectedTab === "pending") {
    initialIndex = 0;
  }
  return initialIndex;
}
export default function Comments() {
  const { data,isLoading } = usePostQuery(
    ["comments"],
    function () {
      return fetch(BASE_URL + "/user/comments", {
        headers: {
          Authorization: `Bearer ${getItemWithExpire("accessToken")}`,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("failed to get your comments");
        }
      });
    },
    { networkMode: "always" }
  );
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(
    calculateInitialIndex(searchParams.get("activeTab"))
  );
  const navigator = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Typography sx={{ direction: "rtl", padding: 2 }}>?????????????? ????</Typography>
      <Paper sx={{ width: "100%" }}>
        <Paper>
          <AntTabs
            indicatorColor="primary"
            sx={{ direction: "rtl" }}
            value={value}
            onChange={handleChange}
            aria-label="ant example">
            <AntTab
              onClick={() => navigator("/profile/comments/?activeTab=pending")}
              label="???? ???????????? ??????"
            />
            <AntTab
              label="???????????? ?????? ????"
              onClick={() =>
                navigator("/profile/comments/?activeTab=comments")
              }></AntTab>
          </AntTabs>
          <Box sx={{ p: 3 }} />
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              Item One
            </TabPanel>
            {isLoading ? (
              <Stack
                sx={{ padding: "20px 0px", display: "flex" }}
                justifyContent="center"
                alignItems="center">
                <CircularProgress />
              </Stack>
            ) : (
              <TabPanel value={value} index={1} dir={theme.direction}>
                {data &&
                  data.map((comment) => {
                    return (
                      <Grid
                        sx={{ mt: 4, direction: "rtl", width: "100%" }}
                        key={comment.id}
                        wrap={"no-wrap"}
                        container
                        direction={"row"}>
                        <Grid item xl={2} lg={2} md={2}>
                          <Box
                            component={"img"}
                            sx={{
                              width: "63px",
                              height: "75px",
                              objectFit: "cover",
                              [theme.breakpoints.up("md")]: {
                                width: "80px",
                                height: "80px",
                                borderRadius: "2px",
                              },
                              [theme.breakpoints.up("lg")]: {
                                width: "130px",
                                height: "130px",
                                borderRadius: "3px",
                              },
                            }}
                            src={comment.product && comment.product.image}
                          />
                          <Badge
                            sx={{ display: "flex", alignSelf: "flex-end" }}
                            badgeContent={4}
                            color="success"
                          />
                        </Grid>
                        <Grid
                          container
                          item
                          xl={10}
                          lg={10}
                          md={10}
                          direction={"column"}>
                          <Grid
                            container
                            alignItems={"center"}
                            justifyContent="end"
                            sx={{ height: "40px" }}>
                            <ListMenu
                              sx={{ color: "secondary" }}
                              menuItems={[
                                { id: 1, title: "Edit", icon: Edit },
                                { id: 2, title: "delete", icon: Delete },
                              ]}
                            />
                          </Grid>
                          <Divider variant="middle" />
                          <Box sx={{ height: "auto", padding: "10px 5px" }}>
                            <Typography>{comment.comment}</Typography>
                          </Box>
                          <Divider variant="middle" />
                          <Box style={{ height: "20px" }}></Box>
                        </Grid>
                      </Grid>
                    );
                  })}
              </TabPanel>
            )}
          </SwipeableViews>
        </Paper>
      </Paper>
    </Paper>
  );
}
