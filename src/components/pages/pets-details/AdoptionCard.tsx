'use client';

import { useState } from 'react';
import { Eye, FileText, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import AdoptionModal from './apply/ApplyModal';

interface AdoptionCardProps {
  fee: number;
  views?: number;
  applications?: number;
  petId: string;
  petName: string;
}

export default function AdoptionCard({ 
  fee, 
  views, 
  applications, 
  petId, 
  petName 
}: AdoptionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-def-dark-bg rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 dark:text-gray-400">Adoption Fee</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${fee}</span>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="block w-full py-3.5 px-4 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white text-center rounded-full font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 mb-4"
        >
          Apply to Adopt
        </button>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-4">
          <div className="flex gap-3">
            <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fees cover vaccinations, microchipping, and support our rescue operations.
            </p>
          </div>
        </div>

        {views && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <Eye size={16} />
            <span>{views} people viewed this pet today</span>
          </div>
        )}

        {applications && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <FileText size={16} />
            <span>{applications} applications already in progress</span>
          </div>
        )}

        <button className="w-full py-3 px-4 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-full font-medium transition-all duration-200">
          <Calendar size={18} className="inline mr-2 -mt-1" />
          Schedule a Visit
        </button>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-secondary" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Forever Paws Guarantee</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                30-day health guarantee & post-adoption support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Modal */}
      <AdoptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        petId={petId}
        petName={petName}
      />
    </>
  );
}