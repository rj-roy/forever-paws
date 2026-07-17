// components/PetCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart } from 'lucide-react';
import { Pet } from '@/types/petType';

interface PetCardProps {
    pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
    return (
        <div className="group bg-white dark:bg-def-dark-bg rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                    src={pet.images[0] || '/placeholder-pet.jpg'}
                    alt={pet.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Available Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-secondary/90 dark:bg-secondary text-white text-xs font-semibold rounded-full shadow-sm">
                        AVAILABLE
                    </span>
                </div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm hover:shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100">
                    <Heart size={18} className="text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 font-poppins">
                    {pet.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 capitalize">
                    {pet.breed} • {pet.age} {pet.age === 1 ? 'Year' : 'Years'}
                </p>

                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-5">
                    <MapPin size={16} className="flex-shrink-0" />
                    <span className="truncate">{pet.city}</span>
                </div>

                <Link
                    href={`/pets/${pet.userId}`}
                    className="block w-full py-3 px-4 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white text-center rounded-full font-medium transition-all duration-200 hover:shadow-lg active:scale-95"
                >
                    Meet {pet.name}
                </Link>
            </div>
        </div>
    );
}