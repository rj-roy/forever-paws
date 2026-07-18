'use client';

import { useState } from 'react';
import ListAPetModal from '@/components/pages/listAPet/ListAPetModal';

const ListAPet = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg px-4 py-10">
            <div className="mx-auto max-w-3xl rounded-3xl bg-white dark:bg-gray-900 p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">List a Pet for Adoption</h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                    Start the adoption listing process and help a pet find a forever home.
                </p>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
                >
                    Open Listing Form
                </button>
            </div>

            <ListAPetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ListAPet;