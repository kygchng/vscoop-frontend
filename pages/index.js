import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios'
import RoomCard from "../components/RoomCard";
import Grid from '@mui/material/Grid';
import PersistentDrawer from '../components/NavBar';
export default function Home() {
  
  const { user, error, isLoading } = useUser();
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect( () => {

    const getRooms = async() => {

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
        localStorage.setItem("email", user.email);


        const res = await axios.get(`https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/user/email/${email}`).catch(function (error) {
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
            localStorage.setItem("userIDString", String(res.data._id));
            // localStorage.setItem("userIDString", String(res.data._id));
            // router.push('/profile');
          }
        }
      }
    }

    console.log("this is a call to useEffect")
    console.log(user)

    getUser(user);
   

  }, [user])



  const checkUser = (room) => {
    console.log("you clicked to check user");
    console.log("this is the room", room);

    if (user) {
        console.log("you are loggied in ")
        router.push('/allrooms')
    } else {
        router.push("/api/auth/login")
    }
  }


  // over here before the return perform a mapping of the rooms state
  // because each element in rooms would be a json
  // then in the map instantiate a Room Card and pass the json as a prop 
  // and inside the map , the map function should return a list of 4 RoomCard components 
  // then you will pass the list of room card compoentns into the return to render 

  const renderedRooms = rooms.map((r) => {
    return (
        <Grid item md={5}> <RoomCard room = {r} key = {r._id}/> </Grid>
    )
  })
  
  return (
    <div>
      <PersistentDrawer />
      <section className="container">
        <div id="col-1">
          <a href="/api/auth/login">Login</a>
          <br />
          <a href="/api/auth/logout">Logout</a>

          <div className="header">
            <h1>V.Scoop</h1>
            <p> Your daily virtual art museum digest </p>
            <p> Discover, distribute, and discuss </p>
          </div>
        </div>
        <div id="col-2">
          <h2> Museum Rooms </h2>
          <br />
          {
            rooms.length > 0 && <Grid container spacing={0.75}> {renderedRooms} </Grid> 
          }
          <br />
          <p onClick = {() => checkUser()}>View All Rooms</p>
          
        </div>
      </section>
    </div>
    
  )
}


