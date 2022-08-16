const API_ID = process.env.REACT_APP_API_ID as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;
const baseUrl = process.env.REACT_APP_API_URL as string;

export interface AirportDTO {
  fs: string;
  iata: string;
  icao: string;
  faa: string;
  name: string;
  street1: string;
  city: string;
  cityCode: string;
  stateCode: string;
  postalCode: number;
  countryCode: string;
  countryName: string;
  regionName: string;
  timeZoneRegionName: string;
  weatherZone: string;
  localTime: string;
  utcOffsetHours: number;
  latitude: number;
  longitude: number;
  elevationFeet: number;
  classification: number;
  active: boolean;
}

type GetAirportsResponse = {
  airports: AirportDTO[];
};

export async function getAirports(): Promise<GetAirportsResponse> {
  const response = await fetch(
    `${baseUrl}/flex/airports/rest/v1/json/countryCode/US?appId=${API_ID}&appKey=${API_KEY}`,
    {
      method: 'GET',
    }
  );

  if (response.ok) {
    return response.json();
  }

  throw new Error('There was an error in the request');
}
