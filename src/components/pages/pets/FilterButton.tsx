'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterButton() {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const speciesOptions = [
        { id: 'dog', label: 'Dogs' },
        { id: 'cat', label: 'Cats' },
        { id: 'small-pet', label: 'Small Pets' },
        { id: 'bird', label: 'Birds' },
    ];

    const ageOptions = ['Puppy', 'Young', 'Adult', 'Senior'];

    const toggleSelection = (param: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.get(param) || '';

        if (current.includes(value)) {
            const updated = current.split(',').filter(v => v !== value).join(',');
            if (updated) {
                params.set(param, updated);
            } else {
                params.delete(param);
            }
        } else {
            const updated = current ? `${current},${value}` : value;
            params.set(param, updated);
        }
        params.set('page', '1');

        router.push(`${pathname}?${params.toString()}`);
    };

    const isSelected = (param: string, value: string) => {
        const current = searchParams.get(param) || '';
        return current.includes(value);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-18 right-4 z-30 flex items-center gap-2 py-3 px-5 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
                <Filter size={18} />
                Filters
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Filter Modal */}
            <div className={`fixed inset-x-0 bottom-15 z-50 lg:hidden bg-white dark:bg-def-dark-bg rounded-t-3xl transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins">
                            Search Filters
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X size={20} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Species */}
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                            Species
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {speciesOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => toggleSelection('species', option.id)}
                                    className={`py-3 px-4 rounded-full text-sm font-medium transition-all duration-200 ${isSelected('species', option.id)
                                            ? 'bg-secondary text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Age */}
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                            Age
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {ageOptions.map((age) => (
                                <button
                                    key={age}
                                    onClick={() => toggleSelection('age', age)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isSelected('age', age)
                                            ? 'bg-secondary text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {age}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Distance */}
                    <div className="mb-8">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                            Distance
                        </h3>
                        <div className="px-2">
                            <input
                                type="range"
                                min="5"
                                max="100"
                                defaultValue="50"
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Within 5km</span>
                                <span>100km+</span>
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white rounded-full font-medium transition-all duration-200 hover:shadow-lg"
                    >
                        Show Results
                    </button>
                </div>
            </div>
        </>
    );
}