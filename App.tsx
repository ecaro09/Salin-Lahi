import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { analyzeItemImage } from './services/geminiService';
import { AnalysisResult } from './types';
import { LoaderSkeleton } from './components/LoaderSkeleton';
import { useLanguage } from './contexts/LanguageContext';

const WelcomeMessage = () => {
    const { translations } = useLanguage();
    return (
        <div className="text-center max-w-2xl mx-auto mb-8 p-6 bg-white/50 rounded-2xl shadow-sm border border-stone-200">
            <h2 className="text-2xl font-bold text-primary-700 mb-3">{translations.welcome.title}</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
                {translations.welcome.description}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-left">
                <div className="p-3 bg-primary-50 rounded-lg flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-600 text-white font-bold rounded-full">1</span>
                    <span className="text-primary-800" dangerouslySetInnerHTML={{ __html: translations.welcome.step1 }}/>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-600 text-white font-bold rounded-full">2</span>
                    <span className="text-primary-800" dangerouslySetInnerHTML={{ __html: translations.welcome.step2 }}/>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-600 text-white font-bold rounded-full">3</span>
                    <span className="text-primary-800" dangerouslySetInnerHTML={{ __html: translations.welcome.step3 }}/>
                </div>
            </div>
        </div>
    )
};

const ArrowPathIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667 0-3.181 3.183" />
    </svg>
);

const App: React.FC = () => {
    const { language, translations } = useLanguage();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [editableResult, setEditableResult] = useState<AnalysisResult | null>(null);


    const handleImageSelect = useCallback(async (file: File) => {
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);
        setEditableResult(null);
        setImageFile(file);

        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
        setImageUrl(URL.createObjectURL(file));

        try {
            const result = await analyzeItemImage(file, language);
            setAnalysisResult(result);
            setEditableResult(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(translations.app.error);
            } else {
                setError(translations.app.unknownError);
            }
        } finally {
            setIsLoading(false);
        }
    }, [imageUrl, language, translations]);

    const handleResultChange = (
        field: keyof AnalysisResult,
        value: string,
        index?: number
    ) => {
        if (!editableResult) return;

        if (field === 'suggested_titles' && typeof index === 'number') {
            const newTitles = [...editableResult.suggested_titles];
            newTitles[index] = value;
            setEditableResult({ ...editableResult, suggested_titles: newTitles });
        } else if (field !== 'suggested_titles') {
            setEditableResult({ ...editableResult, [field]: value });
        }
    };

    const handleReset = () => {
        setImageFile(null);
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
        setImageUrl(null);
        setIsLoading(false);
        setError(null);
        setAnalysisResult(null);
        setEditableResult(null);
    };
    
    const showResultsOrError = editableResult || error || isLoading;

    return (
        <div className="min-h-screen text-stone-800 font-sans p-4">
            <div className="container mx-auto max-w-3xl">
                <Header />

                {!imageUrl && !isLoading && <WelcomeMessage />}

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-stone-200/80">
                    <div className="flex flex-col items-center gap-6">
                        {showResultsOrError && !isLoading && (
                             <div className="w-full flex justify-end -mb-2">
                                <button
                                    onClick={handleReset}
                                    className="flex items-center px-4 py-2 text-sm font-semibold text-primary-700 bg-primary-100 rounded-lg hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                                >
                                    <ArrowPathIcon />
                                    {translations.app.startOver}
                                </button>
                            </div>
                        )}

                        {imageUrl && (
                            <div className="w-full max-w-md bg-stone-100 p-2 rounded-lg shadow-inner">
                                <img
                                    src={imageUrl}
                                    alt="Item preview"
                                    className="w-full h-auto object-contain rounded-md max-h-80"
                                />
                            </div>
                        )}
                        
                        {!imageUrl && !isLoading && <ImageUploader onImageSelect={handleImageSelect} isLoading={isLoading} />}
                    </div>

                    {isLoading && <LoaderSkeleton />}

                    {error && (
                        <div className="mt-6 text-center p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">
                            <p>{error}</p>
                        </div>
                    )}

                    {editableResult && <ResultDisplay result={editableResult} onResultChange={handleResultChange} />}
                </div>

                <footer className="text-center py-8 text-stone-500 text-sm">
                    <p>{translations.footer.poweredBy}</p>
                </footer>
            </div>
        </div>
    );
};

export default App;