import React from "react";
import AsyncSelect from "react-select/async";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { citiesAPI } from "../../helpers/index";
import { FormInput } from "../../types/index.module";
import classes from "./Inputs.module.css";

export const Destinations: React.FC = () => {
  const { formState, control } = useFormContext<FormInput>();

  const { fields, append, remove } = useFieldArray({
    name: "destinations",
    control,
  });

  const destinationsTracker = useWatch({
    name: "destinations",
    control,
  });

  return (
    <div className={`${classes.fieldContainer} `}>
      {fields.map((field, index) => {
        return (
          <div className={`${classes.destinationSection}`} key={field.id}>
            <section className={`${classes.cities}`} key={field.id}>
              <label
                htmlFor={`destinations.${index}.city`}
                className={classes.hidden}
              >
                Destination City
              </label>
              <div className={`${classes.bullet}`}></div>
              <Controller
                control={control}
                name={`destinations.${index}.city` as const}
                rules={{
                  validate: {
                    validCity: (city) => {
                      return city[0] !== "";
                    },
                  },
                }}
                aria-invalid={
                  formState.errors.destinations?.[index]?.city
                    ? "true"
                    : "false"
                }
                render={({ field: { onChange, onBlur } }) => (
                  <AsyncSelect
                    id={`destinations.${index}.city` as const}
                    className={classes.citySelector}
                    cacheOptions
                    defaultValue={
                      destinationsTracker?.[index]?.city?.[0] !== ""
                        ? [destinationsTracker?.[index]?.city]
                        : null
                    }
                    loadOptions={citiesAPI}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option as string;
                      }
                      return option?.[0] as string;
                    }}
                    placeholder={"Choose destination..."}
                    openMenuOnClick={false}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />

              {formState.errors.destinations?.[index]?.city && (
                <span role="alert">Destination city is required.</span>
              )}

              {/* We need to at least have one destination */}
              {fields.length > 1 && (
                <button
                  className={classes.delete}
                  type="button"
                  onClick={() => remove(index)}
                >
                  <img src="./delete.png" alt="Delete Destination" />
                </button>
              )}
            </section>
          </div>
        );
      })}

      {/* Add new destination if and only if we already have a non empty destination*/}
      {destinationsTracker[destinationsTracker.length - 1].city[0] !== "" && (
        <button
          className={classes.add}
          type="button"
          onClick={() =>
            append({
              city: ["", 0, 0],
            })
          }
        >
          <img src="./add.png" alt="Add Destination" />
          Add Destination
        </button>
      )}
    </div>
  );
};
