import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function ApprovePost() {
  
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [post, setPost] = useState();
  const [postUserID, setPostUserID] = useState("");

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
        setPostUserID(postRes.data.user_id);
    }

    getPost();
}, [])

const postCreatorClick = () => {
    localStorage.setItem("userIDString", postUserID);
    router.push("/profile");
  }
  
  return (
    <div>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
              <Stack spacing = {2}>
                <div  onClick = {postCreatorClick}>
                  {post && <img src = {post.avatarImage} alt = "avatar" width = "50" height = "50"/>}
                  {post && <h3> {post.username} </h3>}
                </div>
                  {post && <img src={post.picture} alt="post picture" />}
                  
                  {post && <h1> {post.title} </h1>}
                  {post && <p> {post.description} </p>}

              </Stack>
            </Box>
    </div>
    
  )
}

