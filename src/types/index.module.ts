export type FormInput = {
  cityOfOrigin: [string, number, number];
  destinations: {
    city: [string, number, number];
  }[];
  dateOfTrip: string;
  numberOfPassengers: number;
};

export type SearchParams = {
  cityOfOrigin?: string
  destinations?: string
  dateOfTrip?: string;
  numberOfPassengers?: string;
}

export type City = [string, number, number];

export type OriginCity = City | undefined;

export type DestinationCity = City[] | undefined;

export type Distance = {
  from: string;
  to: string;
  distance: number;
};
