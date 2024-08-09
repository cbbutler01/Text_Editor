import { openDB } from 'idb';

const initdb = async () =>
  openDB('nate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('nate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('nate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    const db = await openDB('nate', 1);
    const tx = db.transcription('nate', 'readOnly');
    const store = tx.objectStore('nate');

    const result = await store.put({ content });
    await tx.done;

    console.log('Content added to database:', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    const db = await openDB('nate', 1);
    const tx = db.transcription('nate', 'readOnly');
    const store = tx.objectStore('nate');

    const allContent = await store.getAll();
    await tx.done;

    console.log('Retrieved content from database:', allContent);
    return allContent;
};

initdb();