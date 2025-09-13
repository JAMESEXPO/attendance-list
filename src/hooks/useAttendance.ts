import { useState, useEffect } from 'react';
import { Person, Item, AttendanceSession, AttendanceData, AttendanceRecord } from '../types';
import { storage } from '../utils/storage';

export const useAttendance = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [sessions, setSessions] = useState<AttendanceSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    storage.initializeSampleData();
    setPeople(storage.getPeople());
    setItems(storage.getItems());
    setSessions(storage.getSessions());
    setLoading(false);
  };

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: name.trim(),
      createdAt: new Date(),
    };
    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    storage.savePeople(updatedPeople);
  };

  const updatePerson = (id: string, name: string) => {
    const updatedPeople = people.map(p => 
      p.id === id ? { ...p, name: name.trim() } : p
    );
    setPeople(updatedPeople);
    storage.savePeople(updatedPeople);
  };

  const deletePerson = (id: string) => {
    const updatedPeople = people.filter(p => p.id !== id);
    setPeople(updatedPeople);
    storage.savePeople(updatedPeople);
    
    // Also remove from sessions
    const updatedSessions = sessions.map(session => ({
      ...session,
      records: session.records.filter(r => r.personId !== id)
    }));
    setSessions(updatedSessions);
    storage.saveSessions(updatedSessions);
  };

  const addItem = (name: string) => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: name.trim(),
      createdAt: new Date(),
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    storage.saveItems(updatedItems);
  };

  const updateItem = (id: string, name: string) => {
    const updatedItems = items.map(i => 
      i.id === id ? { ...i, name: name.trim() } : i
    );
    setItems(updatedItems);
    storage.saveItems(updatedItems);
  };

  const deleteItem = (id: string) => {
    const updatedItems = items.filter(i => i.id !== id);
    setItems(updatedItems);
    storage.saveItems(updatedItems);
    
    // Also remove from sessions
    const updatedSessions = sessions.map(session => ({
      ...session,
      records: session.records.filter(r => r.itemId !== id)
    }));
    setSessions(updatedSessions);
    storage.saveSessions(updatedSessions);
  };

  const saveAttendance = (attendanceData: AttendanceData) => {
    const now = new Date();
    const records: AttendanceRecord[] = [];
    
    // Convert attendance data to records
    Object.entries(attendanceData).forEach(([personId, personItems]) => {
      Object.entries(personItems).forEach(([itemId, isPresent]) => {
        if (isPresent) {
          records.push({
            id: `${personId}-${itemId}-${now.getTime()}`,
            personId,
            itemId,
            timestamp: now,
          });
        }
      });
    });

    const newSession: AttendanceSession = {
      id: now.getTime().toString(),
      date: now,
      records,
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    storage.saveSessions(updatedSessions);
  };

  const getItemStatistics = () => {
    const stats = items.map(item => {
      const count = sessions.reduce((total, session) => {
        return total + session.records.filter(r => r.itemId === item.id).length;
      }, 0);
      
      return {
        item,
        count,
        percentage: people.length > 0 ? Math.round((count / (people.length * sessions.length)) * 100) : 0
      };
    });

    return stats.sort((a, b) => b.count - a.count);
  };

  return {
    people,
    items,
    sessions,
    loading,
    addPerson,
    updatePerson,
    deletePerson,
    addItem,
    updateItem,
    deleteItem,
    saveAttendance,
    getItemStatistics,
    loadData,
  };
};