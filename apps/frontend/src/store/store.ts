import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from './surveys/surveys.slice';
import userReducer from './user/user.slice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        surveys: surveyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;