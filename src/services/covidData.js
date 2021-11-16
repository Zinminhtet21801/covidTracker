import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api";
const headers = {
  "x-rapidapi-host": process.env.REACT_APP_COVID_HOST,
  "x-rapidapi-key": process.env.REACT_APP_COVID_KEY,
};

const createRequest = (url) => ({ url, headers });
export const covidApi = createApi({
  reducerPath: "covidApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCovidGlobalApi: builder.query({
      query: ({countryName, iso}) =>
        createRequest(
          countryName
            ? `/npm-covid-data/country-report-iso-based/${countryName}/${iso}`
            : "/npm-covid-data/world"
        ),
    }),
    getCountryNames: builder.query({
      query: () => createRequest("/npm-covid-data/countries-name-ordered"),
    }),
    getSixMonthData : builder.query({
      query : (country) => createRequest(`/covid-ovid-data/sixmonth/${country}`)
    })
  }),
});

export const { useGetCovidGlobalApiQuery, useGetCountryNamesQuery, useGetSixMonthDataQuery } = covidApi;
