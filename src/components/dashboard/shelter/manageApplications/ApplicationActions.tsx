'use client';

import { useState, useTransition } from 'react';
import { Eye, CheckCircle, XCircle, Calendar, Mail, Phone, MapPin, Home, Users, X } from 'lucide-react';
import { AdoptionApplication } from '@/types/AdoptionApplication';
import { updateApplicationStatusAction } from '@/lib/actions/updateApplicationStatusAction';
import { toast } from 'react-toastify';

interface ApplicationActionsProps {
    application: AdoptionApplication;
}

const statusConfig = {
    pending: { label: 'Pending Review', className: 'bg-tertiary/20 text-tertiary dark:bg-tertiary/30' },
    approved: { label: 'Approved', className: 'bg-secondary/20 text-secondary dark:bg-secondary/30' },
    rejected: { label: 'Rejected', className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
    interview_scheduled: { label: 'Interview Scheduled', className: 'bg-primary/20 text-primary dark:bg-primary/30' },
};

export default function ApplicationActions({ application }: ApplicationActionsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleStatusUpdate = (newStatus: 'approved' | 'rejected' | 'interview_scheduled') => {
        startTransition(async () => {
            const result = await updateApplicationStatusAction(application._id, newStatus);
            if (result.success) {
                toast.success(result.message);
                setIsModalOpen(false);
            } else {
                toast.error(result.error || 'Something went wrong.');
            }
        });
    };

    const currentStatus = statusConfig[application.status];

    return (
        <>
            {/* Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-200"
            >
                <Eye size={16} />
                Review
            </button>

            {/* Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isPending && setIsModalOpen(false)} />

                    <div className="relative min-h-screen flex items-center justify-center p-4">
                        <div className="relative bg-[#FFF9F2] dark:bg-def-dark-bg rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">

                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white dark:bg-def-dark-bg border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
                                <div>
                                    <h2 className="text-xl font-bold font-poppins text-gray-900 dark:text-white">
                                        Application for {application.petName}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Submitted on {new Date(application.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => !isPending && setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="overflow-y-auto p-6 space-y-6 flex-1">
                                {/* Applicant Info */}
                                <div className="bg-white dark:bg-def-dark-bg rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Users size={18} className="text-primary" /> Applicant Information
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Name</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{application.applicant.firstName} {application.applicant.lastName}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Email</p>
                                            <a href={`mailto:${application.applicant.email}`} className="font-medium text-primary hover:underline flex items-center gap-1">
                                                <Mail size={14} /> {application.applicant.email}
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Phone</p>
                                            <a href={`tel:${application.applicant.phone}`} className="font-medium text-primary hover:underline flex items-center gap-1">
                                                <Phone size={14} /> {application.applicant.phone}
                                            </a>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Address</p>
                                            <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                                                <MapPin size={14} /> {application.applicant.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Housing & Household */}
                                <div className="bg-white dark:bg-def-dark-bg rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Home size={18} className="text-secondary" /> Housing & Household
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Home Type</p>
                                            <p className="font-medium text-gray-900 dark:text-white capitalize">{application.housing.type} ({application.housing.ownership})</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Yard</p>
                                            <p className="font-medium text-gray-900 dark:text-white capitalize">{application.housing.hasYard}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Household Size</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{application.household.membersCount} people</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Other Pets</p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {application.household.hasOtherPets ? 'Yes' : 'No'}
                                                {application.household.otherPetsDetails && ` (${application.household.otherPetsDetails})`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience & Why Adopt */}
                                <div className="bg-white dark:bg-def-dark-bg rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <CheckCircle size={18} className="text-tertiary" /> Experience & Motivation
                                    </h3>
                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400 mb-1">Previous Pet Experience</p>
                                            <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                                                {application.experience.previousPets || 'None specified'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400 mb-1">Why they want to adopt {application.petName}</p>
                                            <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                                                {application.experience.whyAdopt}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer Actions */}
                            <div className="sticky bottom-0 bg-white dark:bg-def-dark-bg border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end">
                                {application.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusUpdate('rejected')}
                                            disabled={isPending}
                                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full font-semibold transition-all duration-200 disabled:opacity-50"
                                        >
                                            <XCircle size={18} />
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate('interview_scheduled')}
                                            disabled={isPending}
                                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 rounded-full font-semibold transition-all duration-200 disabled:opacity-50"
                                        >
                                            <Calendar size={18} />
                                            Schedule Interview
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate('approved')}
                                            disabled={isPending}
                                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-full font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                                        >
                                            <CheckCircle size={18} />
                                            Approve Application
                                        </button>
                                    </>
                                )}

                                {application.status !== 'pending' && (
                                    <div className="w-full text-center">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${currentStatus.className}`}>
                                            Current Status: {currentStatus.label}
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            An automated email has been sent to the applicant regarding this status.
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}