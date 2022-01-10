import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialPageinationState = {
  currentPage: 1,
  totalPages: null,
  nextPage: "",
  prevPage: "",
  prevURL: "",
  nextURL: "",
  
};

const initialHomeButtonColor={
  homeButtonActive:true,
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState: initialPageinationState,
  reducers: {
    changeCurrentPage(state, acion) {
      state.currentPage = acion.payload;
    },
    changeTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
    setprevPage(state, action) {
      state.prevPage = action.payload;
    },
    setPrevURL(state,action){
         state.prevURL=action.payload;
    },
    setNextURL(state,action){
         state.nextURL=action.payload
    },
    
  },
});

const homeButtonSclice = createSlice({
  name:'homebutton',
  initialState:initialHomeButtonColor,
  reducers:{
    setHomeButtonActive(state,action){
      state.homeButtonActive= action.payload;
    }
  }
})

const store = configureStore({
  reducer: { pagination: paginationSlice.reducer, homeButton:homeButtonSclice.reducer }
});
export const paginationActions = paginationSlice.actions;
export const homeButtonActions = homeButtonSclice.actions;
export default store;
