import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Parallax from "/components/Parallax/Parallax.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";

import styles from "../styles/jss/nextjs-material-kit/pages/landingPage.js";

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    return (
      <div>
        <Parallax filter responsive image="https://media.istockphoto.com/photos/modern-abstract-background-picture-id1178390169?b=1&k=20&m=1178390169&s=170667a&w=0&h=wMuCApdJNQww4TaiO19Z1haAlBhI2n5wvmx4gMgkyP4=">
            <div className={classes.container}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4>
                    Every landing page needs a small description after the big bold
                    title, that{"'"}s why we added this text here. Add here all the
                    information that can make you or your product create the first
                    impression.
                </h4>
                <br />
                </GridItem>
            </GridContainer>
           
            </div>
        </Parallax>
      </div>
    );
}
  