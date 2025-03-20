import { createSlice } from "@reduxjs/toolkit";

export const AddAgentSlice = createSlice({
    name: "addAgent",
    initialState: {
        name: "",
        email: "",
        number: "",
        password: "",
        agents: [],
        error: ""
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setNumber: (state, action) => {
            state.number = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setAgents: (state, action) => {
            state.agents = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setName, setEmail, setNumber, setPassword, setAgents, setError } = AddAgentSlice.actions;

export const selectName = state => state.addAgent.name;
export const selectEmail = state => state.addAgent.email;
export const selectNumber = state => state.addAgent.number;
export const selectPassword = state => state.addAgent.password;
export const selectAgents = state => state.addAgent.agents;
export const selectError = state => state.addAgent.error;

export default AddAgentSlice.reducer;
