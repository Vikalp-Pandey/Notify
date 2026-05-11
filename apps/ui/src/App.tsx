import { useState } from "react";
import type { Note } from "./api/notes.api";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";


export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleCreate = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className="app">
      {/* Animated background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <header className="app-header" id="app-header">
        <div className="header-content">
          <div className="logo-group">
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h1 className="app-title">Notify</h1>
          </div>
          <button className="btn btn-primary btn-create" onClick={handleCreate} id="create-note-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Note
          </button>
        </div>
      </header>

      <main className="app-main">
        <NoteList onEdit={handleEdit} />
      </main>

      {showForm && (
        <NoteForm
          editingNote={editingNote}
          onCancel={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
