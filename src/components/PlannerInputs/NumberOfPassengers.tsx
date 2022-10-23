import React from "react";
import classes from "./Inputs.module.css";
import { useFormContext } from "react-hook-form";

export const NumberOfPassengers: React.FC = () => {
  const { formState, register } = useFormContext(); 
  return (
    <div className={classes.fieldContainer}>
      <label htmlFor="numberOfPassengers">Number of Passengers</label>
      <input
        id="numberOfPassengers"
        type="number"
        aria-invalid={formState.errors.numberOfPassengers ? "true" : "false"}
        {...register("numberOfPassengers", {
          required: true,
          min: 1,
        })}
        placeholder="Number of Passengers"
      />
      {formState.errors.numberOfPassengers && (
        <span role="alert">Number of passengers is invalid.</span>
      )}
    </div>
  );
};
