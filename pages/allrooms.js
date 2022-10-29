import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import axios from 'axios'
import RoomCard from "../components/RoomCard";
import Grid from '@mui/material/Grid';
import SearchBar from "../components/SearchBar";
import Box from '@mui/material/Box';


export default function AllRooms({sortedRooms}) {
  console.log(sortedRooms);
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect( () => {
    if (user) {
      console.log("you are loggied in ")
    } else {
      router.push("/api/auth/login")
    }
  }, [])

  // over here before the return perform a mapping of the rooms state
  // because each element in rooms would be a json
  // then in the map instantiate a Room Card and pass the json as a prop 
  // and inside the map , the map function should return a list of 4 RoomCard components 
  // then you will pass the list of room card compoentns into the return to render 

    var searchRoomList = [];
    var count = 0;
    for(var i = 0; i < sortedRooms.length; i++) {
        var newRoom = {};
        newRoom.value = count;
        newRoom.label = sortedRooms[i].name;
        newRoom.roomId = String(sortedRooms[i]._id);
        count++;
        searchRoomList.push(newRoom)
    }

  const renderedRooms = sortedRooms.map((r) => {
    return (
      <Grid item md={3} key = {r._id}> <RoomCard room = {r} key = {r._id}/> </Grid>
    )
  })
  
  return (
    <div>
        <h1> All Rooms </h1>
        <div style={{marginLeft: '10px', marginRight: '10px'}}>
          <SearchBar roomList = {searchRoomList} />

        </div>
        <br/>
        <div>
          <Grid container spacing={3}> {renderedRooms} </Grid> 
        </div>
   </div>
   
    
  )
}

//https://mighty-island-44359.herokuapp.com/api/v1/consumer/fetch/rooms
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
    const sortedRooms = roomsRes.data;
  return {
    props: {sortedRooms}
  }
}
