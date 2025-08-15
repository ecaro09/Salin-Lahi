import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { CopyButton } from './CopyButton';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface ResultDisplayProps {
  result: AnalysisResult;
  onResultChange: (field: keyof AnalysisResult, value: string, index?: number) => void;
}

const CategoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary-600">
        <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v3.882a1.5 1.5 0 0 0 .44 1.06l7.118 7.118a1.5 1.5 0 0 0 2.122 0l3.882-3.882a1.5 1.5 0 0 0 0-2.12L8.44 2.439A1.5 1.5 0 0 0 7.382 2H3.5ZM6 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
);

const ConditionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary-600">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
);

const TitleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary-600">
        <path fillRule="evenodd" d="M5.433 4.342A5.002 5.002 0 0 1 8.25 3h3.5a5.002 5.002 0 0 1 2.817 1.342c.253.193.483.41.687.646a5.002 5.002 0 0 1 1.342 2.817c.023.12.038.243.048.368a5.002 5.002 0 0 1-1.342 2.817c-.193.253-.41.483-.646.687a5.002 5.002 0 0 1-2.817 1.342c-.12.023-.243.038-.368.048a5.002 5.002 0 0 1-2.817-1.342c-.253-.193-.483-.41-.687-.646a5.002 5.002 0 0 1-1.342-2.817A5.002 5.002 0 0 1 3 8.25v-3.5a5.002 5.002 0 0 1 1.342-2.817c.193-.253.41-.483.646-.687.204-.236.42-.454.646-.657Zm3.023 6.928a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm-.75-3.25a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" clipRule="evenodd" />
    </svg>
);

const DescriptionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary-600">
        <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h13.5A2.25 2.25 0 0 0 19 13.75v-7.5A2.25 2.25 0 0 0 16.75 4H3.25Z" />
    </svg>
);

const EditableField: React.FC<{value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({ value, onChange }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full text-stone-700 text-lg font-semibold bg-stone-100 rounded-md px-3 py-1.5 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
    />
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onResultChange }) => {
  const { translations } = useLanguage();
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = () => {
    const { suggested_titles, suggested_description, suggested_category, suggested_condition } = result;
    const { title, category, condition, description } = translations.copyAll;
    
    const formattedText = `${title}: ${suggested_titles[0] || ''}
${category}: ${suggested_category}
${condition}: ${suggested_condition}

${description}:
${suggested_description}`;

    navigator.clipboard.writeText(formattedText).then(() => {
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2500);
    });
  };
  
  return (
    <div className="w-full space-y-8 mt-8 animate-fade-in">

      <div className="p-4 bg-primary-50 border-2 border-primary-200 rounded-xl">
          <h3 className="text-lg font-bold text-primary-800 mb-2">{translations.resultDisplay.readyToPost}</h3>
          <p className="text-sm text-primary-700 mb-4">
            {translations.resultDisplay.readyToPostDescription}
          </p>
          <button
              onClick={handleCopyAll}
              className={`w-full px-4 py-2.5 text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  copiedAll
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm'
              }`}
          >
              {copiedAll ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
              {copiedAll ? translations.resultDisplay.copiedToClipboard : translations.resultDisplay.copyAllButton}
          </button>
      </div>
      
      {/* Category & Condition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CategoryIcon />
            <h4 className="text-base font-bold text-primary-800">{translations.resultDisplay.category}</h4>
          </div>
          <div className="flex justify-between items-center gap-2">
            <EditableField 
                value={result.suggested_category}
                onChange={(e) => onResultChange('suggested_category', e.target.value)}
            />
            <CopyButton 
              textToCopy={result.suggested_category} 
              copyLabel={translations.copyButton.copy}
              copiedLabel={translations.copyButton.copied}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ConditionIcon />
            <h4 className="text-base font-bold text-primary-800">{translations.resultDisplay.condition}</h4>
          </div>
          <div className="flex justify-between items-center gap-2">
            <EditableField 
                value={result.suggested_condition}
                onChange={(e) => onResultChange('suggested_condition', e.target.value)}
            />
            <CopyButton 
              textToCopy={result.suggested_condition} 
              copyLabel={translations.copyButton.copy}
              copiedLabel={translations.copyButton.copied}
            />
          </div>
        </div>
      </div>

      {/* Suggested Titles */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TitleIcon />
          <h3 className="text-xl font-bold text-primary-800">{translations.resultDisplay.titles}</h3>
        </div>
        <ul className="space-y-3">
          {result.suggested_titles.map((title, index) => (
            <li
              key={index}
              className="p-2 bg-white rounded-lg flex justify-between items-center gap-2"
            >
              <input
                type="text"
                value={title}
                onChange={(e) => onResultChange('suggested_titles', e.target.value, index)}
                className="w-full text-stone-700 bg-stone-50 rounded-md px-3 py-2 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
              />
              <CopyButton 
                textToCopy={title} 
                copyLabel={translations.copyButton.copy}
                copiedLabel={translations.copyButton.copied}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Description */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <DescriptionIcon />
          <h3 className="text-xl font-bold text-primary-800">{translations.resultDisplay.description}</h3>
        </div>
        <div className="p-2 bg-white rounded-lg space-y-4">
            <textarea
                value={result.suggested_description}
                onChange={(e) => onResultChange('suggested_description', e.target.value)}
                className="w-full text-stone-700 leading-relaxed bg-stone-50 rounded-md px-3 py-2 border border-transparent focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all min-h-[120px]"
                rows={4}
            />
            <div className="flex justify-end">
                <CopyButton 
                  textToCopy={result.suggested_description}
                  copyLabel={translations.copyButton.copy}
                  copiedLabel={translations.copyButton.copied}
                />
            </div>
        </div>
      </div>
    </div>
  );
};