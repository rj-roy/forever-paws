'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import AdoptionForm from './AdoptionForm';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { authHeader } from '@/lib/core/JWT';

interface AdoptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    petId: string;
    petName: string;
}

export default function AdoptionModal({
    isOpen,
    onClose,
    petId,
    petName
}: AdoptionModalProps) {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',

        // Housing
        housingType: '',
        ownOrRent: '',
        hasYard: '',
        yardSize: '',
        landlordApproval: '',

        // Household
        householdMembers: '',
        childrenAges: '',
        otherPets: '',
        otherPetsDetails: '',

        // Experience
        petExperience: '',
        previousPets: '',

        // This Pet
        whyAdopt: '',
        workSchedule: '',
        petCarePlan: '',

        // References
        reference1Name: '',
        reference1Phone: '',
        reference1Relation: '',
        reference2Name: '',
        reference2Phone: '',
        reference2Relation: '',

        // Agreements
        agreeToTerms: false,
        agreeToHomeVisit: false,
        agreeToInfoAccuracy: false,
    });

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const updateFormData = (field: string, value: unknown) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const headers = new Headers();
        const auth = await authHeader();

        Object.entries(auth).forEach(([key, value]) => {
            headers.append(key, value);
        });


        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/adoption/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(await authHeader())
                },
                body: JSON.stringify({
                    petId,
                    ...formData,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to submit application');
            };

            toast.success("Application submitted successfully!");
            router.push('/dashboard/my-adoption');


        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-[#FFF9F2] dark:bg-def-dark-bg rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="sticky top-0 bg-white dark:bg-def-dark-bg border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                                Apply to Adopt
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {petName} • Step {currentStep} of 5
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X size={24} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center justify-between">
                            {[1, 2, 3, 4, 5].map((step) => (
                                <div key={step} className="flex items-center flex-1 last:flex-none">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step <= currentStep
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                        }`}>
                                        {step < currentStep ? '✓' : step}
                                    </div>
                                    {step < 5 && (
                                        <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${step < currentStep ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>About You</span>
                            <span>Home</span>
                            <span>Household</span>
                            <span>Experience</span>
                            <span>Review</span>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-280px)] px-6 py-6">
                        <AdoptionForm
                            step={currentStep}
                            formData={formData}
                            updateFormData={updateFormData}
                            petName={petName}
                        />
                    </div>

                    {/* Footer Navigation */}
                    <div className="sticky bottom-0 bg-white dark:bg-def-dark-bg border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-between">
                        <button
                            type="button"
                            onClick={currentStep === 1 ? onClose : prevStep}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-full font-medium transition-all duration-200"
                        >
                            <ChevronLeft size={18} />
                            {currentStep === 1 ? 'Cancel' : 'Back'}
                        </button>

                        {currentStep < 5 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white rounded-full font-semibold transition-all duration-200 hover:shadow-lg active:scale-95"
                            >
                                Continue
                                <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-8 py-3 bg-secondary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/80 text-white rounded-full font-semibold transition-all duration-200 hover:shadow-lg active:scale-95"
                            >
                                Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}