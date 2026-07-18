import { Suspense } from 'react';
import Link from 'next/link';
import {
    Clock,
    CheckCircle,
    MessageCircle,
    XCircle,
    Home,
    Archive,
    PawPrint,
    Heart,
    Calendar,
} from 'lucide-react';
import { AdopterApplication } from '@/types/adopterApplication';
import ApplicationCard from '@/components/dashboard/adopter/manageApplicatins/ApplicationCard';
import { getUserSession } from '@/lib/core/session';

async function getAdopterApplications(userId: string): Promise<AdopterApplication[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/adoption/get?applicantId=${userId}`,
            { cache: 'no-store' }
        );

        if (!res.ok) {
            return [];
        }

        return await res.json();
    } catch {
        return [];
    }
}

const statusConfig = {
    pending: {
        label: 'Pending',
        className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        icon: Clock,
        color: 'gray'
    },
    under_review: {
        label: 'Under Review',
        className: 'bg-tertiary/20 text-tertiary dark:bg-tertiary/30',
        icon: MessageCircle,
        color: 'amber'
    },
    approved: {
        label: 'Approved',
        className: 'bg-secondary/20 text-secondary dark:bg-secondary/30',
        icon: CheckCircle,
        color: 'green'
    },
    interview_scheduled: {
        label: 'Interview Scheduled',
        className: 'bg-primary/20 text-primary dark:bg-primary/30',
        icon: Calendar,
        color: 'blue'
    },
    adopted: {
        label: 'Adopted',
        className: 'bg-neutral/20 text-neutral dark:bg-neutral/30',
        icon: Home,
        color: 'gray'
    },
    rejected: {
        label: 'Not Selected',
        className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
        icon: XCircle,
        color: 'red'
    },
    withdrawn: {
        label: 'Withdrawn',
        className: 'bg-neutral/20 text-neutral dark:bg-neutral/30',
        icon: Archive,
        color: 'gray'
    },
};

export default async function MyApplicationsPage() {
    const session = await getUserSession();
    const userId = session?.user?.id || '';
    const applications = await getAdopterApplications(userId);

    // Empty State
    if (applications.length === 0) {
        return (
            <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white dark:bg-def-dark-bg rounded-3xl p-12 lg:p-16 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="max-w-md mx-auto">
                            {/* Illustration Placeholder */}
                            <div className="w-64 h-64 mx-auto mb-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                                <div className="text-center">
                                    <Heart size={64} className="mx-auto mb-4 text-primary" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Your Forever Friend Awaits!</p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
                                You haven&apos;t applied to adopt anyone yet
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                When you find a pet that captures your heart, start an application and it will appear here for you to track.
                            </p>
                            <Link
                                href="/pets"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95"
                            >
                                <PawPrint size={20} />
                                Browse Pets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const activeApplications = applications.filter(app =>
        ['pending', 'under_review', 'approved', 'interview_scheduled'].includes(app.status)
    );

    const pastApplications = applications.filter(app =>
        ['adopted', 'rejected', 'withdrawn'].includes(app.status)
    );

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                        My Applications
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track your adoption applications and next steps
                    </p>
                </div>

                {/* Active Applications */}
                {activeApplications.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-primary" />
                            Active Applications
                        </h2>
                        <div className="space-y-4">
                            {activeApplications.map((application) => (
                                <Suspense key={application._id} fallback={<div className="h-48 bg-white dark:bg-def-dark-bg rounded-2xl animate-pulse" />}>
                                    <ApplicationCard
                                        application={application}
                                        statusConfig={statusConfig}
                                    />
                                </Suspense>
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Applications */}
                {pastApplications.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Archive size={18} className="text-neutral" />
                            Past Applications
                        </h2>
                        <div className="space-y-4">
                            {pastApplications.map((application) => (
                                <Suspense key={application._id} fallback={<div className="h-48 bg-white dark:bg-def-dark-bg rounded-2xl animate-pulse" />}>
                                    <ApplicationCard
                                        application={application}
                                        statusConfig={statusConfig}
                                    />
                                </Suspense>
                            ))}
                        </div>
                    </div>
                )}

                {/* Help Section */}
                <div className="mt-12 bg-primary/10 dark:bg-primary/20 rounded-3xl p-8 border border-primary/20">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
                            Need help with your application?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Our adoption counselors are available to answer any questions about the process or help you find another match.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/help-center"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-def-dark-bg text-primary hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-full transition-all duration-200 border border-primary/20"
                            >
                                <MessageCircle size={18} />
                                Visit Help Center
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-200"
                            >
                                <MessageCircle size={18} />
                                Live Chat
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}