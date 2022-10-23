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

const LikeButtonComment=({userID, commentInitial}) => {

  const router = useRouter();
  const [selected, setSelected] = useState(false);
  const { user, error, isLoading } = useUser();
//   const [userInfoID, setUserInfoID] = useState("");
  const [comment, setComment] = useState(null);
  const [commentId, setCommentId] = useState(null);

  useEffect( () => {
    setComment(commentInitial);
    setCommentId(commentInitial._id);
    console.log("comment user ID", userID);

    // if(comment) {
    //     if(comment.likes.includes(userID)) {
    //         console.log("comment likes includes");
    //         setSelected(true);
    //     }
    // }
    
  }, [])

  const like = async() => {
    if(comment) {
        console.log("====================================================================");
        console.log("i am inside of the comment if statement ");
        console.log("comment: ", comment);
        const commentID = String(commentId);
        console.log("comment id : ", commentID);
        console.log("====================================================================");
        // const userIDString = String(userID);
        // console.log("userInfoID: ", userInfoID);
        const updatedComment = await axios.put(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/like/comment/${commentID}/${userID}`).catch(function (error) {
                  if(error.response) {
                    console.log("ignore");
                  } else if (error.request) {
                    console.log("ignore");
                  } else {
                    console.log("ignore too");
                  }
        });
    
        // setLikes(updatedPost.data.likes.length);
        console.log("updatedComment: ", updatedComment.data);
        setComment(updatedComment.data);
    
        setSelected(comment.likes.includes(userID));
        console.log("selected", selected);
    }
    
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

        {comment ? <p> {comment.likes.length} Likes </p> : null}
    </div>
    
 )

}

export default LikeButtonComment;