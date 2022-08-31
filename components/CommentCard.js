import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import ToggleButton from '@mui/material/ToggleButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: 150,
  height: 125,
});

const CommentCard=({comment}) => {

  const router = useRouter();
  const [selected, setSelected] = useState(false);
  const [likes, setLikes] = useState(0);
  const { user, error, isLoading } = useUser();
  const [userInfoID, setUserInfoID] = useState("");

  useEffect(() => {
    

    const getUser = async(user) => {

      if (user) {
        const email = user.email;


        const res = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/user/email/${email}`).catch(function (error) {
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
          console.log(user.email == res.data.email);
          // String(res.data._id) and do local storage set item for user id
          if (res.data.email == user.email) {
            setUserInfoID(String(res.data._id));
            console.log("userinfoid", userInfoID);
          }
        }
      }
  }
    
    getUser(user);


  }, [])

  const commentAvatarClick = () => {
    localStorage.setItem("userIDString", comment.user_id);
    router.push("/profile");
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
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={comment.avatarImage} onClick = {commentAvatarClick}/>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom style={{ wordWrap: "break-word" }} variant="subtitle1" component="div">
                <strong>{comment.username}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {comment.text}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                {comment.timestamp}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CommentCard;