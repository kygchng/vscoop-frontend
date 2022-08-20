import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios';
import CommentCard from "../components/CommentCard";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
  }
})

export default function Post() {

  const classes = useStyles()
  const contentRef = useRef();
  
    const { user, error, isLoading } = useUser();
    const [post, setPost] = useState(null);
    // const [username, setUsername] = useState(null);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("placeholder");
    const [commentJSON, setCommentJSON] = useState(null);
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

        const getComments = async() => {
          const commentsRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/comments/${postJSONIdStr}`).catch(function (error) {
                if(error.response) {
                  console.log("ignore");
                } else if (error.request) {
                  console.log("ignore");
                } else {
                  console.log("ignore too");
                }
              });
            
            console.log("comments fetched by id: ", commentsRes.data);
            setComments(commentsRes.data);
        }

        getComments();

        // const getCommentUsernames = async() => {
        //   console.log("made it in getCommentUsernames");


        //   for(var i = 0; i < comments.length; i++) {
        //     //for each comment, make an API call to find the username
        //     console.log("COMMENT ID: ", comments[i].user_id);

        //     const usernameRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/user/ID/${comments[i].user_id}`).catch(function (error) {
        //       if(error.response) {
        //         console.log("ignore");
        //       } else if (error.request) {
        //         console.log("ignore");
        //       } else {
        //         console.log("ignore too");
        //       }
        //     });

        //     console.log("COMMENT USERNAME: ", usernameRes.data.username);
        //     comments[i].username = usernameRes.data.username;
          
        //   }
        // }

        // getCommentUsernames();
        
    }, [commentJSON])

    // const getUsername = async() => {
    //     console.log("made it in getUsername");
    //     console.log(post.user_id);
    //     const userRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/user/ID/${post.user_id}`).catch(function (error) {
    //         if(error.response) {
    //           console.log("ignore");
    //         } else if (error.request) {
    //           console.log("ignore");
    //         } else {
    //           console.log("ignore too");
    //         }
    //       });
        
    //     console.log("user fetched by id: ", userRes.data);
    //     setUsername(userRes.data.username);
    //     console.log("username", username);
    // }

      console.log("made it in renderingComments");
      const renderedComments = comments.map((c) => {
        return (
          <div key = {c._id}>
            <CommentCard comment = {c}/> 
            <br />
          </div>
            
        )
      })


    const handleSubmit = async(e) => {
      console.log("we are going to submit a comment");
      e.preventDefault();

      setContent(String(contentRef.current.value));

      if(contentRef.current.value && post && user) {

        var userEmail = user.email;
        const userInfoRes = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/user/email/${userEmail}`);
        const userInfo = userInfoRes.data;

        var commentBody = {};
        commentBody.post_id = String(post._id);
        commentBody.user_id = String(userInfo._id);
        commentBody.username = userInfo.username;
        commentBody.avatarImage = userInfo.profile_picture;
        commentBody.text = contentRef.current.value;
        commentBody.timestamp = "11:40AM 8/14/2022"; // to be changed


        await axios.post('http://localhost:4000/api/v1/consumer/create/comment', commentBody)
            .then(res => {
                setCommentJSON(commentBody)
            })
            .catch(error => {
            })

        contentRef.current.value = "";
      }

      // {
      //   post_id: String,
      //     user_id: String, // (get username and profile picture)
      //   username: String,
      //   avatarImage: String,
      //   text: String,
      //   timestamp: String
      // }

    }



    return (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
              <Stack spacing = {2}>
                  {post && <img src = {post.avatarImage} alt = "avatar" width = "50" height = "50"/>}
                  {post && <h3> {post.username} </h3>}
                  {post && <img src={post.picture} alt="post picture" />}
                  {post && <h1> {post.title} </h1>}
                  {post && <p> {post.description} </p>}

                  <br />
                  <h1> Forum </h1>
              </Stack>
            </Box>

            <br />
            <form onSubmit = {handleSubmit}>
                <TextField
                    inputRef={contentRef} 
                    className={classes.field}
                    type = "text"
                    label = "Add to the forum..."
                    variant = "outlined"
                    color = "secondary"
                    multiline
                    rows={4}
                    fullWidth
                />
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                >
                    Submit
                </Button>
            </form>
            
            <br />
            {comments.length > 0 && renderedComments}

            
        </div>
    )
}