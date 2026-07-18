import { Metadata } from 'next';
import { Pet } from '@/types/petType';
import SearchBar from '@/components/pages/pets/SearchBar';
import FilterSidebar from '@/components/pages/pets/FilterSideBar';
import FilterButton from '@/components/pages/pets/FilterButton';
import PetCard from '@/components/pages/pets/PetCard';
import Pagination from '@/components/pages/pets/Pagination';
import EmptyState from '@/components/pages/pets/EmptyState';
import SkeletonCard from '@/components/ui/skeletons/PetsSkeleton';

export const metadata: Metadata = {
  title: 'Find Your Perfect Pet | Forever Paws',
  description: 'Browse available pets looking for their forever homes',
};

interface PetsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getPets(searchParams: Record<string, string | string[] | undefined>) {
  const queryString = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(v => queryString.append(key, v));
      } else {
        queryString.set(key, value);
      }
    }
  });
  

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pets/get/query?${queryString.toString()}`;
  
  const res = await fetch(apiUrl, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch pets');
  }

  const pets: Pet[] = await res.json();
  
  const totalCount = parseInt(res.headers.get('X-Total-Count') || '0', 10);
  const totalPages = parseInt(res.headers.get('X-Total-Pages') || '1', 10);
  const currentPage = parseInt(res.headers.get('X-Current-Page') || '1', 10);

  return { pets, totalCount, totalPages, currentPage };
}

export default async function PetsPage({ searchParams }: PetsPageProps) {
  const params = await searchParams;
  const { pets, totalCount, totalPages, currentPage } = await getPets(params);

  return (
    <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar />

        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Button */}
          <FilterButton />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {pets.length > 0 ? (
              <>
                {/* Results Count */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{totalCount}</span> {totalCount === 1 ? 'pet' : 'pets'}
                  </p>
                </div>

                {/* Pet Grid - Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pets.map((pet, index) => (
                    <PetCard key={index} pet={pet} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading state
export function PetsPageLoading() {
  return (
    <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Skeleton */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
        </div>

        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Filter Sidebar Skeleton */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-def-dark-bg rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse space-y-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              </div>
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-full" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-full" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-full" />
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>

            {/* Grid: 1 col mobile, 2 cols md, 3 cols xl */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}