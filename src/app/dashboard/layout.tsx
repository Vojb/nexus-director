"use client";
import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { getAuth, signOut } from "firebase/auth";
import { firebaseConfig } from "@/datarepo/firebase";
import { useRouter } from "next/router";
import { useUserStore } from "@/datarepo/stores";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, IconButton } from "@mui/material";

const DRAWER_WIDTH = 160;

const LINKS = [
  { text: "Questions", href: "/dashboard/questions", icon: StarIcon },
  { text: "Tasks", href: "/dashboard/tasks", icon: ChecklistIcon },
];

const PLACEHOLDER_LINKS = [
  { text: "Settings", icon: SettingsIcon },
  { text: "Support", icon: SupportIcon },
  { text: "Logout", icon: LogoutIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState({
    left: false,
  });
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const { username } = useUserStore();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, ["left"]: open });
      setOpenDrawer(!open);
    };

  const list = () => (
    <Box
      sx={{
        width: 200,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <List>
        {LINKS.map(({ text, href, icon: Icon }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton component={Link} href={href}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: "auto" }} />
      <Button onClick={handleSignOut}>
        <Typography>Logout</Typography>
      </Button>
    </Box>
  );
  // Handle the sign-out when the "Sign Out" link is clicked
  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error("Sign-out error", error);
      });
  };

  return (
    <ThemeRegistry>
      <React.Fragment key={"left"}>
        <AppBar position="fixed" sx={{ zIndex: 2000 }}>
          <Toolbar>
            <IconButton onClick={toggleDrawer(openDrawer)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              top: ["48px", "56px", "64px"],
              height: "auto",
              bottom: 0,
            },
          }}
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer(!openDrawer)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          mt: ["48px", "56px", "64px"],
          p: 3,
        }}
      >
        {children}
      </Box>
    </ThemeRegistry>
  );
}
