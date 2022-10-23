import React from "react";
import classes from "./Inputs.module.css";
import { useFormContext } from "react-hook-form";

export const DateOfTrip: React.FC = (props) => {
  const { formState, register } = useFormContext(); 

  return (
    <div className={classes.fieldContainer}>
      <label htmlFor="dateOfTrip">Date of Trip</label>
      <input
        type="date"
        aria-invalid={formState.errors.dateOfTrip ? "true" : "false"}
        {...register("dateOfTrip", {
          required: true,
          validate: {
            dateInTheFuture: (date) => {
              const today = new Date().toISOString().slice(0, 10);
              const pickedDate = new Date(date).toISOString().slice(0, 10);
              return today <= pickedDate;
            },
          },
        })}
        placeholder="Date of trip"
      />
      {formState.errors.dateOfTrip && <span role="alert">Date of trip is invalid.</span>}
    </div>
  );
};
