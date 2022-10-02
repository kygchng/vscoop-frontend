import React from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function PostConfirmation() {
    const router = useRouter();

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