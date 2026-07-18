import PetActions from '@/components/dashboard/shelter/managePet/PetActions';
import { Pet } from '@/types/petType';
import { getUserSession } from '@/lib/core/session';
import { Plus, CheckCircle, Clock, FileText, Heart, PawPrint, Shield, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

async function getPets(shelterId: string, page: number = 1): Promise<{ pets: Pet[]; total: number }> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/pets/get/mine?shelterId=${shelterId}&page=${page}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            return { pets: [], total: 0 };
        }

        return await res.json();
    } catch {
        return { pets: [], total: 0 };
    }
}

const statusConfig: Record<string, { label: string; className: string; icon: React.ComponentType<{ size?: number }> }> = {
    available: { label: 'Available', className: 'bg-secondary/20 text-secondary dark:bg-secondary/30', icon: CheckCircle },
    'pending-approval': { label: 'Pending Approval', className: 'bg-neutral/20 text-neutral dark:bg-neutral/30', icon: FileText },
    'pending-adoption': { label: 'Pending Adoption', className: 'bg-tertiary/20 text-tertiary dark:bg-tertiary/30', icon: Clock },
    adopted: { label: 'Adopted', className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300', icon: Heart },
};

interface ManagePetsPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function ManagePetsPage({ searchParams }: ManagePetsPageProps) {
    const params = await searchParams;
    const currentPage = parseInt(params.page || '1', 10);

    const session = await getUserSession();
    const userId = session?.user?.id || '';

    const { pets, total } = await getPets(userId, currentPage);

    if (pets.length === 0) {
        return (
            <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white dark:bg-def-dark-bg rounded-3xl p-12 lg:p-16 text-center border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                        <div className="absolute top-8 left-8 opacity-20"><PawPrint size={48} className="text-primary" /></div>
                        <div className="absolute bottom-8 right-8 opacity-20"><Heart size={48} className="text-secondary" /></div>

                        <div className="relative z-10 max-w-md mx-auto">
                            <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <PawPrint size={48} className="text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
                                You haven&apos;t listed any pets yet
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Listing a pet is the first step toward finding them a loving family. Let&apos;s create their profile together.
                            </p>
                            <Link href="/shelter/list-pet" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95 mb-8">
                                <Plus size={20} />
                                List Your First Pet
                            </Link>

                            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2"><Shield size={16} className="text-secondary" /><span>Safe & Secure Process</span></div>
                                <div className="flex items-center gap-2"><MessageCircle size={16} className="text-tertiary" /><span>24/7 Listing Support</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                            Manage Your Pets
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Tracking {total} furry friends at your shelter
                        </p>
                    </div>
                    <Link href="/pets/list-a-pet" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95">
                        <Plus size={20} />
                        List a New Pet
                    </Link>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block bg-white dark:bg-def-dark-bg rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Thumbnail</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Name</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Species</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {pets.map((pet) => {
                                    const StatusIcon = statusConfig[pet.status]?.icon || FileText;
                                    const statusStyle = statusConfig[pet.status] || statusConfig.available;

                                    return (
                                        <tr key={pet._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    <Image src={pet.images?.[0] || ''} alt={pet.name} width={48} height={48} className="object-cover w-full h-full" />
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="font-semibold text-gray-900 dark:text-white">{pet.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{pet.age} months</p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="text-gray-700 dark:text-gray-300 capitalize">{pet.species}, {pet.breed}</p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle.className}`}>
                                                    <StatusIcon size={14} />
                                                    {statusStyle.label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <PetActions petId={pet._id} petName={pet.name} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden space-y-4">
                    {pets.map((pet) => {
                        const StatusIcon = statusConfig[pet.status]?.icon || FileText;
                        const statusStyle = statusConfig[pet.status] || statusConfig.available;

                        return (
                            <div key={pet._id} className="bg-white dark:bg-def-dark-bg rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                        <Image src={pet.images?.[0] || ''} alt={pet.name} width={80} height={80} className="object-cover w-full h-full" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg capitalize">{pet.name}</h3>
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyle.className}`}>
                                                <StatusIcon size={12} />
                                                {statusStyle.label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 capitalize">
                                            {pet.species}, {pet.breed} &bull; {pet.age} months
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <Link href={`/pets/${pet._id}`} className="flex-1 py-3 px-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-200 active:scale-95 text-center">
                                        View Listing
                                    </Link>
                                    <div className="flex items-center">
                                        <PetActions petId={pet._id} petName={pet.name} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
