import React, { useState } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface CopyButtonProps {
    textToCopy: string;
    copyLabel?: string;
    copiedLabel?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ 
    textToCopy, 
    copyLabel = 'Copy', 
    copiedLabel = 'Copied!' 
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <button
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-2 shrink-0 ${
                copied
                    ? 'bg-primary-600 text-white'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
            }`}
        >
            <ClipboardIcon className="w-4 h-4" />
            {copied ? copiedLabel : copyLabel}
        </button>
    );
};