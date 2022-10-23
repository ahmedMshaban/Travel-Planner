import React from "react";
import classes from "./Home.module.css";
import TripPlanner from "../components/TripPlanner";

const Home: React.FC = () => {
  return (
    <div className={classes.homeLayout}>
      <div className={`${classes.innerLayout}`}>
        <h1>This year I'm going to...</h1>
        <TripPlanner />
      </div>
    </div>
  );
};

export default Home;
