import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios'
import RoomCard from "../components/RoomCard";

export default function Home() {
  
  const { user, error, isLoading } = useUser();
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect( () => {

    const getRooms = async() => {

      const roomsRes = await axios.get("http://localhost:4000/api/v1/consumer/fetch/rooms");
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

      var roomsArr = roomsRes.data.filter((room, idx) => idx < 4);
      console.log("first 4: ", roomsArr);

      setRooms(roomsArr);
    }

    getRooms();

    const getUser = async(user) => {
      // you make api call

      if (user) {
        console.log("there is a user")
        const email = user.email;


        const res = await axios.get(`http://localhost:4000/api/v1/consumer/fetch/user/${email}`).catch(function (error) {
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
          if (res.data.email == user.email) {
            console.log("you are loggedin")
            // router.push('/profile');
          }
        }
      }
    }

    console.log("this is a call to useEffect")
    console.log(user)

    getUser(user);
   

  }, [user])

  // over here before the return perform a mapping of the rooms state
  // because each element in rooms would be a json
  // then in the map instantiate a Room Card and pass the json as a prop 
  // and inside the map , the map function should return a list of 4 RoomCard components 
  // then you will pass the list of room card compoentns into the return to render 
  
  return (
    <div>
      <div>
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
      </div>
      {
        rooms.length > 0 && <RoomCard room = {rooms[0]}/>
      }
    </div>
    
  )
}


