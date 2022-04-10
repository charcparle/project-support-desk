import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add note for a ticket
export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ticketId, noteText}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.addNote(ticketId, noteText, token);
    } catch (error) {
        console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all notes for a ticket
export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNote.fulfilled, (state,action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.notes = state.notes.concat(action.payload);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
