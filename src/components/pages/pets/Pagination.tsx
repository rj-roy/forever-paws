// components/Pagination.tsx
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
            <Link
                href={`/pets?page=${currentPage - 1}`}
                className={`p-2.5 rounded-full transition-all duration-200 ${currentPage === 1
                        ? 'opacity-50 cursor-not-allowed text-gray-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                aria-disabled={currentPage === 1}
            >
                <ChevronLeft size={20} />
            </Link>

            {getPageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                    <Link
                        key={index}
                        href={`/pets?page=${page}`}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200 ${currentPage === page
                                ? 'bg-primary text-white shadow-lg'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </Link>
                ) : (
                    <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500">
                        {page}
                    </span>
                )
            ))}

            <Link
                href={`/pets?page=${currentPage + 1}`}
                className={`p-2.5 rounded-full transition-all duration-200 ${currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed text-gray-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                aria-disabled={currentPage === totalPages}
            >
                <ChevronRight size={20} />
            </Link>
        </nav>
    );
}