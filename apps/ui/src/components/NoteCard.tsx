import type { Note } from "../api/notes.api";
import { useNotes } from "../hooks/useNotes";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
}

/**
 * Individual note card with glassmorphism styling.
 * Displays title, content, timestamp, and action buttons (edit/delete).
 */
export default function NoteCard({ note, onEdit }: NoteCardProps) {
  const { deleteNotes } = useNotes();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNotes.mutate(note._id);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`note-card ${deleteNotes.isPending ? "deleting" : ""}`} id={`note-${note._id}`}>
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button
            className="btn-icon btn-edit"
            onClick={() => onEdit(note)}
            title="Edit note"
            id={`edit-${note._id}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={handleDelete}
            disabled={deleteNotes.isPending}
            title="Delete note"
            id={`delete-${note._id}`}
          >
            {deleteNotes.isPending ? (
              <span className="spinner spinner-sm" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-meta">
        <span className="note-date">{formatDate(note.updatedAt)}</span>
      </div>
    </div>
  );
}
