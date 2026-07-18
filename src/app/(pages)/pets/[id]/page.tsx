import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {  Pet, RelatedPet } from '@/types/petType';
import ImageGallery from '@/components/pages/pets-details/ImageGallery';
import QuickInfoBar from '@/components/pages/pets-details/QuickInfoBar';
import HealthBadges from '@/components/pages/pets-details/HealthBadge';
import TemperamentTags from '@/components/pages/pets-details/TempermentTags';
import ShelterCard from '@/components/pages/pets-details/ShelterCard';
import RelatedPets from '@/components/pages/pets-details/RelatedPets';
import AdoptionCard from '@/components/pages/pets-details/AdoptionCard';

interface PetPageProps {
    params: Promise<{ id: string }>;
}

async function getPet(id: string): Promise<Pet> {
    const res = await fetch(`${'http://localhost:5000'}/api/v1/pets/get/id/${id}`, {
        cache: 'no-store',
    });

    // if (!res.ok) {
    //     return null;
    // }

    return res.json();
}

async function getRelatedPets(breed: string, limit: number = 3): Promise<RelatedPet[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/pets/get/query?breed=${breed}&limit=${limit}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        return [];
    }

    return res.json();
}

export async function generateMetadata({ params }: PetPageProps): Promise<Metadata> {
    const { id } = await params;
    const pet = await getPet(id);

    if (!pet) {
        return {
            title: 'Pet Not Found',
        };
    }

    return {
        title: `${pet.name} - ${pet.breed} for Adoption`,
        description: pet.shortDescription,
    };
}

export default async function PetPage({ params }: PetPageProps) {
    const { id } = await params;
    const pet = await getPet(id);

    if (!pet) {
        notFound();
    }

    const relatedPets = await getRelatedPets(pet.breed);

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg pb-20">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <nav className="flex text-sm text-gray-600 dark:text-gray-400">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link href="/" className="hover:text-primary dark:hover:text-primary transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li>
                            <Link href="/pets" className="hover:text-primary dark:hover:text-primary transition-colors">
                                Find a Pet
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li className="text-gray-900 dark:text-white font-medium">{pet.name}</li>
                    </ol>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <ImageGallery
                            images={pet.images}
                            petName={pet.name}
                            status={pet.status}
                            location={`${pet.city}, ${pet.state ?? ''}`}
                            postedDate={pet.postedDate ?? ''}
                        />

                        <QuickInfoBar
                            breed={pet.breed}
                            age={pet.age}
                            ageUnit={pet.ageUnit ?? ''}
                            size={pet.size}
                            weight={pet.weight?.toString()}
                            gender={pet.gender ?? ''}
                        />

                        {/* About Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
                                About {pet.name}
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                                <p>{pet.fullDescription}</p>
                                {pet.shortDescription && (
                                    <p>{pet.shortDescription}</p>
                                )}
                            </div>
                        </div>

                        {/* Health & Background */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
                                Health & Background
                            </h2>
                            <HealthBadges
                                vaccinated={pet.vaccinated}
                                spayedNeutered={pet.spayedNeutered}
                                microchipped={pet.microchipped ?? false}
                                healthCertificate={pet.healthCertificate ?? false}
                            />
                        </div>

                        {/* Temperament */}
                        {pet.temperamentTags && pet.temperamentTags.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
                                    Temperament
                                </h2>
                                <TemperamentTags tags={pet.temperamentTags} />
                            </div>
                        )}

                        {/* Shelter Info */}
                        {(pet.shelterName || pet.contactEmail) && (
                            <div>
                                <ShelterCard
                                    name={pet.shelterName ?? 'Unknown Shelter'}
                                    rating={pet.avgRating ?? 0}
                                    reviewCount={pet.reviewCount ?? 0}
                                    contactEmail={pet.contactEmail}
                                />
                            </div>
                        )}

                        {/* Related Pets */}
                        {relatedPets.length > 0 && (
                            <RelatedPets pets={relatedPets} />
                        )}
                    </div>

                    {/* Right Column - Adoption Card */}
                    <div className="lg:col-span-1">
                        <AdoptionCard
                            fee={pet.adoptionFee}
                            views={pet.views}
                            applications={pet.applications}
                            petId={pet._id} petName={''}                        />
                    </div>
                </div>
            </div>
        </div>
    );
}