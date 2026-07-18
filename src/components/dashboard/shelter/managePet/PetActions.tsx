'use client';

import { useState, useTransition } from 'react';
import { Eye, Trash2, AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';
import { deletePetAction } from '@/lib/actions/deletePetAction';
import { toast } from 'react-toastify';

interface PetActionsProps {
  petId: string;
  petName: string;
}

export default function PetActions({ petId, petName }: PetActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePetAction(petId);
      if (result.success) {
        toast.success(`${petName} has been removed.`);
        setIsModalOpen(false);
      } else {
        toast.error(result.error || 'Something went wrong.');
      }
    });
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Link
          href={`/pets/${petId}`}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-primary"
          title="View Listing"
        >
          <Eye size={18} />
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          title="Delete Listing"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => !isPending && setIsModalOpen(false)} 
          />
          
          <div className="relative bg-white dark:bg-def-dark-bg rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => !isPending && setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>

            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-red-600 dark:text-red-400" />
            </div>
            
            <h2 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white text-center mb-2">
              Remove this listing?
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              You are about to delete the listing for <span className="font-semibold text-gray-900 dark:text-white">{petName}</span>. This action cannot be undone and all associated data will be lost.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isPending}
                className="flex-1 py-3 px-4 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}