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
        pushSurvey: (state, action) => {
            state.surveys.push(action.payload)
        },
        setAnswers: (state, action) => {
            state.answers = action.payload
        }
    },
})

export const { pushSurvey, setAnswers } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSurvey = (state: RootState) => state.surveys

export default counterSlice.reducer