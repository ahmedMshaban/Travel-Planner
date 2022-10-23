import citiesOptions from "../data/cities";
import type {
  FormInput,
  OriginCity,
  DestinationCity,
  City,
  Distance,
} from "../types/index.module";

export const filterCities = (inputValue: string) => {
  return citiesOptions.filter((city) => {
    return (city[0] as string).toLowerCase().includes(inputValue.toLowerCase());
  }) as City[];
};

export const citiesAPI = (inputValue: string) => {
  return new Promise<City[]>((resolve) => {
    setTimeout(() => {
      resolve(filterCities(inputValue));
    }, 1000);
  });
};

export const getCityOfOriginParams = (city: string | undefined) => {
  if (city) {
    const cityAsArray = city.split(",");
    return [cityAsArray[0], +cityAsArray[1], +cityAsArray[2]] as OriginCity;
  }
};

export const getDestinationsParam = (params: string | undefined) => {
  if (params) {
    const result = [] as DestinationCity;
    const destinations = params.split("|");

    destinations.forEach((destination) => {
      const destinationAsArray = destination.split(",");
      result?.push([
        destinationAsArray[0],
        +destinationAsArray[1],
        +destinationAsArray[2],
      ]);
    });

    return result;
  }
};

export const getDefaulDestinations = (params: DestinationCity) => {
  if (params && params.length > 0) {
    const result = [] as { city: City }[];
    params.forEach((destination) => {
      result.push({
        city: destination,
      });
    });

    return result;
  }
};

export const getSearchParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const params = {} as { [key: string]: string };

  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }

  return params;
};

export const convertToSearchParams = (data: FormInput) => {
  let searchParams = "/results?";
  const numberOfPassengers = `numberOfPassengers=${data.numberOfPassengers}`;
  const dateOfTrip = `dateOfTrip=${data.dateOfTrip}`;
  const cityOfOrigin = `cityOfOrigin=${data.cityOfOrigin.join(",")}`;
  let destinations = "destinations=";

  data.destinations.forEach((destination, index) => {
    destinations += destination.city.join(",");
    if (data.destinations.length - 1 !== index) {
      destinations += "|";
    }
  });

  searchParams += `${numberOfPassengers}&${dateOfTrip}&${cityOfOrigin}&${destinations}`;

  return searchParams;
};

export const haversineDistance = (
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
) => {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

  return finalDistance;
};

export const getTripDistance = (
  cityOfOrigin: string = "",
  destinations: string = ""
) => {
  return new Promise<Distance[]>((resolve, reject) => {
    setTimeout(() => {
      if (destinations.includes("Dijon") || !cityOfOrigin || !destinations) {
        reject({ error: "Something went wrong, try different directions." });
      } else {
        const distances = [];

        const cityOfOriginList = cityOfOrigin.split(",");
        const [cityOfOriginName, cityOfOriginLat, cityOfOriginLng] =
          cityOfOriginList;

        const destinationsList = getDestinationsParam(destinations);

        if (
          !cityOfOriginList ||
          !destinationsList ||
          destinationsList.length === 0
        )
          return;

        //First destinations information
        const [firstDestinationName, firstDestinationLat, firstDestinationLng] =
          destinationsList[0];

        // Get the distance between City of origin and first destination.
        const firstDistance = haversineDistance(
          [+cityOfOriginLat, +cityOfOriginLng],
          [+firstDestinationLat, +firstDestinationLng]
        );

        distances.push({
          from: cityOfOriginName,
          to: firstDestinationName,
          distance: firstDistance,
        });

        //Get distance between each distantion if any..
        if (destinationsList.length > 1) {
          destinationsList.forEach((destination, index) => {
            // Check if I'm not on the last index
            if (destinationsList.length - 1 !== index) {

              const [
                currentDestinationName,
                currentDestinationLat,
                currentDestinationLng,
              ] = destination;
              
              const [
                nextDestinationName,
                nextDestinationLat,
                nextdestinationLng,
              ] = destinationsList[index + 1];

              const distance = haversineDistance(
                [+currentDestinationLat, +currentDestinationLng],
                [+nextDestinationLat, +nextdestinationLng]
              );

              distances.push({
                from: currentDestinationName,
                to: nextDestinationName,
                distance: distance,
              });
            }
          });
        }

        resolve(distances);
      }
    }, 2000);
  });
};
