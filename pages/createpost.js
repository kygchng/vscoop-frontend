import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import date from 'date-and-time';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//import UploadImagePost from '../components/UploadImagePost';
import { UploadToS3 } from 'react-upload-to-s3'
import Themes from 'react-ui-themes-superflows'
import { Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import dynamic from 'next/dynamic';
// const UploadToS3 = dynamic(
//     () => import('react-upload-to-s3'),
//     { ssr: false }
//   )

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
  })




export default function CreatePost({sortedRooms}) {
    const classes = useStyles()
    const titleRef = useRef();
    const descriptionRef = useRef();

    const { user, error, isLoading } = useUser();
    const [userInfo, setUserInfo] = useState(null);
    const [roomID, setRoomID] = useState("");
    const router = useRouter();

    const [open, setOpen] = useState(false); //snackbar
    const [message, setMessage] = useState("");

    const [s3Image, setS3Image] = useState("");

    const theme = Themes.getTheme("Default");

    useEffect( () => {
        if (user) {
            console.log("you are loggied in ")
          } else {
            router.push("/api/auth/login")
          }


        const getUser = async() => {
            // you make api call
      
            // if (user) {
            //   console.log("there is a user")
            //   const email = user.email;

            const emailStr = localStorage.getItem("email");
            console.log("email from localstorage:", emailStr);

            const res = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/user/email/${emailStr}`).catch(function (error) {
                if(error.response) {
                  console.log("email is not in api");
                  router.push("/signup");
                } else if (error.request) {
                  console.log("ignore");
                } else {
                  console.log("ignore too");
                }
              });

            if(res) {
                console.log("this is the api res", res.data);
                console.log(user.email == res.data.email);
                // String(res.data._id) and do local storage set item for user id
                if (res.data.email == user.email) {
                    console.log("you are loggedin");
                    setUserInfo(res.data);
                    console.log("userInfo: ", userInfo);
                //   localStorage.setItem("userIDString", String(res.data._id));
                    // localStorage.setItem("userIDString", String(res.data._id));
                     // router.push('/profile');
                }
            }
        }
        getUser();

    }, []);


    const handleChange = (event) => {
        setRoomID(event.target.value);
        console.log("selected room id", event.target.value);
      };
    
      const renderedRoomSelect = sortedRooms.map((r) => {
        return (
            <MenuItem value = {String(r._id)} key = {r._id}> {r.name} </MenuItem>
        )
      })

      const handleSubmit = async(e) => {
        console.log("we are going to submit a post");
        e.preventDefault();
  
        console.log(titleRef.current.value);
        console.log(descriptionRef.current.value);
        console.log(userInfo);
        console.log(roomID);
  
  
        if(titleRef.current.value && descriptionRef.current.value && userInfo && roomID && s3Image != "") { {
            console.log("made it in to submit");
            const now = new Date();
  
            var postBody = {};

            var imageName = s3Image.substring(s3Image.indexOf("/") + 1);
            var s3URL = `https://vscoop-uploads.s3.us-west-1.amazonaws.com/${imageName}`;
            console.log("s3URL, ", s3URL);

            postBody.user_id = String(userInfo._id),
            postBody.username = userInfo.username,
            postBody.avatarImage = userInfo.profile_picture,
            postBody.room_id = roomID, // → post.find(room_id)
            postBody.title = titleRef.current.value,
            postBody.description = descriptionRef.current.value,
            postBody.picture = s3URL, // (link)
            postBody.likes = [], // of user ObjectIds
            //comments: Array, // of comment ObjectIds
            postBody.timestamp = date.format(now, 'YYYY/MM/DD HH:mm:ss'), //date to string
            postBody.is_approved = false;
    
    
            await axios.post('https://mighty-island-44359.herokuapp.com/api/v1/consumer/create/post', postBody)
                .then(res => {
                    console.log(res);
                    localStorage.setItem('postIdStr', String(res.data._id));
                })
                .catch(error => {
                })
                
            // localStorage.setItem("userEmailForPost", userInfo.email);
            router.push("/postconfirmation");
            } 


            //snackbar saying post has been created -- THIS DOESN'T WORK CUZ WE WENT TO A DIFF PAGE
            setOpen(true);
            setMessage("Success! Post created.");
        } else {
            //implement snackbar - saying some fields are not filled
            setOpen(true);
            setMessage("Imcomplete fields.");
        }
  
        // {
        //   post_id: String,
        //     user_id: String, // (get username and profile picture)
        //   username: String,
        //   avatarImage: String,
        //   text: String,
        //   timestamp: String
        // }
  
      }



      //snackbar stuff
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </React.Fragment>
    );


      return (
        <div>
            <div>
                <h1> Create a Post </h1>
            </div>
            <form onSubmit = {handleSubmit}>
                <TextField 
                    inputRef = {titleRef}
                    type = "text"
                    label = "Title"
                    id="outlined-basic" 
                    variant="outlined" />
                <br />
                <br />

                

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select a Room</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={roomID}
                        label="Room ID"
                        onChange={handleChange}
                        >

                            {renderedRoomSelect}
                        </Select>
                    </FormControl>
                </Box>

               
               <br /> 
                    <UploadToS3 
                        bucket="vscoop-uploads"
                        awsRegion="us-west-1"
                        awsKey="AKIAQCFG5Q36VLMG6HOS"
                        awsSecret="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"
                        type="image"
                        showNewUpload={false}
                        onResult={(result) => {
                            console.log('on Result', result);
                            setS3Image(result.url);
                        }} />

                <br />
                <TextField
                    inputRef={descriptionRef} 
                    className={classes.field}
                    type = "text"
                    label = "Write a Description"
                    variant = "outlined"
                    color = "secondary"
                    multiline
                    rows={4}
                    fullWidth
                />
                <br />
                <br />
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick = {handleSubmit}
                >
                    Submit
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={action}
                />
            </form>
            
        </div>
        
      );

  }
  
  
  

export async function getServerSideProps() {
    const roomsRes = await axios.get("https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/rooms");
    console.log("before sort: ", roomsRes.data);

    function getSortOrder() {
        return function(a, b) {
          if (a["contributors"].length > b["contributors"].length) {
            return -1;
          } else if (a["contributors"].length < b["contributors"].length) {
            return 1;
          }
          return 0;
        }
    }

    roomsRes.data.sort(getSortOrder());
    console.log("after sort: ", roomsRes.data);
    const sortedRooms = roomsRes.data;
  return {
    props: {sortedRooms}
  }
}

