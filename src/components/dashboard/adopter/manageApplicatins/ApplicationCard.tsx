'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ChevronRight,
    Building2,
    Calendar,
    CheckCircle,
    MessageCircle,
    Archive,
    ExternalLink
} from 'lucide-react';
import { AdopterApplication } from '@/types/adopterApplication';

interface StatusConfigEntry {
    label: string;
    className: string;
    icon: React.ComponentType<{ size?: number }>;
    color: string;
}

interface ApplicationCardProps {
    application: AdopterApplication;
    statusConfig: Record<string, StatusConfigEntry>;
}

export default function ApplicationCard({ application, statusConfig }: ApplicationCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const status = statusConfig[application.status];
    const StatusIcon = status.icon;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className={`bg-white dark:bg-def-dark-bg rounded-2xl border transition-all duration-300 overflow-hidden ${application.status === 'adopted' || application.status === 'rejected'
                ? 'border-gray-200 dark:border-gray-800 opacity-75'
                : 'border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md'
            }`}>
            <div className="p-5 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                    {/* Pet Image & Info */}
                    <div className="flex items-start gap-4 flex-1">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                            <Image
                                src={application.petImage}
                                alt={application.petName}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                                        {application.petName}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{application.petBreed}</p>
                                </div>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${status.className}`}>
                                    <StatusIcon size={14} />
                                    {status.label}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <Building2 size={14} className="text-primary" />
                                    <span className="truncate">{application.shelter.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-secondary" />
                                    <span>Submitted {formatDate(application.submittedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 lg:border-l lg:border-gray-100 lg:dark:border-gray-800 lg:pl-5">
                        {application.status === 'approved' && (
                            <Link
                                href={`/pets/${application.petId}`}
                                className="flex-1 lg:flex-none px-4 py-2.5 bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-md active:scale-95 whitespace-nowrap"
                            >
                                Arrange Pickup
                            </Link>
                        )}

                        {application.status === 'under_review' && (
                            <Link
                                href={`/shelter/${application.shelter.id}`}
                                className="flex-1 lg:flex-none px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap"
                            >
                                Message Shelter
                            </Link>
                        )}

                        {application.status === 'adopted' && (
                            <button
                                disabled
                                className="flex-1 lg:flex-none px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-semibold rounded-full cursor-not-allowed"
                            >
                                Application Closed
                            </button>
                        )}

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-400"
                        >
                            <ChevronRight size={20} className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2 duration-200">
                        {application.nextSteps && (
                            <div className="bg-secondary/10 dark:bg-secondary/20 rounded-xl p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Next Steps</h4>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{application.nextSteps}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {application.message && (
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <MessageCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Message from Shelter</h4>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{application.message}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {application.status !== 'adopted' && application.status !== 'rejected' && (
                            <div className="flex items-center justify-between pt-2">
                                <Link
                                    href={`/applications/${application._id}`}
                                    className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                                >
                                    View Application Details
                                    <ExternalLink size={14} />
                                </Link>

                                {application.canArchive && (
                                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center gap-1">
                                        <Archive size={14} />
                                        Archive
                                    </button>
                                )}
                            </div>
                        )}

                        {application.status === 'adopted' && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center">
                                Don&apos;t be discouraged! Your perfect companion is still out there waiting for you.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}