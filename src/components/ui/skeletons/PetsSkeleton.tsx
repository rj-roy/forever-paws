export default function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-def-dark-bg rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse">
            <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800" />
            <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                <div className="h-11 bg-gray-200 dark:bg-gray-800 rounded-full w-full mt-4" />
            </div>
        </div>
    );
}