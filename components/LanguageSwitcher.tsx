import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fil' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 bg-primary-100 text-primary-800 hover:bg-primary-200"
      aria-label={`Switch to ${language === 'en' ? 'Filipino' : 'English'}`}
    >
      {language === 'en' ? 'FIL' : 'EN'}
    </button>
  );
};