import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin } from 'lucide-react';
import { RelatedPet } from '@/types/petType';

interface RelatedPetsProps {
    pets: RelatedPet[];
}

export default function RelatedPets({ pets }: RelatedPetsProps) {
    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                    More Pets Like This
                </h2>
                <Link href="/pets" className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/90 font-medium text-sm">
                    View All →
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet, index) => (
                    <div key={index} className="group bg-white dark:bg-def-dark-bg rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {
                            pet.images.map((img, index) => (
                                <Image key={index}
                                src={img}
                                alt={pet.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            /> 
                            ))
                        }
                            {/* <Image
                                src={pet.image}
                                alt={pet.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            /> */}
                            <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <Heart size={16} className="text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{pet.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                {pet.breed} • {pet.ageUnit === 'months' ? `${pet.age} Months` : `${pet.age} Years`}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="font-bold text-primary">${pet.adoptionFee}</span>
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <MapPin size={12} />
                                    {pet.city}, {pet.state}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}