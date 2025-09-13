import React from 'react';
import { BarChart3, TrendingUp, Award, Users } from 'lucide-react';
import { useAttendance } from '../hooks/useAttendance';
import LoadingSpinner from '../components/LoadingSpinner';

const AnalyticsPage: React.FC = () => {
  const { people, items, sessions, getItemStatistics, loading } = useAttendance();

  if (loading) return <LoadingSpinner />;

  const itemStats = getItemStatistics();
  const totalSessions = sessions.length;
  const totalRecords = sessions.reduce((sum, session) => sum + session.records.length, 0);
  const averageAttendancePerSession = totalSessions > 0 ? Math.round(totalRecords / totalSessions) : 0;

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (sessions.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analytics Yet</h3>
          <p className="text-gray-600">
            Track some attendance to see analytics and statistics here.
          </p>
        </div>
      </div>
    );
  }

  const topItem = itemStats[0];
  const leastPopularItem = itemStats[itemStats.length - 1];

  return (
    <div className="pb-20">
      <div className="p-4 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-xl font-semibold text-gray-900">{totalSessions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-xl font-semibold text-gray-900">{totalRecords}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Avg per Session</p>
                <p className="text-xl font-semibold text-gray-900">{averageAttendancePerSession}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Active People</p>
                <p className="text-xl font-semibold text-gray-900">{people.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Insights */}
        {itemStats.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Key Insights</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Award className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-blue-800">
                  <strong>{topItem?.item.name}</strong> is the most popular with {topItem?.count} selections
                </span>
              </div>
              {leastPopularItem && leastPopularItem.count !== topItem?.count && (
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-blue-800">
                    <strong>{leastPopularItem.item.name}</strong> needs attention with only {leastPopularItem.count} selections
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Item Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Item Statistics</h3>
            <p className="text-sm text-gray-600 mt-1">
              Frequency and popularity of each item across all sessions
            </p>
          </div>

          <div className="p-4">
            {itemStats.length > 0 ? (
              <div className="space-y-4">
                {itemStats.map((stat, index) => {
                  const maxCount = Math.max(...itemStats.map(s => s.count));
                  const barWidth = maxCount > 0 ? (stat.count / maxCount) * 100 : 0;
                  
                  return (
                    <div key={stat.item.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">{stat.item.name}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-gray-600">{stat.count} times</span>
                          <span className="font-medium text-blue-600">{stat.percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(stat.percentage)}`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Selected in {stat.count} out of {totalSessions} sessions
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No item statistics available yet.
              </div>
            )}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {itemStats.filter(s => s.count > 0).length}
                </div>
                <div className="text-sm text-green-700">Active Items</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {itemStats.length > 0 ? Math.round(itemStats.reduce((sum, s) => sum + s.percentage, 0) / itemStats.length) : 0}%
                </div>
                <div className="text-sm text-blue-700">Avg Participation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;