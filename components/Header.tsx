import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

const CommunityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-primary-500">
        <path d="M11.25 3.375c.995 0 1.875.56 2.375 1.375h-4.75c.5-.815 1.38-1.375 2.375-1.375ZM12 21.75c-1.306 0-2.43-.8-2.822-1.875H14.82c-.392 1.074-1.516 1.875-2.822 1.875Z" />
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9.375 6a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h5.25a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-5.25Zm-2.148 6.11a.75.75 0 0 1 .188 1.04l-1.09 1.523a.75.75 0 1 1-1.259-.898l1.09-1.523a.75.75 0 0 1 1.07-.142Zm7.712 0a.75.75 0 0 1 1.07.142l1.09 1.523a.75.75 0 1 1-1.259.898l-1.09-1.523a.75.75 0 0 1 .188-1.04Z" clipRule="evenodd" />
    </svg>
);


export const Header: React.FC = () => {
    const { translations } = useLanguage();
    return (
        <header className="text-center py-6 relative">
             <div className="absolute top-4 right-0">
                <LanguageSwitcher />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 mb-2">
                <CommunityIcon />
                <h1 className="text-4xl font-extrabold text-primary-800 tracking-tight">Salin-Lahi</h1>
            </div>
            <p className="text-xl text-stone-600">{translations.header.tagline}</p>
        </header>
    );
};