import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAttendance } from '../hooks/useAttendance';
import { Language, useTranslation } from '../utils/i18n';
import LoadingSpinner from '../components/LoadingSpinner';

interface HistoryPageProps {
  language: Language;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ language }) => {
  const { people, items, sessions, loading } = useAttendance();
  const { t } = useTranslation(language);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  if (loading) return <LoadingSpinner />;

  const getPersonName = (personId: string) => {
    return people.find(p => p.id === personId)?.name || 'Unknown Person';
  };

  const getItemName = (itemId: string) => {
    return items.find(i => i.id === itemId)?.name || 'Unknown Item';
  };

  const filteredSessions = selectedDate
    ? sessions.filter(session => {
        const sessionDate = new Date(session.date).toISOString().split('T')[0];
        return sessionDate === selectedDate;
      })
    : sessions;

  const sortedSessions = [...filteredSessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getUniqueSessionDates = () => {
    const dates = sessions.map(session => 
      new Date(session.date).toISOString().split('T')[0]
    );
    return [...new Set(dates)].sort().reverse();
  };

  const getSessionStats = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return { totalRecords: 0, uniquePeople: 0, uniqueItems: 0 };

    const uniquePeople = new Set(session.records.map(r => r.personId)).size;
    const uniqueItems = new Set(session.records.map(r => r.itemId)).size;

    return {
      totalRecords: session.records.length,
      uniquePeople,
      uniqueItems,
    };
  };

  if (sessions.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('noHistoryYet')}</h3>
          <p className="text-gray-600">
            {t('startTracking')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="p-4">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('filterByDate')}</h3>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('allDates')}</option>
            {getUniqueSessionDates().map(date => (
              <option key={date} value={date}>
                {formatDate(new Date(date))}
              </option>
            ))}
          </select>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sortedSessions.map((session) => {
            const stats = getSessionStats(session.id);
            const isExpanded = expandedSession === session.id;
            
            return (
              <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Session Header */}
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                  onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {formatDate(session.date)}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTime(session.date)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                          {stats.totalRecords} {t('records')}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1 text-blue-500" />
                          {stats.uniquePeople} {t('people').toLowerCase()}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-semibold text-gray-900">{t('attendanceRecords')}</h4>
                      </div>
                      
                    {session.records.length > 0 ? (
                        <div className="grid gap-3">
                        {session.records.map((record) => (
                            <div key={record.id} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                                    <Users className="w-3 h-3 text-blue-600" />
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900 block">
                                {getPersonName(record.personId)}
                              </span>
                                    <span className="text-sm text-blue-600">
                                {getItemName(record.itemId)}
                              </span>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {formatTime(record.timestamp)}
                                </div>
                              </div>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-6">
                          <CheckCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">
                            {t('noRecordsSession')}
                      </p>
                        </div>
                    )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {sortedSessions.length === 0 && selectedDate && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('noSessionsFound')}</h3>
            <p className="text-gray-600">
              No attendance sessions found for {formatDate(new Date(selectedDate))}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;