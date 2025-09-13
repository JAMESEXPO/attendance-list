import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../utils/i18n';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
    { code: 'ms' as Language, name: 'Bahasa', flag: '🇲🇾' },
  ];

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="appearance-none bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-gray-900">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
    </div>
  );
};

export default LanguageSelector;