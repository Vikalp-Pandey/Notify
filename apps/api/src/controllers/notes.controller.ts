import { Note } from "@/models/note.model";
import { Context } from "hono";

export const createNote = async(c:Context)=>{
    const {title,content} = await c.req.json();
    if(!title||!content){
        return c.json({message:"All Fields are required"},400);
    }
    await Note.create({title,content});
    return c.json({message:"Note created successfully"},200)
}

export const updateNote = async(c:Context)=>{
    const id = c.req.param("id");
    const note = await Note.findById(id);
    if(!note){
        return c.json({message:"Note not found"},404);
    }
    const {title,content} = await c.req.json();
    if (title!=note.title){
        note.title = title;
    }
    if (content!=note.content){
        note.content = content;
    }
    await note.save();
    return c.json({message:"Note updated successfully"},200)    
}

export const deleteNote = async(c:Context)=>{
    const id = c.req.param("id");
    const note = await Note.findById(id);
    if(!note){
        return c.json({message:"Note not found"},404);
    }
    await Note.deleteOne(note);
    return c.json({message:"Note deleted successfully"},200)    
}

export const getNote = async(c:Context)=>{
    const id = c.req.param("id");
    const note = await Note.findById(id);
    if(!note){
        return c.json({message:"Note not found"},404);
    }
    return c.json({note},200)    
}

export const getAllNotes = async(c:Context)=>{
    const notes = await Note.find();
    return c.json({notes},200)    
}   