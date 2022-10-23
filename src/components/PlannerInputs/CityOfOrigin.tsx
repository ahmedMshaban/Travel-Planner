import React from "react";
import AsyncSelect from "react-select/async";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { citiesAPI } from "../../helpers/index";
import type { FormInput, OriginCity } from "../../types/index.module";
import classes from "./Inputs.module.css";

type CityOriginProps = {
  cityOriginParams: OriginCity;
};

export const CityOfOrigin: React.FC<CityOriginProps> = (props) => {
  const { cityOriginParams } = props;
  const { formState, control } = useFormContext<FormInput>();

  return (
    <div className={`${classes.fieldContainer} ${classes.cities}`}>
      <label htmlFor="cityOfOrigin" className={classes.hidden}>Starting City</label>
      <div className={classes.bullet}></div>
      <Controller
        control={control}
        name="cityOfOrigin"
        rules={{
          validate: {
            validCity: (city) => {
              return city[0] !== "";
            },
          },
        }}
        aria-invalid={formState.errors.cityOfOrigin ? "true" : "false"}
        render={({ field: { onChange, onBlur } }) => (
          <AsyncSelect
            id="cityOfOrigin"
            className={classes.citySelector}
            cacheOptions
            defaultValue={cityOriginParams ? [cityOriginParams]: null}
            loadOptions={citiesAPI}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option as string;
              }
              return option?.[0] as string;
            }}
            placeholder={"Choose starting city"}
            openMenuOnClick={false}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {formState.errors.cityOfOrigin && (
        <span role="alert">Starting city is required.</span>
      )}
    </div>
  );
};
