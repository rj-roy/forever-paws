import { Suspense } from 'react';
import Image from 'next/image';
import { Calendar, Mail, Heart, FileText, Shield } from 'lucide-react';
import ProfileForm from '@/components/dashboard/profile/ProfileForm';
import { getUserSession } from '@/lib/core/session';

export default async function ProfilePage() {
    const session = await getUserSession();
    const user = session?.user;


    if (!user) {
        return (
            <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">Please sign in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-1">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                        My Profile
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your personal information and adoption preferences.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile Summary Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-def-dark-bg rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">
                            {/* Decorative top accent */}
                            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/20" />

                            <div className="relative z-10">
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-def-dark-bg shadow-md bg-gray-100 dark:bg-gray-800">
                                        <Image
                                            src={user?.profileImage ?? "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png"}
                                            alt={user?.name ?? "user"}
                                            fill
                                            className="object-cover"
                                            sizes="128px"
                                            priority
                                        />
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-1">
                                    {user?.name}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                    Member since{" "}
                                    {new Date(user?.createdAt ?? "").toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>

                                <div className="space-y-3 text-left">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Mail size={18} className="text-primary flex-shrink-0" />
                                        <span className="truncate">{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar size={18} className="text-secondary flex-shrink-0" />
                                        <span>
                                            Member since{" "}
                                            {new Date(user?.createdAt ?? "").toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                        <Heart size={20} className="mx-auto mb-1 text-tertiary" />
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">

                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Favorites</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                        <FileText size={20} className="mx-auto mb-1 text-primary" />
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Applications</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="bg-secondary/10 dark:bg-secondary/20 rounded-2xl p-5 border border-secondary/20">
                            <div className="flex gap-3">
                                <Shield size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Account Secure</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Your data is encrypted and only shared with shelters when you submit an adoption application.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Edit Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-def-dark-bg rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                                    Personal Information
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Update your details to ensure shelters can reach you easily.
                                </p>
                            </div>

                            <Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />}>
                                <ProfileForm user={user} />
                            </Suspense>
                        </div>

                        {/* Password Change Section (Optional but recommended) */}
                        <div className="mt-6 bg-white dark:bg-def-dark-bg rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                                Password & Security
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Change your password to keep your account secure.
                            </p>
                            <button className="px-6 py-2.5 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-full font-medium transition-all duration-200">
                                Change Password
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}