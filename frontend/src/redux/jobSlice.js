import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job"
    ,
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        searchJobByText: "",
        singleJob: null,
        allAppliedJobs: [],
        searchedQuery: "",

    },



    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        }, 
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }
    }
});

export const {
    setAllJobs,
    setSearchJobByText,
    setSearchedQuery,
    setSingleJob,
    setAllAdminJobs,
    setAllAppliedJobs } = jobSlice.actions;

export default jobSlice.reducer;