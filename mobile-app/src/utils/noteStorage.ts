import * as SecureStore
from
'expo-secure-store';

const NOTES_KEY =
  'cnmaster_notes';

export interface Note {
  id:
    string;

  topic:
    string;

  content:
    string;

  createdAt:
    number;

  pinned?:
    boolean
}

export const getNotes =
  async () => {
    const data =
      await SecureStore.getItemAsync(
        NOTES_KEY
      );

    return data
      ? JSON.parse(
          data
        )
      : [];
  };

export const saveNote =
  async (
    note: Note
  ) => {
    const notes =
      await getNotes();

    await SecureStore.setItemAsync(
      NOTES_KEY,

      JSON.stringify(
        [
          note,
          ...notes,
        ]
      )
    );
  };

export const clearNotes =
  async () => {
    await SecureStore.deleteItemAsync(
      NOTES_KEY
    );
  };

export const deleteNote =
  async (
    id: string
  ) => {
    const notes =
      await getNotes();

    const filtered =
      notes.filter(
        (
          note: Note
        ) =>
          note.id !==
          id
      );

    await SecureStore.setItemAsync(
      NOTES_KEY,
      JSON.stringify(
        filtered
      )
    );
  };

export const updateNote =
  async (
    updated:
      Note
  ) => {
    const notes =
      await getNotes();

    const updatedNotes =
      notes.map(
        (
          note: Note
        ) =>
          note.id ===
          updated.id
            ? updated
            : note
      );

    await SecureStore.setItemAsync(
      NOTES_KEY,
      JSON.stringify(
        updatedNotes
      )
    );
  };

export const togglePin =
  async (
    id: string
  ) => {
    const notes =
      await getNotes();

    const updated =
      notes.map(
        (
          note: Note
        ) =>
          note.id ===
          id
            ? {
                ...note,
                pinned:
                  !note.pinned,
              }
            : note
      );

    await SecureStore.setItemAsync(
      NOTES_KEY,
      JSON.stringify(
        updated
      )
    );

    return updated;
  };

export const getNoteStats =
  async () => {
    const notes =
      await getNotes();

    const topics =
      new Set(
        notes.map(
          (
            note: Note
          ) =>
            note.topic
        )
      );

    const pinned =
      notes.filter(
        (
          note: Note
        ) =>
          note.pinned
      );

    return {
      total:
        notes.length,

      topics:
        topics.size,

      pinned:
        pinned.length,
    };
  };