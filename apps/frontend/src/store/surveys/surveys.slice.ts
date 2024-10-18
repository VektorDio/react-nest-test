import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {IAnswer, ISurvey} from "../../types/types.ts";

// Define a type for the slice state
interface SurveysState {
    surveys: ISurvey[];
    answers: IAnswer[];
}

// Define the initial state using that type
const initialState: SurveysState = {
    surveys: [],
    answers: [],
}

export const counterSlice = createSlice({
    name: 'surveys',
    initialState,
    reducers: {
        setSurveys: (state, action) => {
            state.surveys = action.payload
        },
        setAnswers: (state, action) => {
            state.answers = action.payload
        }
    },
})

export const { setSurveys, setAnswers } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.surveys

export default counterSlice.reducer