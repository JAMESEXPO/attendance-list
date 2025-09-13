import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users, Package } from 'lucide-react';
import { Person, Item } from '../types';
import { useAttendance } from '../hooks/useAttendance';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingSpinner from '../components/LoadingSpinner';

const ManagementPage: React.FC = () => {
  const {
    people,
    items,
    loading,
    addPerson,
    updatePerson,
    deletePerson,
    addItem,
    updateItem,
    deleteItem,
  } = useAttendance();

  const [activeTab, setActiveTab] = useState<'people' | 'items'>('people');
  const [newPersonName, setNewPersonName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    action: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: () => {},
  });

  if (loading) return <LoadingSpinner />;

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      addPerson(newPersonName);
      setNewPersonName('');
    }
  };

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem(newItemName);
      setNewItemName('');
    }
  };

  const handleUpdatePerson = () => {
    if (editingPerson && editingPerson.name.trim()) {
      updatePerson(editingPerson.id, editingPerson.name);
      setEditingPerson(null);
    }
  };

  const handleUpdateItem = () => {
    if (editingItem && editingItem.name.trim()) {
      updateItem(editingItem.id, editingItem.name);
      setEditingItem(null);
    }
  };

  const confirmDeletePerson = (person: Person) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Person',
      message: `Are you sure you want to delete "${person.name}"? This will also remove all their attendance records.`,
      action: () => {
        deletePerson(person.id);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  const confirmDeleteItem = (item: Item) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Item',
      message: `Are you sure you want to delete "${item.name}"? This will also remove all related attendance records.`,
      action: () => {
        deleteItem(item.id);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
    });
  };

  return (
    <div className="pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab('people')}
            className={`flex-1 flex items-center justify-center py-4 ${
              activeTab === 'people'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            People ({people.length})
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`flex-1 flex items-center justify-center py-4 ${
              activeTab === 'items'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Package className="w-5 h-5 mr-2" />
            Items ({items.length})
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'people' ? (
          <div className="space-y-4">
            {/* Add Person Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Add New Person</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  placeholder="Enter person's name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPerson()}
                />
                <button
                  onClick={handleAddPerson}
                  disabled={!newPersonName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>
            </div>

            {/* People List */}
            <div className="space-y-2">
              {people.map((person) => (
                <div key={person.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  {editingPerson?.id === person.id ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={editingPerson.name}
                        onChange={(e) => setEditingPerson({ ...editingPerson, name: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleUpdatePerson()}
                        autoFocus
                      />
                      <button
                        onClick={handleUpdatePerson}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPerson(null)}
                        className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{person.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingPerson(person)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDeletePerson(person)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {people.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No people added yet. Add your first person above.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Add Item Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Add New Item</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter item name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                />
                <button
                  onClick={handleAddItem}
                  disabled={!newItemName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  {editingItem?.id === item.id ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleUpdateItem()}
                        autoFocus
                      />
                      <button
                        onClick={handleUpdateItem}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDeleteItem(item)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No items added yet. Add your first item above.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.action}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        danger={true}
        confirmText="Delete"
      />
    </div>
  );
};

export default ManagementPage;