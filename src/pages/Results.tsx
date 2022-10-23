import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import type { Distance } from "../types/index.module";
import { getSearchParams, getTripDistance } from "../helpers/index";
import Loader from "../components/UI/Loader";
import { SearchParams } from "../types/index.module";

const Results: React.FC = () => {
  const [distances, setDistances] = useState<Distance[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams: SearchParams = getSearchParams();
  let totalDistance = 0;

  useEffect(() => {
    getTripDistance(searchParams.cityOfOrigin, searchParams.destinations)
      .then((distance) => {
        if (distance) {
          setDistances(distance);
        } else {
          throw new Error("Something went wrong..");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams.cityOfOrigin, searchParams.destinations]);

  if (loading) {
    return (
      <div className={`container' ${classes.loader}`}>
        <Loader />
      </div>
    );
  }

  if (distances.length > 0) {
    return (
      <div className={`container`}>
        <h1>Trip Information</h1>
        <div>
          <p>
            Number of passengers: <strong> {searchParams?.numberOfPassengers}</strong>
          </p>
          <p>
            Date of the trip: <strong>{searchParams?.dateOfTrip}</strong>
          </p>
          <table className={`${classes.table} ${classes.tableCart}`}>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              <>
                {distances.map((distance, index) => {
                  const currentDistance = Math.trunc(distance.distance)
                  totalDistance += currentDistance;
                  return (
                    <tr key={`${distance.distance}+${index}`}>
                      <td>{distance.from}</td>
                      <td>{distance.to}</td>
                      <td>{currentDistance} km</td>
                    </tr>
                  );
                })}
              </>
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th className={classes.cartHighlight}>Total Dsiatnce</th>
                <th className={classes.cartHighlight}>{totalDistance} km</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${classes.notFound}`}>
      <h1>Something went wrong in our system</h1>
      <img src="./result_not_found.svg" alt="Something went wrong" />
    </div>
  );
};

export default Results;
