import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

const LikeButtonPost=({userID}) => {
  //userID is an object ID, not a string

  const router = useRouter();
  const [selected, setSelected] = useState(false);
  // const { user, error, isLoading } = useUser();
  // const [userInfoID, setUserInfoID] = useState("");
  const [post, setPost] = useState(null);

  useEffect( () => {
    const postJSONIdStr = localStorage.getItem("postIdStr");
    console.log("postIdStr: ", postJSONIdStr);

    const getPost = async() => {
        const postRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/post/${postJSONIdStr}`).catch(function (error) {
            if(error.response) {
                console.log("ignore");
            } else if (error.request) {
                console.log("ignore");
            } else {
                console.log("ignore too");
            }
            });
            
        console.log("post fetched by id: ", postRes.data);
        setPost(postRes.data);
    }
    
    getPost();

    if(post) {
        if(post.likes.includes(userID)) {
            console.log("post likes includes");
            setSelected(true);
        }
    }
    
  }, [])

  const like = async() => {
    const postID = localStorage.getItem("postIdStr");
    console.log("postID", postID);
    console.log("userID", userID);
    // console.log("userInfoID: ", userInfoID);
    const updatedPost = await axios.put(`http://localhost:4000/api/v1/consumer/like/post/${postID}/${userID}`).catch(function (error) {
              if(error.response) {
                console.log("ignore");
              } else if (error.request) {
                console.log("ignore");
              } else {
                console.log("ignore too");
              }
    });

    // setLikes(updatedPost.data.likes.length);
    console.log("updatedPost: ", updatedPost.data);
    setPost(updatedPost.data);

    setSelected(post.likes.includes(userID));
    console.log("selected", selected);
  }

  //note: selected == false, render filled in heart
  //i think it is because it renders before selected changes
  //so before onchange is called - user expects selected=true and heart to be filled in, but it renders when selected=false
  return (
    <div>
        <ToggleButton
            value="check"
            selected={selected}
            onChange={() => {
                like();
            }}
        >

            {selected == false ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </ToggleButton>

        {post ? <p> {post.likes.length} Likes </p> : null}
    </div>
    
 )

}

export default LikeButtonPost;