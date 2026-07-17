// components/EmptyState.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { PawPrint, Search, Sparkles, Bell } from 'lucide-react';

export default function EmptyState() {
    const pathname = usePathname();
    const router = useRouter();

    const clearFilters = () => {
        router.push(pathname);
    };

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-6">
                <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                    <PawPrint size={40} className="text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-tertiary/20 dark:bg-tertiary/30 rounded-full flex items-center justify-center">
                    <Search size={16} className="text-tertiary" />
                </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 font-poppins">
                No pets match your search right now
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
                Try adjusting your filters or search terms.<br />
                Your future furry companion might be just one click away.
            </p>

            <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 py-3 px-6 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white rounded-full font-medium transition-all duration-200 hover:shadow-lg active:scale-95 mb-4"
            >
                <Sparkles size={18} />
                Clear Filters
            </button>

            <button className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/90 font-medium transition-colors">
                <Bell size={16} />
                Notify me of new arrivals
            </button>
        </div>
    );
}