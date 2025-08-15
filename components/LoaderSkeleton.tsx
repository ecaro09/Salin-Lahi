import React from 'react';

const SkeletonBar: React.FC<{ width: string; height?: string }> = ({ width, height = 'h-6' }) => (
    <div className={`bg-stone-200 rounded-md animate-pulse ${width} ${height}`}></div>
);

export const LoaderSkeleton: React.FC = () => {
    return (
        <div className="w-full space-y-8 mt-8">
            {/* Category & Condition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <SkeletonBar width="w-3/4 mb-2" height="h-5"/>
                    <SkeletonBar width="w-full" height="h-10"/>
                </div>
                <div>
                    <SkeletonBar width="w-3/4 mb-2" height="h-5"/>
                    <SkeletonBar width="w-full" height="h-10"/>
                </div>
            </div>

            {/* Suggested Titles */}
            <div>
                <SkeletonBar width="w-1/2 mb-4" height="h-7" />
                <ul className="space-y-3">
                    <li className="p-2 bg-white rounded-lg flex justify-between items-center gap-2">
                         <SkeletonBar width="w-full" height="h-10"/>
                    </li>
                     <li className="p-2 bg-white rounded-lg flex justify-between items-center gap-2">
                         <SkeletonBar width="w-full" height="h-10"/>
                    </li>
                     <li className="p-2 bg-white rounded-lg flex justify-between items-center gap-2">
                         <SkeletonBar width="w-full" height="h-10"/>
                    </li>
                </ul>
            </div>

            {/* Suggested Description */}
            <div>
                 <SkeletonBar width="w-1/2 mb-4" height="h-7" />
                <div className="p-2 bg-white rounded-lg">
                    <SkeletonBar width="w-full" height="h-32" />
                </div>
            </div>
        </div>
    );
};
