'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { InlinePet } from '@/types/chat';
import { MapPin, PawPrint } from 'lucide-react';

interface PetCardProps {
  pet: InlinePet;
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <Link
      href={`/pets/${pet._id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group mt-2"
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
        {pet.images?.[0] ? (
          <Image
            src={pet.images[0]}
            alt={pet.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PawPrint size={24} className="text-gray-300 dark:text-gray-500" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-primary transition-colors">
          {pet.name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {pet.breed} · {pet.age} {pet.ageUnit || 'years'}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <MapPin size={12} className="text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {pet.city}{pet.state ? `, ${pet.state}` : ''}
          </span>
        </div>
        <p className="text-xs font-semibold text-primary mt-1">
          ${pet.adoptionFee}
        </p>
      </div>
    </Link>
  );
}
