import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import PostCard from '../components/PostCard';

export default function Room() {
  
  const { user, error, isLoading } = useUser();
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect( () => {
    const roomJSONIdStr = localStorage.getItem('roomIdStr')
    console.log("roomIdStr: ", roomJSONIdStr);

    const getRoom = async() => {
        const roomRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/room/${roomJSONIdStr}`).catch(function (error) {
            if(error.response) {
              console.log("ignore");
            } else if (error.request) {
              console.log("ignore");
            } else {
              console.log("ignore too");
            }
          });
        
        console.log("room fetched by id: ", roomRes.data);
        setRoom(roomRes.data);
    }

    getRoom();

    const getPosts = async() => {
        let postsRes=null;

        try{
            postsRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/approved/posts/${roomJSONIdStr}`)
            setPosts(postsRes.data);
        } catch (err) {
            console.error("error response");
            console.error(err.response.data);
            console.error(err.response.status);
        } finally {
            console.log("posts fetched by id: ", postsRes);
            
        }
        
    }

    getPosts();
  }, [])

  const renderedPosts = posts.map((p) => {
    return (
        <Grid item md={4}> <PostCard post = {p} key = {p._id}/> </Grid>
    )
  })
  
  return (
    <div>
     <h1>{room != null && room.name} </h1>
     {
        posts.length > 0 && <Grid container spacing={0.75}> {renderedPosts} </Grid> 
     }
    </div>
    
  )
}


