import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import reducer from './auth';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;