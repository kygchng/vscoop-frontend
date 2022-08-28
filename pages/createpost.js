import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';


export default function CreatePost() {
  
    const { user, error, isLoading } = useUser();
    const [userInfo, setUserInfo] = userState(null);

    useEffect( () => {
        const getUser = async(user) => {
            // you make api call
      
            if (user) {
              console.log("there is a user")
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
                console.log("this is the api res", res.data);
                console.log("this is the user email: ", user.email);
                console.log(user.email == res.data.email);
                // String(res.data._id) and do local storage set item for user id
                if (res.data.email == user.email) {
                  console.log("you are loggedin");
                  setUserInfo(res.data);
                //   localStorage.setItem("userIDString", String(res.data._id));
                  // localStorage.setItem("userIDString", String(res.data._id));
                  // router.push('/profile');
                }
              }
            }
        }
    }, []);

    return (
      <div>
        <h1> this is the create post page </h1>
      </div>
    )
  }
  
  
  