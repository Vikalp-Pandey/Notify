import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL
console.log(baseURL);

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  title: string;
  content: string;
}

export const fetchNotes = async () => {
  const { data } = await api.get("/notes");
  console.log(data);
  return data.notes;  // API returns { notes: [...] }, extract the array
};

export const fetchNote = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data.note;
};

export const createNote = async (noteData: NoteFormData)=> {
  const { data } = await api.post("/notes", noteData);
  return data;
};

export const updateNote = async ({
  id,
  noteData,
}: {
  id: string;
  noteData: NoteFormData;
}) => {
  const { data } = await api.put(`/notes/${id}`, noteData);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};
