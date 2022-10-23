import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    width: 150,
    height: 125,
  });
  

export default function AdminPostCard({post}) {

    const { user, error, isLoading } = useUser();
    const router = useRouter();

    // const checkUser = (room) => {
    //     console.log("you clicked to check user");
    //     console.log("this is the room", room);

    //     if (user) {
    //         console.log("you are loggied in ")
    //         var roomIdStr = String(room._id)
    //         localStorage.setItem('roomIdStr', roomIdStr);
    //         router.push('/room')
    //     } else {
    //         router.push("/api/auth/login")
    //     }
    // }

    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const getCreator = async() => {
            console.log(post.user_id);
            const creatorRes = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/user/ID/${post.user_id}`);
            console.log("creator of post: ", creatorRes.data);
            setCreator(creatorRes.data);
        }
        getCreator();

        if(user) {
          localStorage.setItem("userEmailForPost", user.email);
        }
    }, [])

    const getId = () => {
      var postIdStr = String(post._id)
      localStorage.setItem('postIdStr', postIdStr);
      console.log("saved post id: ", postIdStr);
      router.push("/approvepost");
    }

    return (
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <div onClick = {() => getId()}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="complex" src={post.picture} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom style={{ wordWrap: "break-word" }} variant="subtitle1" component="div">
                    <strong>{post.title}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {creator != null && creator.username}
                  </Typography>
                </Grid>
               
              </Grid>
            </Grid>
          </Grid>
        </div>
        
      </Paper>
    );
}