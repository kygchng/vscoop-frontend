import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminPostCard from "./AdminPostCard";
import Grid from '@mui/material/Grid';

export default function AdminAccordion({roomsWithPosts}) {

    const roomSummary = roomsWithPosts.map( (r, index) => {
        console.log("index: ", index);
        var newIndex = index+1;
        console.log("room: ", r);
         const posts = r.postsJSON.map((p) => {
            return (
                <div>
                    <Grid item md={2}> <AdminPostCard post = {p} key = {p._id}/> </Grid>
                </div>
            )
        })

        console.log(`panel${newIndex}a-content`);
        console.log(`panel${newIndex}a-header`);
    
        return (
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${newIndex}a-content`}
                        id={`panel${newIndex}a-header`}
                        >
                        <Typography>{r.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    {posts}
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    })

  return (
    <div>
       {roomSummary}
    </div>
  );
}
