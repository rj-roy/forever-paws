'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export default function FilterSidebar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [ageRange, setAgeRange] = useState(searchParams.get('age') || 'Any Age');

    const speciesOptions = [
        { id: 'dog', label: 'Dog', count: 128 },
        { id: 'cat', label: 'Cat', count: 94 },
        { id: 'small-pets', label: 'Small Pets', count: 32 },
    ];

    const sizeOptions = ['Small', 'Medium', 'Large'];

    const toggleSpecies = (speciesId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentSpecies = params.get('species') || '';

        if (currentSpecies.includes(speciesId)) {
            const updated = currentSpecies.split(',').filter(s => s !== speciesId).join(',');
            if (updated) {
                params.set('species', updated);
            } else {
                params.delete('species');
            }
        } else {
            const updated = currentSpecies ? `${currentSpecies},${speciesId}` : speciesId;
            params.set('species', updated);
        }
        params.set('page', '1');

        router.push(`${pathname}?${params.toString()}`);
    };

    const toggleSize = (size: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentSize = params.get('size') || '';

        if (currentSize.includes(size)) {
            const updated = currentSize.split(',').filter(s => s !== size).join(',');
            if (updated) {
                params.set('size', updated);
            } else {
                params.delete('size');
            }
        } else {
            const updated = currentSize ? `${currentSize},${size}` : size;
            params.set('size', updated);
        }
        params.set('page', '1');

        router.push(`${pathname}?${params.toString()}`);
    };

    const isSpeciesChecked = (id: string) => {
        const species = searchParams.get('species') || '';
        return species.includes(id);
    };

    const isSizeChecked = (size: string) => {
        const sizes = searchParams.get('size') || '';
        return sizes.includes(size);
    };

    return (
        <div className="bg-white dark:bg-def-dark-bg rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 font-poppins">
                Filter By
            </h3>

            {/* Species */}
            <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Species
                </h4>
                <div className="space-y-2">
                    {speciesOptions.map((option) => (
                        <label key={option.id} className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={isSpeciesChecked(option.id)}
                                onChange={() => toggleSpecies(option.id)}
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50 dark:focus:ring-primary/30 transition-colors"
                            />
                            <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Age Range */}
            <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Age Range
                </h4>
                <div className="relative">
                    <select
                        value={ageRange}
                        onChange={(e) => {
                            setAgeRange(e.target.value);
                            const params = new URLSearchParams(searchParams.toString());
                            if (e.target.value !== 'Any Age') {
                                params.set('age', e.target.value);
                            } else {
                                params.delete('age');
                            }
                            params.set('page', '1');
                            router.push(`${pathname}?${params.toString()}`);
                        }}
                        className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    >
                        <option>Any Age</option>
                        <option>Puppy/Kitten</option>
                        <option>Young</option>
                        <option>Adult</option>
                        <option>Senior</option>
                    </select>
                    <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                    />
                </div>
            </div>

            {/* Size */}
            <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Size
                </h4>
                <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                        <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isSizeChecked(size)
                                    ? 'bg-secondary text-white dark:bg-secondary shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}