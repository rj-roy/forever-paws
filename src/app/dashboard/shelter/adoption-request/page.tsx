import { FileText, CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AdoptionApplication } from '@/types/AdoptionApplication';
import ApplicationActions from '@/components/dashboard/shelter/manageApplications/ApplicationActions';
import { getUserSession } from '@/lib/core/session';

async function getApplications(shelterId: string, filter: string = 'all'): Promise<AdoptionApplication[]> {
    try {
        const query = filter !== 'all' ? `&status=${filter}` : '';
        const res = await fetch(
            `http://localhost:5000/api/v1/adoption/get?shelterId=${shelterId}${query}`,
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
    pending: { label: 'Pending', className: 'bg-tertiary/20 text-tertiary dark:bg-tertiary/30', icon: Clock },
    approved: { label: 'Approved', className: 'bg-secondary/20 text-secondary dark:bg-secondary/30', icon: CheckCircle },
    rejected: { label: 'Rejected', className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300', icon: XCircle },
    interview_scheduled: { label: 'Interview', className: 'bg-primary/20 text-primary dark:bg-primary/30', icon: Calendar },
};

interface ApplicationsPageProps {
    searchParams: Promise<{ filter?: string }>;
}

export default async function ApplicationsPage({ searchParams }: ApplicationsPageProps) {
    const params = await searchParams;
    const filter = params.filter || 'all';

    const session = await getUserSession();
    const shelterId = session?.user?.id || '';

    const applications = await getApplications(shelterId, filter);

    if (applications.length === 0) {
        return (
            <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white dark:bg-def-dark-bg rounded-3xl p-12 lg:p-16 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText size={48} className="text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-3">
                            No applications found
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            {filter === 'all'
                                ? "You haven't received any adoption applications yet. Keep up the great work listing your pets!"
                                : `No applications match the "${filter}" status.`}
                        </p>
                        <Link href="/shelter/manage-pets" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95">
                            View Your Pets
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const pendingCount = applications.filter(a => a.status === 'pending').length;

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header & Stats */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                            Manage Applications
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Review and respond to adoption requests for your shelter.
                        </p>
                    </div>

                    {pendingCount > 0 && (
                        <div className="inline-flex items-center gap-3 px-5 py-3 bg-tertiary/10 dark:bg-tertiary/20 border border-tertiary/20 rounded-2xl">
                            <Clock size={20} className="text-tertiary" />
                            <span className="font-semibold text-gray-900 dark:text-white">{pendingCount} Pending Review</span>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[
                        { value: 'all', label: 'All Applications' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'interview_scheduled', label: 'Interviews' },
                        { value: 'approved', label: 'Approved' },
                        { value: 'rejected', label: 'Rejected' },
                    ].map((tab) => (
                        <Link
                            key={tab.value}
                            href={`/shelter/applications?filter=${tab.value}`}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === tab.value
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white dark:bg-def-dark-bg text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
                                }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-white dark:bg-def-dark-bg rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Applicant</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Pet</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {applications.map((app) => {
                                const StatusIcon = statusConfig[app.status].icon;
                                const statusStyle = statusConfig[app.status];

                                return (
                                    <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="py-4 px-6">
                                            <p className="font-semibold text-gray-900 dark:text-white">{app.applicant.firstName} {app.applicant.lastName}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{app.applicant.email}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                                    <Image src={app.petImage} alt={app.petName} width={40} height={40} className="object-cover w-full h-full" />
                                                </div>
                                                <span className="font-medium text-gray-700 dark:text-gray-300">{app.petName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle.className}`}>
                                                <StatusIcon size={14} />
                                                {statusStyle.label}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <ApplicationActions application={app} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                    {applications.map((app) => {
                        const StatusIcon = statusConfig[app.status].icon;
                        const statusStyle = statusConfig[app.status];

                        return (
                            <div key={app._id} className="bg-white dark:bg-def-dark-bg rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                            <Image src={app.petImage} alt={app.petName} width={48} height={48} className="object-cover w-full h-full" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{app.petName}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{app.applicant.firstName} {app.applicant.lastName}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle.className}`}>
                                        <StatusIcon size={12} />
                                        {statusStyle.label}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </span>
                                    <ApplicationActions application={app} />
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}