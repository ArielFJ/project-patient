import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customization/customizationSlice';
import patientReducer from './patients/patientSlice';

// ==============================|| REDUX - MAIN STORE ||============================== //

// const store = createStore(reducer);
const store = configureStore({
    reducer: {
        customization: customizationReducer,
        patient: patientReducer
    }
});
// const persister = 'Free';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { store };
