import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios'

export default function Home() {
  
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect( () => {
    const getUser = async(user) => {
      // you make api call

      
      if (user) {
        console.log("there is a user")
        const email = user.email;


        const res = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/user/${email}`);
        console.log("this is the api res", res.data);

        if (res.data.email == user.email) {
          console.log("you are loggedin")
        } else {
          router.push("/signup")
        }
      }
    }

    console.log("this is a call to useEffect")
    console.log(user)

    getUser(user);
   

  }, [user])
  
  return (
    <div>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}


