import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminAccordion from '../components/AdminAccordion';

export default function Admin({roomsWithPosts}) {
  console.log("roomswithposts: ", roomsWithPosts);
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  
  useEffect( () => {
    if (user) {
        console.log("you are loggied in ")
      } else {
        router.push("/api/auth/login")
      }
  }, [])

  return (
    <div>
     <h1> Admin Tools Page </h1>
     <AdminAccordion roomsWithPosts = {roomsWithPosts} />
    </div>
    
  )
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
    const roomsWithPosts = roomsRes.data;
    //api call for getting the unapproved posts for each room

    for(var i = 0; i < roomsWithPosts.length; i++) {
        const roomID = String(roomsWithPosts[i]._id);
        const posts = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/unapproved/posts/${roomID}`);
        roomsWithPosts[i].postsJSON = posts.data;
    }

  return {
    props: {roomsWithPosts}
  }
}
