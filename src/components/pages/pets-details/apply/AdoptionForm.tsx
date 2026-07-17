// components/AdoptionForm.tsx
'use client';

import { AdoptionFormData } from "@/types/AdoptionFormData";

interface AdoptionFormProps {
    step: number;
    formData: AdoptionFormData;
    updateFormData: (field: string, value: unknown) => void;
    petName: string;
}

export default function AdoptionForm({
    step,
    formData,
    updateFormData,
    petName
}: AdoptionFormProps) {
    const inputClass = "w-full px-4 py-3 bg-white dark:bg-def-dark-bg border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all";
    const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";
    const requiredClass = "text-red-500";

    // Step 1: Personal Information
    if (step === 1) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Personal Information
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Let&apos;s start with some basic information about you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>
                            First Name <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                            className={inputClass}
                            placeholder="John"
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Last Name <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => updateFormData('lastName', e.target.value)}
                            className={inputClass}
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>
                            Email Address <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className={inputClass}
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Phone Number <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            className={inputClass}
                            placeholder="(555) 123-4567"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>
                        Street Address <span className={requiredClass}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                        className={inputClass}
                        placeholder="123 Main Street"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <label className={labelClass}>
                            City <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateFormData('city', e.target.value)}
                            className={inputClass}
                            placeholder="Seattle"
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            State <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => updateFormData('state', e.target.value)}
                            className={inputClass}
                            placeholder="WA"
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            ZIP Code <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => updateFormData('zipCode', e.target.value)}
                            className={inputClass}
                            placeholder="98101"
                            required
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Housing Information
    if (step === 2) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Housing Information
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Tell us about your living situation.
                    </p>
                </div>

                <div>
                    <label className={labelClass}>
                        Type of Home <span className={requiredClass}>*</span>
                    </label>
                    <select
                        value={formData.housingType}
                        onChange={(e) => updateFormData('housingType', e.target.value)}
                        className={inputClass}
                        required
                    >
                        <option value="">Select housing type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>
                        Do you own or rent? <span className={requiredClass}>*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => updateFormData('ownOrRent', 'own')}
                            className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${formData.ownOrRent === 'own'
                                    ? 'border-primary bg-primary/10 text-primary dark:bg-primary/20'
                                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary/50'
                                }`}
                        >
                            Own
                        </button>
                        <button
                            type="button"
                            onClick={() => updateFormData('ownOrRent', 'rent')}
                            className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${formData.ownOrRent === 'rent'
                                    ? 'border-primary bg-primary/10 text-primary dark:bg-primary/20'
                                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary/50'
                                }`}
                        >
                            Rent
                        </button>
                    </div>
                </div>

                {formData.ownOrRent === 'rent' && (
                    <div>
                        <label className={labelClass}>
                            Do you have landlord approval for a pet? <span className={requiredClass}>*</span>
                        </label>
                        <select
                            value={formData.landlordApproval}
                            onChange={(e) => updateFormData('landlordApproval', e.target.value)}
                            className={inputClass}
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="yes">Yes, in writing</option>
                            <option value="verbal">Yes, verbal approval</option>
                            <option value="no">No</option>
                            <option value="unsure">Not sure yet</option>
                        </select>
                    </div>
                )}

                <div>
                    <label className={labelClass}>
                        Do you have a yard? <span className={requiredClass}>*</span>
                    </label>
                    <select
                        value={formData.hasYard}
                        onChange={(e) => updateFormData('hasYard', e.target.value)}
                        className={inputClass}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="yes-fenced">Yes, fenced</option>
                        <option value="yes-unfenced">Yes, unfenced</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {formData.hasYard !== 'no' && (
                    <div>
                        <label className={labelClass}>Approximate yard size</label>
                        <select
                            value={formData.yardSize}
                            onChange={(e) => updateFormData('yardSize', e.target.value)}
                            className={inputClass}
                        >
                            <option value="">Select size</option>
                            <option value="small">Small (under 500 sq ft)</option>
                            <option value="medium">Medium (500-1000 sq ft)</option>
                            <option value="large">Large (1000+ sq ft)</option>
                        </select>
                    </div>
                )}
            </div>
        );
    }

    // Step 3: Household
    if (step === 3) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Household Members
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Who else lives in your home?
                    </p>
                </div>

                <div>
                    <label className={labelClass}>
                        How many people live in your household? <span className={requiredClass}>*</span>
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={formData.householdMembers}
                        onChange={(e) => updateFormData('householdMembers', e.target.value)}
                        className={inputClass}
                        placeholder="2"
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Do you have children? If yes, please list their ages.
                    </label>
                    <input
                        type="text"
                        value={formData.childrenAges}
                        onChange={(e) => updateFormData('childrenAges', e.target.value)}
                        className={inputClass}
                        placeholder="e.g., 5, 8, 12 or N/A"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        This helps us ensure {petName} is a good match for your family.
                    </p>
                </div>

                <div>
                    <label className={labelClass}>
                        Do you currently have other pets? <span className={requiredClass}>*</span>
                    </label>
                    <select
                        value={formData.otherPets}
                        onChange={(e) => updateFormData('otherPets', e.target.value)}
                        className={inputClass}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="no">No</option>
                        <option value="yes-dogs">Yes, dogs</option>
                        <option value="yes-cats">Yes, cats</option>
                        <option value="yes-both">Yes, both dogs and cats</option>
                        <option value="yes-other">Yes, other pets</option>
                    </select>
                </div>

                {formData.otherPets !== 'no' && (
                    <div>
                        <label className={labelClass}>
                            Please describe your current pets (breed, age, temperament)
                        </label>
                        <textarea
                            value={formData.otherPetsDetails}
                            onChange={(e) => updateFormData('otherPetsDetails', e.target.value)}
                            className={`${inputClass} h-24 resize-none`}
                            placeholder="e.g., Max - Golden Retriever, 5 years old, friendly and calm..."
                        />
                    </div>
                )}
            </div>
        );
    }

    // Step 4: Experience & Plans
    if (step === 4) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Pet Experience & Care Plans
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Tell us about your experience and plans for {petName}.
                    </p>
                </div>

                <div>
                    <label className={labelClass}>
                        Have you owned pets before? <span className={requiredClass}>*</span>
                    </label>
                    <select
                        value={formData.previousPets}
                        onChange={(e) => updateFormData('previousPets', e.target.value)}
                        className={inputClass}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="yes-dogs">Yes, dogs</option>
                        <option value="yes-cats">Yes, cats</option>
                        <option value="yes-both">Yes, both</option>
                        <option value="no">No, this would be my first pet</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>
                        Describe your experience with pets
                    </label>
                    <textarea
                        value={formData.petExperience}
                        onChange={(e) => updateFormData('petExperience', e.target.value)}
                        className={`${inputClass} h-24 resize-none`}
                        placeholder="Tell us about your past experiences with pets, training, veterinary care, etc."
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Why do you want to adopt {petName}? <span className={requiredClass}>*</span>
                    </label>
                    <textarea
                        value={formData.whyAdopt}
                        onChange={(e) => updateFormData('whyAdopt', e.target.value)}
                        className={`${inputClass} h-24 resize-none`}
                        placeholder="What attracted you to this pet? What kind of home can you provide?"
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        What is your typical daily schedule?
                    </label>
                    <select
                        value={formData.workSchedule}
                        onChange={(e) => updateFormData('workSchedule', e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Select an option</option>
                        <option value="home-most">Home most of the day</option>
                        <option value="work-standard">Standard work hours (9-5)</option>
                        <option value="work-long">Long hours (10+ hours away)</option>
                        <option value="variable">Variable/shift work</option>
                        <option value="retired">Retired</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>
                        What are your plans for exercise, training, and care?
                    </label>
                    <textarea
                        value={formData.petCarePlan}
                        onChange={(e) => updateFormData('petCarePlan', e.target.value)}
                        className={`${inputClass} h-24 resize-none`}
                        placeholder="How will you handle exercise, grooming, veterinary care, training, etc.?"
                    />
                </div>
            </div>
        );
    }

    // Step 5: Review & Submit
    if (step === 5) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Review & Submit
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Please review your application and agree to the terms.
                    </p>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Application Summary</h4>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Name:</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {formData.firstName} {formData.lastName}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Email:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{formData.email}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                            <p className="font-medium text-gray-900 dark:text-white">{formData.phone}</p>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Location:</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {formData.city}, {formData.state}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Housing:</span>
                            <p className="font-medium text-gray-900 dark:text-white capitalize">
                                {formData.housingType} ({formData.ownOrRent})
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Household:</span>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {formData.householdMembers} people
                            </p>
                        </div>
                    </div>
                </div>

                {/* Agreements */}
                <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50"
                            required
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            I understand that adoption fees are non-refundable and cover vaccinations,
                            spay/neuter, and microchipping.
                        </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.agreeToHomeVisit}
                            onChange={(e) => updateFormData('agreeToHomeVisit', e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50"
                            required
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            I agree to a potential home visit or virtual meeting as part of the adoption process.
                        </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.agreeToInfoAccuracy}
                            onChange={(e) => updateFormData('agreeToInfoAccuracy', e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50"
                            required
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            I certify that all information provided in this application is true and accurate.
                            I understand that false information may result in denial of my application.
                        </span>
                    </label>
                </div>

                <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 border border-primary/20">
                    <p className="text-sm text-primary dark:text-primary/90 font-medium">
                        ✓ Application fee: $25 (non-refundable)
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        This fee will be charged upon submission and covers processing costs.
                    </p>
                </div>
            </div>
        );
    }

    return null;
}