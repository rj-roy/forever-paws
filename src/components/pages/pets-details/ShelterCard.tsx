// components/ShelterCard.tsx
import { MapPin, Star } from 'lucide-react';
import Link from 'next/link';

interface ShelterCardProps {
    name: string;
    rating: number;
    reviewCount: number;
    location?: string;
    contactEmail?: string;
}

export default function ShelterCard({
    name,
    rating,
    reviewCount,
    location,
    contactEmail
}: ShelterCardProps) {
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
            <div className="flex items-start justify-between">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {rating} ({reviewCount} reviews)
                            </span>
                        </div>
                        {location && (
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin size={14} />
                                {location}
                            </div>
                        )}
                    </div>
                </div>

                <Link
                    href={contactEmail ? `mailto:${contactEmail}` : '#'}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-full text-sm font-medium transition-all"
                >
                    Contact
                </Link>
            </div>
        </div>
    );
}