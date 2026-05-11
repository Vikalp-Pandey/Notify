import { createNote, deleteNote, getAllNotes, getNote, updateNote } from "@/controllers/notes.controller";
import { Hono } from "hono";

const notesRoutes = new Hono();

notesRoutes.post("/",createNote)
notesRoutes.get("/",getAllNotes)
notesRoutes.get("/:id",getNote)
notesRoutes.put("/:id",updateNote)
notesRoutes.delete("/:id",deleteNote)
export default notesRoutes;
