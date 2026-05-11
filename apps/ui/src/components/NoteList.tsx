import type { Note } from "../api/notes.api";
import { useNotes } from "../hooks/useNotes";
import NoteCard from "./NoteCard";

interface NoteListProps {
  onEdit: (note: Note) => void;
}


export default function NoteList({ onEdit }: NoteListProps) {
  const { getNotes } = useNotes();
  console.log(getNotes);
  

  if (getNotes.isLoading) {
    return (
      <div className="state-container" id="notes-loading">
        <div className="loading-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-text" />
              <div className="skeleton-line skeleton-text short" />
              <div className="skeleton-line skeleton-meta" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (getNotes.isError) {
    return (
      <div className="state-container" id="notes-error">
        <div className="state-card error">
          <div className="state-icon">⚠️</div>
          <h3>Failed to load notes</h3>
          <p>{getNotes.error instanceof Error ? getNotes.error.message : "An unexpected error occurred"}</p>
          <button className="btn btn-primary" onClick={() => getNotes.refetch()} id="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!getNotes.data || getNotes.data.length === 0) {
    return (
      <div className="state-container" id="notes-empty">
        <div className="state-card empty">
          <div className="state-icon">📝</div>
          <h3>No notes yet</h3>
          <p>Create your first note to get started!</p>
        </div>
      </div>
    );
  }  
  return (
    <div className="notes-grid" id="notes-list">
      {getNotes.data.map((note) => (
        <NoteCard key={note._id} note={note} onEdit={onEdit} />
      ))}
    </div>
  );
}
