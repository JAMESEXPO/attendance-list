import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { AttendanceData } from '../types';
import { useAttendance } from '../hooks/useAttendance';
import { Language, useTranslation } from '../utils/i18n';
import LoadingSpinner from '../components/LoadingSpinner';
import NameBox from '../components/NameBox';

interface AttendancePageProps {
  language: Language;
}

const AttendancePage: React.FC<AttendancePageProps> = ({ language }) => {
  const { people, items, loading, saveAttendance } = useAttendance();
  const { t } = useTranslation(language);
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Initialize attendance data structure
    const initialData: AttendanceData = {};
    people.forEach(person => {
      initialData[person.id] = {};
      items.forEach(item => {
        initialData[person.id][item.id] = false;
      });
    });
    setAttendanceData(initialData);
  }, [people, items]);

  const toggleAttendance = (personId: string, itemId: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [personId]: {
        ...prev[personId],
        [itemId]: !prev[personId]?.[itemId]
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      saveAttendance(attendanceData);
      setSaveMessage(t('attendanceSaved'));
      
      // Reset form
      const resetData: AttendanceData = {};
      people.forEach(person => {
        resetData[person.id] = {};
        items.forEach(item => {
          resetData[person.id][item.id] = false;
        });
      });
      setAttendanceData(resetData);
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving attendance. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getSelectedCount = () => {
    let count = 0;
    Object.values(attendanceData).forEach(personItems => {
      Object.values(personItems).forEach(isSelected => {
        if (isSelected) count++;
      });
    });
    return count;
  };

  if (loading) return <LoadingSpinner />;

  if (people.length === 0 || items.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">{t('setupRequired')}</h3>
          <p className="text-yellow-700 mb-4">
            {t('setupRequiredDesc')}
          </p>
          <p className="text-yellow-600 text-sm">
            {t('goToManagement')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {t('markAttendance')}
          </h2>
          <p className="text-sm text-gray-600">
            {t('markAttendanceDesc')}
          </p>
        </div>

        {/* Name Boxes */}
        <div className="space-y-4 mb-6">
          {people.map((person) => (
            <NameBox
              key={person.id}
              person={person}
              items={items}
              attendanceData={attendanceData[person.id] || {}}
              onToggleAttendance={(itemId) => toggleAttendance(person.id, itemId)}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-900">{t('summary')}</h3>
              <p className="text-blue-700">
                {getSelectedCount()} {t('selectionsMade')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-600">
                {people.length} {t('people').toLowerCase()} × {items.length} {t('items').toLowerCase()}
              </p>
              <p className="text-xs text-blue-600">
                {people.length * items.length} {t('totalPossible')}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving || getSelectedCount() === 0}
          className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          {saving ? t('saving') : t('saveAttendance')}
        </button>

        {/* Success Message */}
        {saveMessage && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            saveMessage.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {saveMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;