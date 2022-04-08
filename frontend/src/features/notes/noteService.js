import axios from "axios";

const API_URL = "/api/tickets";

// Add new note for a ticket
const addNote = async (note, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, note, config);
  return response.data;
};

// Get all notes for a ticket
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL+`/${ticketId}/notes`, config);
  return response.data;
};

const noteService = { addNote, getNotes };

export default noteService;
