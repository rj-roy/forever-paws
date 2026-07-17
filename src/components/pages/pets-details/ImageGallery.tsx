// components/ImageGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    petName: string;
    status: string;
    location: string;
    postedDate: string;
}

export default function ImageGallery({
    images,
    petName,
    status,
    location,
    postedDate
}: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const visibleThumbnails = images.slice(0, 4);
    const remainingCount = images.length - 4;

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                    src={images[currentIndex]}
                    alt={petName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-secondary text-white text-sm font-semibold rounded-full shadow-sm">
                        {status === 'available' ? 'Available' : status}
                    </span>
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all"
                        >
                            <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all"
                        >
                            <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {visibleThumbnails.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative aspect-square rounded-xl overflow-hidden transition-all ${currentIndex === idx
                                    ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900'
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${petName} thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="100px"
                            />
                        </button>
                    ))}

                    {remainingCount > 0 && (
                        <button
                            onClick={() => setCurrentIndex(4)}
                            className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                        >
                            <span className="text-gray-600 dark:text-gray-300 font-semibold">
                                +{remainingCount}
                            </span>
                        </button>
                    )}
                </div>
            )}

            {/* Pet Info Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-2">
                        {petName}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {postedDate}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`p-2.5 rounded-full border transition-colors ${isFavorite
                                ? 'border-red-200 bg-red-50 dark:bg-red-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                    >
                        <Heart
                            size={20}
                            className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-400'}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}