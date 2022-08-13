import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';


import styles from './RoomCard.module.css';

export default function ActionAreaCard({room}) {

    const { user, error, isLoading } = useUser();
    const router = useRouter();

    const checkUser = (room) => {
        console.log("you clicked to check user");
        console.log("this is the room", room);

        if (user) {
            console.log("you are loggied in ")
            var roomIdStr = String(room._id)
            localStorage.setItem('roomIdStr', roomIdStr);
            router.push('/room')
        } else {
            router.push("/api/auth/login")
        }
    }

    return (
                <Card sx={{ width: 240 }}>
                    <CardActionArea onClick = {() => checkUser(room)}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={room.picture}
                            alt={room.name}
                        />
                        <Typography gutterBottom variant="h5" component="div">
                            {room.name}
                        </Typography>
                    </CardActionArea>
                </Card>
    );
}