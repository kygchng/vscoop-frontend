import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios'

export default function Post() {
    const { user, error, isLoading } = useUser();
    const [post, setPost] = useState(null);
    const [username, setUsername] = useState(null);
    const router = useRouter();

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
        
    }, [])

    const getUsername = async() => {
        console.log("made it in getUsername");
        console.log(post.user_id);
        const userRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/user/ID/${post.user_id}`).catch(function (error) {
            if(error.response) {
              console.log("ignore");
            } else if (error.request) {
              console.log("ignore");
            } else {
              console.log("ignore too");
            }
          });
        
        console.log("user fetched by id: ", userRes.data);
        setUsername(userRes.data.username);
        console.log("username", username);
    }

    if(post) {
        getUsername();
    }

    return (
        <div>
            <h3> {username} </h3>
            {post && <img src={post.picture} alt="post picture" />}
            {post && <h1> {post.title} </h1>}
            {post && <p> {post.description} </p>}
        </div>
    )
}