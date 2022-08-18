import { AirportDTO } from 'types/AirportType';

const API_ID = process.env.REACT_APP_API_ID as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

type GetAirportsResponse = {
  airports: AirportDTO[];
};

export async function getAirports(): Promise<AirportDTO[]> {
  const response = await fetch(
    `/flex/airports/rest/v1/json/countryCode/US?appId=${API_ID}&appKey=${API_KEY}`,
    {
      method: 'GET',
    }
  );

  if (response.ok) {
    const { airports }: GetAirportsResponse = await response.json();
    return airports
      .filter(ap => ap.active && ap.iata)
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
  }

  throw new Error('There was an error in the request');
}
