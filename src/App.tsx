import React, { useState } from 'react';
import { Language } from './utils/i18n';
import Navigation from './components/Navigation';
import Header from './components/Header';
import AttendancePage from './pages/AttendancePage';
import ManagementPage from './pages/ManagementPage';
import HistoryPage from './pages/HistoryPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('attendance');
  const [language, setLanguage] = useState<Language>('en');

  const getPageTitle = () => {
    switch (currentPage) {
      case 'attendance':
        return 'Attendance Tracker';
      case 'management':
        return 'Manage Data';
      case 'history':
        return 'Attendance History';
      case 'analytics':
        return 'Analytics & Reports';
      default:
        return 'Attendance Tracker';
    }
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case 'attendance':
        return 'Mark attendance for people and items';
      case 'management':
        return 'Add, edit, and delete people and items';
      case 'history':
        return 'View past attendance records';
      case 'analytics':
        return 'Statistics and insights';
      default:
        return '';
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'attendance':
        return <AttendancePage />;
      case 'management':
        return <ManagementPage />;
      case 'history':
        return <HistoryPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <AttendancePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={getPageTitle()} 
        subtitle={getPageSubtitle()} 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="pt-4">
        {currentPage === 'attendance' && <AttendancePage language={language} />}
        {currentPage === 'management' && <ManagementPage />}
        {currentPage === 'history' && <HistoryPage language={language} />}
        {currentPage === 'analytics' && <AnalyticsPage />}
      </main>

      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

export default App;