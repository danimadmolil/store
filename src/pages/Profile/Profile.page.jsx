import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import {
  AddIcCallOutlined,
  Comment,
  Edit,
  ListAlt,
  MapOutlined,
  Settings,
} from "@mui/icons-material";
import useUser from "../../user/hooks/useUser";
import { Link, Outlet } from "react-router-dom";

// const DirectionalStepLabel = styled(StepLabel, {
//   shouldForwardProp: (prop) => true,
// })(({ theme, ...props }) => ({
//   ".MuiStepLabel-label": {
//     textAlign: props.direction
//       ? props.direction === "rtl"
//         ? "start"
//         : "end"
//       : "end",
//     marginRight: props.mr,
//     marginLeft: props.ml,
//   },
// }));
const menus = [
  { id: 1, title: "تنظیمات", link: "/profile/setting", icon: Settings },
  { id: 2, title: "لیست های من", link: "/profile/lists", icon: ListAlt },
  { id: 3, title: "دیدگاه ها", link: "/profile/comments", icon: Comment },
  { id: 4, title: "ادرس ها", link: "/profile/orders", icon: MapOutlined },
];
export default function ProfilePage() {
  const { user } = useUser();
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={2}
      sx={{
        boxSizing: "border-box",
        padding: "24px",
        width: "100%",
        minHeight: "400px",
      }}
      justifyContent="space-between"
      direction={"row"}>
      <Stack
        sx={{
          width: "100%",
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        }}
        direction={"row-reverse"}
        alignItems="center">
        <Avatar
          sx={{
            width: "30px",
            height: "30px",
            borderRadius: "40px",
            bgcolor: "gray",
          }}>
          DM
        </Avatar>
        <Stack direction={"column"} sx={{ width: "auto", marginLeft: "auto" }}>
          <Typography component={"h7"} sx={{ fontSize: "12px" }}>
            {user && user.name}
          </Typography>
          <Typography
            component={"span"}
            sx={{ color: "gray", fontSize: "10px" }}>
            {user && user.email}
          </Typography>
        </Stack>
        <IconButton
          sx={{
            width: "30px",
            height: "30px",
            borderRadius: "20px",
          }}>
          <Edit />
        </IconButton>
      </Stack>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} wrap="no-wrap">
        <Paper
          elevation={1}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "4px",
            boxSizing: "border-box",
            padding: "25px",
            [theme.breakpoints.down("md")]: {
              padding: "12px",
            },
          }}>
          <Stack direction={"row-reverse"} justifyContent="space-between">
            <Typography>سفارض های من</Typography>
            <Link
              style={{ textDecoration: "none", color: "cyan" }}
              to="/orders">
              مشاهده همه
            </Link>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-evenly"}>
            <Box disableRipple sx={{ width: "90px", height: "90px" }}>
              <Box sx={{ width: "100%", height: "80%" }}>
                <img
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={
                    "https://www.digikala.com/statics/img/svg/status-returned.svg"
                  }
                />
              </Box>
              <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
                تحویل داده شده
              </Typography>
            </Box>
            <Box disableRipple sx={{ width: "90px", height: "90px" }}>
              <Box sx={{ width: "100%", height: "80%" }}>
                <img
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={
                    "https://www.digikala.com/statics/img/svg/status-delivered.svg"
                  }
                />
              </Box>
              <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
                تحویل داده شده
              </Typography>
            </Box>
            <Box disableRipple sx={{ width: "90px", height: "90px" }}>
              <Box sx={{ width: "100%", height: "80%" }}>
                <img
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={
                    "https://www.digikala.com/statics/img/svg/status-processing.svg"
                  }
                />
              </Box>
              <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
                تحویل داده شده
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Paper
          sx={{ width: "100%", height: "auto" }}
          className="sub_page__container">
          <Outlet />
        </Paper>
      </Grid>

      <Grid
        className="profile_menu__container"
        item
        xs={12}
        sm={12}
        md={3}
        lg={3}
        xl={3}
        sx={{ height: "auto" }}>
        <Paper
          className="profile_menu"
          elevation={1}
          sx={{
            boxSizing: "border-box",
            padding: "33px 22px 0 22px",
            width: "100%",
            minHeight: "400px",
            borderRadius: "10px",
            border: "1px solid #E0E0E2 ",
          }}>
          <Stack
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
            direction={"row-reverse"}
            alignItems="center">
            <Avatar
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "40px",
                bgcolor: "gray",
              }}>
              DM
            </Avatar>
            <Stack
              direction={"column"}
              sx={{ width: "auto", marginLeft: "auto" }}>
              <Typography component={"h4"}>{user && user.name}</Typography>
              <Typography component={"span"} sx={{ color: "gray" }}>
                {user && user.email}
              </Typography>
            </Stack>
            <IconButton
              sx={{
                width: "30px",
                height: "30px",
                borderRadius: "20px",
              }}>
              <Edit />
            </IconButton>
          </Stack>
          <Divider
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
              listStyle: "none",
              paddingTop: "5px",
            }}
            variant="middle"
            component="li"
          />
          {/**
<Stepper
            connector={
              <span
                style={{
                  height: "20px",
                  background: "gray",
                  width: "1.5px",
                  marginRight: "15px",
                }}></span>
            }
            orientation="vertical"
            activeStep={0}
            sx={{ direction: "rtl" }}>
            <Step sx={{ direction: "rtl" }} key={"paypal"}>
              <DirectionalStepLabel
                icon={
                  <CircleRounded
                    sx={{ width: "15px", height: "15px", color: "gray" }}
                  />
                }
                mr="8px"
                direction="rtl">
                جوایز
              </DirectionalStepLabel>
              <StepContent sx={{ direction: "rtl" }}>
                <Link to={"/jayezeh"}>مشاهده جوایز</Link>
              </StepContent>
            </Step>
            <Step key={"club"} sx={{ direction: "rtl" }}>
              <DirectionalStepLabel
                icon={
                  <CircleRounded
                    sx={{ width: "15px", height: "15px", color: "gray" }}
                  />
                }
                mr="8px"
                direction="rtl">
                کیف پول
              </DirectionalStepLabel>
              <StepContent sx={{ direction: "rtl" }}>
                <Typography sx={{ direction: "rtl" }}>
                  <Link to={"/"}>شارژ کیف پول</Link>
                </Typography>
              </StepContent>
            </Step>
          </Stepper>

*/}
          <List>
            {menus.map((menu) => (
              <MenuItem sx={{ direction: "rtl" }} key={menu.id}>
                <menu.icon>
                  <AddIcCallOutlined />
                </menu.icon>
                <ListItemText sx={{ textAlign: "right", paddingRight: 2 }}>
                  <Link
                    to={menu.link}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      zIndex: 100,
                    }}></Link>
                  {menu.title}
                </ListItemText>
              </MenuItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
