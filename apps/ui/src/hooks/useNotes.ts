import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, updateNote, deleteNote } from "../api/notes.api";


export const useNotes = () => {
  const queryClient = useQueryClient();

  const getNotes = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const createNotes = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Refetch the notes to update the UI
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const updateNotes = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      // Refetch the notes to update the UI
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteNotes = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      // Refetch the notes to update the UI
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    getNotes,
    createNotes,
    updateNotes,
    deleteNotes,
  };
};
