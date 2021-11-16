import { configureStore } from "@reduxjs/toolkit"
import { covidApi } from "../services/covidData"

export const store =  configureStore({
    reducer : {
        [covidApi.reducerPath] : covidApi.reducer
    }
})