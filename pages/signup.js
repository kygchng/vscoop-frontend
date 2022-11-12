import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import date from 'date-and-time';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import { UploadToS3 } from 'react-upload-to-s3';
import Link from 'next/link';

// import dynamic from 'next/dynamic';
// // const UploadToS3 = dynamic(
// //     () => import('react-upload-to-s3'),
// //     { ssr: false }
// //   )
// const UploadToS3 = dynamic(()=>{return import('react-upload-to-s3')}, {ssr: false});

const useStyles = makeStyles({
  field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
  }
})


export default function Signup() {
  const classes = useStyles()
  const emailRef = useRef();
  const usernameRef = useRef();
  const birthdayRef = useRef();
  const bioRef = useRef();

  const { user, error, isLoading } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  const [open, setOpen] = useState(false); //snackbar
  const [message, setMessage] = useState("");

  // const [s3Image, setS3Image] = useState("");


  // useEffect(() => {
  //   if (typeof window === 'undefined') {
  //     global.window = {}
  //   }
  // }, [])


    const handleSubmit = async(e) => {
      console.log("we are going to create a user");
      e.preventDefault();

      console.log(emailRef.current.value);
      console.log(usernameRef.current.value);
      console.log(birthdayRef.current.value);
      console.log(bioRef.current.value);


      if(emailRef.current.value && usernameRef.current.value && birthdayRef.current.value && bioRef.current.value && s3Image != "") {
        console.log("made it to api call for create user");

        var userBody = {};

        var imageName = s3Image.substring(s3Image.indexOf("/") + 1);
        var s3URL = `https://vscoop-uploads.s3.us-west-1.amazonaws.com/${imageName}`;
        console.log("s3URL, ", s3URL);

        userBody.email= emailRef.current.value;
        userBody.password= "test";
        userBody.username= usernameRef.current.value;
        userBody.birthday= birthdayRef.current.value;
        userBody.bio= bioRef.current.value;
        userBody.profile_picture= s3URL;
        userBody.is_admin= false;
        userBody.rooms= [];


        await axios.post('https://mighty-island-44359.herokuapp.com/api/v1/consumer/register/user', userBody)
        .then(res => {
            console.log(res);
            localStorage.setItem('email', String(userBody.email));
            router.push(router.push("/api/auth/login"));
        })
        .catch(error => {
        })
      } else {
        setOpen(true);
        setMessage("Imcomplete fields.");
      }
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
        <Link href="/api/auth/logout">Logout</Link>

        <h1> Sign Up </h1>
        <form onSubmit = {handleSubmit}>
            <TextField 
                inputRef = {emailRef}
                type = "text"
                label = "Email"
                id="outlined-basic" 
                variant="outlined" />
            <br />
            <br />
            <TextField 
                inputRef = {usernameRef}
                type = "text"
                label = "Username"
                id="outlined-basic" 
                variant="outlined" />
            <br />
            <br />
            <TextField 
                inputRef = {birthdayRef}
                type = "text"
                label = "Birthday (MM/DD/YYYY)"
                id="outlined-basic" 
                variant="outlined" />

            <br />
            <br />
            {/* <UploadToS3 
                    bucket="vscoop-uploads"
                    awsRegion="us-west-1"
                    awsKey="AKIAQCFG5Q36VLMG6HOS"
                    awsSecret="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"
                    type="image"
                    showNewUpload={false}
                    onResult={(result) => {
                        console.log('on Result', result);
                        setS3Image(result.url);
                    }} /> */}
            <br />
            <br />
            <TextField
                inputRef={bioRef} 
                className={classes.field}
                type = "text"
                label = "User Bio"
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
                Create User
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
    )
  }
  
  
  