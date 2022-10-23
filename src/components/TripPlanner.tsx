import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  CityOfOrigin,
  Destinations,
  DateOfTrip,
  NumberOfPassengers,
} from "./PlannerInputs";
import {
  getCityOfOriginParams,
  getDestinationsParam,
  getDefaulDestinations,
  getSearchParams,
  convertToSearchParams,
} from "../helpers/index";
import classes from "./TripPlanner.module.css";
import type { FormInput, SearchParams } from "../types/index.module";

const TripPlanner: React.FC = () => {
  //?numberOfPassengers=2&dateOfTrip=2022-12-10&cityOfOrigin=Marseille,43.296482,5.36978&destinations=Toulouse,43.604652,1.444209|Nice,43.710173,7.261953
  const searchParams: SearchParams = getSearchParams();
  const cityOriginParams = getCityOfOriginParams(searchParams.cityOfOrigin);
  const destinationsParams = getDestinationsParam(searchParams.destinations);
  const navigate = useNavigate();

  const methods = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      cityOfOrigin: cityOriginParams || ["", 0, 0],
      dateOfTrip: searchParams.dateOfTrip || "", // yyyy-month-day
      numberOfPassengers: parseInt(searchParams.numberOfPassengers ?? "1", 10),
      destinations: getDefaulDestinations(destinationsParams) || [
        { city: ["", 0, 0] },
      ],
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    navigate(convertToSearchParams(data));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={classes.form}>
        <CityOfOrigin cityOriginParams={cityOriginParams} />

        <Destinations />

        <DateOfTrip />

        <NumberOfPassengers />

        <input
          type="submit"
          disabled={methods.formState.isSubmitted && !methods.formState.isValid}
          value="Search"
          className={classes.submit}
        />
      </form>
    </FormProvider>
  );
};

export default TripPlanner;
