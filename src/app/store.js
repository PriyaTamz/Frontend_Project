import { configureStore } from '@reduxjs/toolkit';
import adminRegisterReducer from '../features/authentication/AdminRegisterSlice';
import addAgentReducer from '../features/authentication/AddAgentSlice';  

const store = configureStore({
  reducer: {
    adminRegister: adminRegisterReducer,
    addAgent: addAgentReducer
  },
});

export default store;