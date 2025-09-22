
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="absolute top-6 right-6 z-20 flex space-x-2 bg-black/30 p-1 rounded-full backdrop-blur-sm">
      <button 
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${i18n.language === 'en' ? 'bg-orange-500 text-black' : 'text-white'}`}
      >
        {t('language_en')}
      </button>
      <button 
        onClick={() => changeLanguage('hi')}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${i18n.language === 'hi' ? 'bg-orange-500 text-black' : 'text-white'}`}
      >
        {t('language_hi')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;