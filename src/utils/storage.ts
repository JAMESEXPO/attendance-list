import { Person, Item, AttendanceSession } from '../types';

const STORAGE_KEYS = {
  PEOPLE: 'attendance_people',
  ITEMS: 'attendance_items',
  SESSIONS: 'attendance_sessions',
};

export const storage = {
  // People management
  getPeople: (): Person[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PEOPLE);
    return data ? JSON.parse(data).map((p: Person) => ({
      ...p,
      createdAt: new Date(p.createdAt)
    })) : [];
  },

  savePeople: (people: Person[]) => {
    localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(people));
  },

  // Items management
  getItems: (): Item[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ITEMS);
    return data ? JSON.parse(data).map((i: Item) => ({
      ...i,
      createdAt: new Date(i.createdAt)
    })) : [];
  },

  saveItems: (items: Item[]) => {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  },

  // Sessions management
  getSessions: (): AttendanceSession[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data).map((s: AttendanceSession) => ({
      ...s,
      date: new Date(s.date),
      records: s.records.map(r => ({
        ...r,
        timestamp: new Date(r.timestamp)
      }))
    })) : [];
  },

  saveSessions: (sessions: AttendanceSession[]) => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  // Initialize with sample data if empty
  initializeSampleData: () => {
    const people = storage.getPeople();
    const items = storage.getItems();

    if (people.length === 0) {
      const samplePeople: Person[] = [
        { id: '1', name: 'John Smith', createdAt: new Date() },
        { id: '2', name: 'Sarah Johnson', createdAt: new Date() },
        { id: '3', name: 'Mike Davis', createdAt: new Date() },
        { id: '4', name: 'Emily Brown', createdAt: new Date() },
      ];
      storage.savePeople(samplePeople);
    }

    if (items.length === 0) {
      const sampleItems: Item[] = [
        { id: '1', name: 'Morning Meeting', createdAt: new Date() },
        { id: '2', name: 'Training Session', createdAt: new Date() },
        { id: '3', name: 'Team Lunch', createdAt: new Date() },
        { id: '4', name: 'Project Review', createdAt: new Date() },
      ];
      storage.saveItems(sampleItems);
    }
  }
};