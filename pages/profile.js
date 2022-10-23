import { useUser } from "@auth0/nextjs-auth0";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import PostCard from '../components/PostCard';
import { useRouter } from 'next/router';

export default function Profile () {

  const [userInfo, setUserInfo] = useState(null);
  const { user, error, isLoading } = useUser();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect( () => {
    if (user) {
      console.log("you are loggied in ")
    } else {
      router.push("/api/auth/login")
    }


    var userID = localStorage.getItem("userIDString");
    const getUserInfo = async() => {
      const userRes = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/user/ID/${userID}`).catch(function (error) {
          if(error.response) {
            console.log("ignore");
          } else if (error.request) {
            console.log("ignore");
          } else {
            console.log("ignore too");
          }
        });
      
      console.log("userInfo fetched by id: ", userRes.data);
      setUserInfo(userRes.data);


      const postsRes = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/posts/user/${userID}`).catch(function(error) {
        if(error.response) {
          console.log("ignore");
        } else if (error.request) {
          console.log("ignore");
        } else {
          console.log("ignore too");
        }
      })

      if(postsRes) {
        console.log("posts fetched by id: ", postsRes.data);
        setPosts(postsRes.data);
      }

      
    }

    if(userID) getUserInfo();

    // const getPosts = async() => {
    //   var userID = String(userInfo._id);
    //   const postsRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/posts/user/${userID}`).catch(function(error) {
    //     if(error.response) {
    //       console.log("ignore");
    //     } else if (error.request) {
    //       console.log("ignore");
    //     } else {
    //       console.log("ignore too");
    //     }
    //   })

    //   console.log("posts fetched by id: ", postsRes.data);
    //   setPosts(postsRes.data);
    // }

    // if(userEmail) getPosts();

}, [])

const renderedPosts = posts.map((p) => {
  return (
      <Grid item md={4}> <PostCard post = {p} key = {p._id}/> </Grid>
  )
})

  console.log(userInfo);
  return (
    <div>
      <h1> User Profile</h1>
      <div>
        {userInfo && <img src = {userInfo.profile_picture} alt = "avatar" width = "200" height = "200"/>}
        {userInfo && <h4> {userInfo.username} </h4>}
        {userInfo && <p> {userInfo.bio} </p>}
      </div>
      <br />
      <div>
        <h2> User Posts </h2>
        {
        posts.length > 0 && <Grid container spacing={0.75}> {renderedPosts} </Grid> 
        }
      </div>
    </div>

  )
  // if (user) {
  //   return (
  //     <div>
  //       <h2>{user.name}</h2>
  //       <p>{user.email}</p>
  //       <Link href="/api/auth/logout">Logout</Link>
  //     </div>
  //   );
  // }
  // return <Link href="/api/auth/login">Login</Link>;


};

// export async function getServerSideProps() {
//   const posts = {}
//   return {
//     props: {posts}
//   }
// }


// export async function getStaticProps(context) {
//   return {
//     props: {
//       protected: true
//     }
//   };
// }