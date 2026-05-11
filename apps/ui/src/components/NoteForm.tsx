import { useForm } from "react-hook-form";
import type { Note, NoteFormData } from "../api/notes.api";
import { useNotes } from "../hooks/useNotes";

interface NoteFormProps {
  editingNote?: Note | null;
  onCancel: () => void;
  onSuccess: () => void;
}

/**
 * Note form component using React Hook Form.
 * Supports both create and edit modes based on whether `editingNote` is provided.
 */
export default function NoteForm({ editingNote, onCancel, onSuccess }: NoteFormProps) {
  const isEditing = !!editingNote;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NoteFormData>({
    defaultValues: {
      title: editingNote?.title ?? "",
      content: editingNote?.content ?? "",
    },
  });

  const { createNotes, updateNotes } = useNotes();

  const onSubmit = async (formData: NoteFormData) => {
    try {
      if (isEditing && editingNote) {
        await updateNotes.mutateAsync({ id: editingNote._id, noteData: formData });
      } else {
        await createNotes.mutateAsync(formData);
      }
      reset();
      onSuccess();
    } catch {
      // Error is handled by mutation state
    }
  };

  const mutation = isEditing ? updateNotes : createNotes;

  return (
    <div className="note-form-overlay" onClick={onCancel}>
      <form
        className="note-form"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        id="note-form"
      >
        <h2 className="form-title">{isEditing ? "Edit Note" : "Create Note"}</h2>

        <div className="form-group">
          <label htmlFor="note-title">Title</label>
          <input
            id="note-title"
            type="text"
            placeholder="Enter note title..."
            className={errors.title ? "input-error" : ""}
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Title must be at least 3 characters" },
              maxLength: { value: 50, message: "Title must be at most 50 characters" },
            })}
          />
          {errors.title && <span className="error-message">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="note-content">Content</label>
          <textarea
            id="note-content"
            placeholder="Write your note content..."
            rows={5}
            className={errors.content ? "input-error" : ""}
            {...register("content", {
              required: "Content is required",
              minLength: { value: 1, message: "Content cannot be empty" },
              maxLength: { value: 1000, message: "Content must be at most 1000 characters" },
            })}
          />
          {errors.content && <span className="error-message">{errors.content.message}</span>}
        </div>

        {mutation.isError && (
          <div className="mutation-error">
            Something went wrong. Please try again.
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} id="cancel-btn">
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || mutation.isPending}
            id="submit-btn"
          >
            {mutation.isPending ? (
              <span className="btn-loading">
                <span className="spinner" />
                {isEditing ? "Updating..." : "Creating..."}
              </span>
            ) : (
              isEditing ? "Update Note" : "Create Note"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
