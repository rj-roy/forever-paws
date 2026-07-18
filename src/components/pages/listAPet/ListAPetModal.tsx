// components/ListPetModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import ListPetForm from './ListPetForm';

interface ListPetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function ListAPetModal({
    isOpen,
    onClose,
    onSuccess
}: ListPetModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        // Basic Info
        name: '',
        species: '',
        breed: '',
        age: '',
        ageUnit: 'years',
        gender: '',
        size: '',
        weight: '',

        // Description
        shortDescription: '',
        fullDescription: '',

        // Health
        vaccinated: false,
        spayedNeutered: false,
        microchipped: false,
        healthCertificate: false,
        healthNotes: '',

        // Temperament
        temperamentTags: [] as string[],

        // Location & Contact
        city: '',
        state: '',
        shelterName: '',
        contactEmail: '',
        contactPhone: '',

        // Adoption
        adoptionFee: '',
        status: 'available',
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

    const updateFormData = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files).slice(0, 6 - images.length);
        const newPreviews: string[] = [];

        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                if (newPreviews.length === newFiles.length) {
                    setImagePreviews(prev => [...prev, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });

        setImages(prev => [...prev, ...newFiles]);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const toggleTemperamentTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            temperamentTags: prev.temperamentTags.includes(tag)
                ? prev.temperamentTags.filter(t => t !== tag)
                : [...prev.temperamentTags, tag]
        }));
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

        // Validate required fields
        const requiredFields = ['name', 'species', 'breed', 'age', 'gender', 'size', 'city', 'state', 'adoptionFee'];
        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            toast.error(`Please fill out all required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (images.length === 0) {
            toast.error('Please upload at least one photo of your pet');
            return;
        }

        setIsSubmitting(true);

        try {
            // Create form data for file upload
            const submitData = new FormData();

            // Add all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    submitData.append(key, JSON.stringify(value));
                } else {
                    submitData.append(key, String(value));
                }
            });

            // Add images
            images.forEach((image) => {
                submitData.append('images', image);
            });

            const response = await fetch('/api/v1/pets/create', {
                method: 'POST',
                body: submitData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to list pet');
            }

            toast.success('Pet listed successfully!');

            // Reset form
            setFormData({
                name: '',
                species: '',
                breed: '',
                age: '',
                ageUnit: 'years',
                gender: '',
                size: '',
                weight: '',
                shortDescription: '',
                fullDescription: '',
                vaccinated: false,
                spayedNeutered: false,
                microchipped: false,
                healthCertificate: false,
                healthNotes: '',
                temperamentTags: [],
                city: '',
                state: '',
                shelterName: '',
                contactEmail: '',
                contactPhone: '',
                adoptionFee: '',
                status: 'available',
            });
            setImages([]);
            setImagePreviews([]);
            setCurrentStep(1);

            onClose();
            onSuccess?.();

        } catch (error) {
            console.error('Error listing pet:', error);
        } finally {
            setIsSubmitting(false);
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
                <div className="relative bg-[#FFF9F2] dark:bg-def-dark-bg rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
                    {/* Header */}
                    <div className="sticky top-0 bg-white dark:bg-def-dark-bg border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                                List a Pet for Adoption
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Step {currentStep} of 5 • Help find them a forever home
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
                            <span>Basic Info</span>
                            <span>Photos</span>
                            <span>Details</span>
                            <span>Health</span>
                            <span>Review</span>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="overflow-y-auto max-h-[calc(95vh-280px)] px-6 py-6">
                        <ListPetForm
                            step={currentStep}
                            formData={formData}
                            updateFormData={updateFormData}
                            images={images}
                            imagePreviews={imagePreviews}
                            handleImageUpload={handleImageUpload}
                            removeImage={removeImage}
                            toggleTemperamentTag={toggleTemperamentTag}
                        />
                    </div>

                    {/* Footer Navigation */}
                    <div className="sticky bottom-0 bg-white dark:bg-def-dark-bg border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-between">
                        <button
                            type="button"
                            onClick={currentStep === 1 ? onClose : prevStep}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-full font-medium transition-all duration-200 disabled:opacity-50"
                        >
                            <ChevronLeft size={18} />
                            {currentStep === 1 ? 'Cancel' : 'Back'}
                        </button>

                        {currentStep < 5 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white rounded-full font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                Continue
                                <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-8 py-3 bg-secondary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/80 text-white rounded-full font-semibold transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Listing...
                                    </>
                                ) : (
                                    <>
                                        List Pet for Adoption
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}