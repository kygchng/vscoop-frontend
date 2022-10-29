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
                <h1 className={classes.title}> V.Scoop </h1>
                <h3>
                 Your daily virtual art museum digest. 
                </h3>
                <h3> Discover, distribute, and discuss. </h3>
                <br />
                </GridItem>
            </GridContainer>
           
            </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div >
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h4> Visit Our Most Popular Rooms </h4>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        
      </div>
    );
}
  