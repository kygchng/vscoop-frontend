import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useUser } from "@auth0/nextjs-auth0";

export default function PostConfirmation() {
    const router = useRouter();
    const { user, error, isLoading } = useUser();

    useEffect( () => {
        if (user) {
            console.log("you are loggied in ")
          } else {
            router.push("/api/auth/login")
          }
    }, [])
    const buttonClick = () => {
        router.push("/profile");
    }
    return (
        <div>
            <h1> Success! Your post has been created. Your post will be approved in 1-2 business days. </h1> 
            <Button
                    color="secondary"
                    variant="contained"
                    onClick = {buttonClick}
                >
                    Your Profile
                </Button>
        </div>
    );
}