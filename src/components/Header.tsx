import React from 'react';
import { ClipboardList } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Language } from '../utils/i18n';

interface HeaderProps {
  title: string;
  subtitle?: string;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, language, onLanguageChange }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <ClipboardList className="w-8 h-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && (
                <p className="text-blue-100 text-sm mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          <LanguageSelector 
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;