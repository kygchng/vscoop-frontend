import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import PostCard from '../components/PostCard';
import date from 'date-and-time';

export default function Room() {
  
  const { user, error, isLoading } = useUser();
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect( () => {
    if (user) {
      console.log("you are loggied in ")
    } else {
      router.push("/api/auth/login")
    }

    const roomJSONIdStr = localStorage.getItem('roomIdStr')
    console.log("roomIdStr: ", roomJSONIdStr);

    const getRoom = async() => {
        const roomRes = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/room/${roomJSONIdStr}`).catch(function (error) {
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
      const postsRes = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/approved/posts/${roomJSONIdStr}`)

      console.log("postsRes: ", postsRes);
      const datedPosts = postsRes.data.map(obj => {
        return {...obj, timestamp: date.parse(obj.timestamp, 'YYYY/MM/DD HH:mm:ss')} //string to date
      })

      console.log("presort, date parse", datedPosts);

      const sortedPostsDesc = datedPosts.sort(
        (objA, objB) => Number(objB.timestamp) - Number(objA.timestamp), //descending order (high to low --> new to old)
      );

      console.log("sorted posts desc: ", sortedPostsDesc);

      const stringedPosts = sortedPostsDesc.map(obj => {
        return {...obj, timestamp: date.format(obj.timestamp, 'YYYY/MM/DD HH:mm:ss')} //date to string
      })

      console.log("final", stringedPosts);
      setPosts(stringedPosts);



        // let postsRes=null;

        // try{
            
        // } catch (err) {
        //     console.error("error response");
        //     //console.error(err.response.data);
        //     //console.error(err.response.status);
        // } finally {
        //     console.log("posts fetched by id: ", postsRes);
            
        // }
        
    }

    getPosts();

  }, [])

  const renderedPosts = posts.map((p) => {
    return (
        <Grid item md={4} key = {p._id}> <PostCard post = {p} key = {p._id}/> </Grid>
    )
  })
  
  return (
    <div>
     <h1>{room != null && room.name} </h1>
     {
        posts.length > 0 && <Grid container spacing={0.75}> {renderedPosts} </Grid> 
     }
     {
        posts.length == 0 && <h3> No posts have been created yet. Be the first! </h3>
     }
    </div>
    
  )
}


