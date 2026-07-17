'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search') as string;

        const params = new URLSearchParams(searchParams.toString());
        if (searchValue) {
            params.set('search', searchValue);
        } else {
            params.delete('search');
        }
        params.set('page', '1');

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10">
            <div className="relative">
                <Search
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                />
                <input
                    type="text"
                    name="search"
                    defaultValue={searchParams.get('search') || ''}
                    placeholder="Search by breed, age, or personality..."
                    className="w-full pl-14 pr-6 py-4 bg-gray-100 dark:bg-gray-800 border-0 rounded-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-base"
                />
            </div>
        </form>
    );
}