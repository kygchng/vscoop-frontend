import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreateIcon from '@mui/icons-material/Create';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import axios from 'axios';
import { useRouter } from 'next/router';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0.5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [userID, setUserID] = useState("");

  // use effect
  // get item for local storage to get the user id
  // get the user document
  // check if isAdmin = true 
  // create a state to hold isAdmin state

  useEffect(() => {
    var userEmailStr = localStorage.getItem("email");
    console.log("userEmailStr", userEmailStr);

    const getUser = async() => {
      const userRes = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/user/email/${userEmailStr}`).catch(function (error) {
        if(error.response) {
          console.log("ignore");
        } else if (error.request) {
          console.log("ignore");
        } else {
          console.log("ignore too");
        }
      });
      console.log("userRes data: ", userRes);
      if(userRes) {
        const userDoc = userRes.data;
        console.log("userDoc: ", userDoc);
        if(userDoc.is_admin) {
          setIsAdmin(true);
        } 
        setUserID(String(userDoc._id));
      }
      

     
      //when admin user logs out, the button is still there -- when logs out, must unrender - set localStorage
    }

    getUser();
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const checkUser = (room) => {
    console.log("you clicked to check user");

    if (user) {
        console.log("you are loggied in ")
    } else {
        router.push("/api/auth/login")
    }
  }

  const onMenuClickOpen = () => {
    handleDrawerOpen();
    checkUser();
  }

  const clickProfile = () => {
    console.log("MEOWWWWWWW")
    localStorage.setItem("userIDString", userID);
    console.log(localStorage.getItem("userIDString"));
    console.log("i clicked profile");
    router.push("/profile");
    //router.reload();
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color = 'transparent' open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClickOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            V.Scoop
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Home" disablePadding>
            <ListItemButton onClick = {() => router.push("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Rooms" disablePadding>
            <ListItemButton onClick = {() => router.push("/allrooms")}>
              <ListItemIcon>
                <ViewModuleIcon />
              </ListItemIcon>
              <ListItemText primary="Rooms" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Profile" disablePadding>
            <ListItemButton onClick = {clickProfile}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Create a Post" disablePadding>
            <ListItemButton onClick = {() => router.push("/createpost")}>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Create a Post" />
            </ListItemButton>
          </ListItem>
          {/* {['Dashboard', 'Rooms', 'Profile', 'Create a Post'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
        {isAdmin && <Divider />}
        {isAdmin && <List>
          <ListItem key="Admin Tools" disablePadding>
            <ListItemButton onClick = {() => router.push("/admin")}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Tools" />
            </ListItemButton>
          </ListItem>
        </List>}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
    </Box>
  );
}
