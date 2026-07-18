// components/ListPetForm.tsx
'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ListPetFormData {
    name: string;
    species: string;
    breed: string;
    age: string;
    ageUnit: string;
    gender: string;
    size: string;
    weight: string;
    shortDescription: string;
    fullDescription: string;
    vaccinated: boolean;
    spayedNeutered: boolean;
    microchipped: boolean;
    healthCertificate: boolean;
    healthNotes: string;
    temperamentTags: string[];
    city: string;
    state: string;
    shelterName: string;
    contactEmail: string;
    contactPhone: string;
    adoptionFee: string;
    status: string;
}

interface ListPetFormProps {
    step: number;
    formData: ListPetFormData;
    updateFormData: <K extends keyof ListPetFormData>(field: K, value: ListPetFormData[K]) => void;
    images: File[];
    imagePreviews: string[];
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (index: number) => void;
    toggleTemperamentTag: (tag: string) => void;
}

export default function ListPetForm({
    step,
    formData,
    updateFormData,
    images,
    imagePreviews,
    handleImageUpload,
    removeImage,
    toggleTemperamentTag,
}: ListPetFormProps) {
    const inputClass = "w-full px-4 py-3 bg-white dark:bg-def-dark-bg border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all";
    const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";
    const requiredClass = "text-red-500";

    const temperamentOptions = [
        'Good with Kids',
        'Good with Pets',
        'Good with Dogs',
        'Good with Cats',
        'Energetic',
        'Calm',
        'Playful',
        'Shy',
        'Friendly',
        'House Trained',
        'Crate Trained',
        'Leash Trained',
    ];

    // Step 1: Basic Information
    if (step === 1) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Basic Information
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Start with the essential details about your pet.
                    </p>
                </div>

                <div>
                    <label className={labelClass}>
                        Pet&apos;s Name <span className={requiredClass}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className={inputClass}
                        placeholder="e.g., Bella, Max, Luna"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>
                            Species <span className={requiredClass}>*</span>
                        </label>
                        <select
                            value={formData.species}
                            onChange={(e) => updateFormData('species', e.target.value)}
                            className={inputClass}
                            required
                        >
                            <option value="">Select species</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>
                            Breed <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.breed}
                            onChange={(e) => updateFormData('breed', e.target.value)}
                            className={inputClass}
                            placeholder="e.g., Golden Retriever, Tabby"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>
                            Age <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={formData.age}
                            onChange={(e) => updateFormData('age', e.target.value)}
                            className={inputClass}
                            placeholder="2"
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Age Unit</label>
                        <select
                            value={formData.ageUnit}
                            onChange={(e) => updateFormData('ageUnit', e.target.value)}
                            className={inputClass}
                        >
                            <option value="months">Months</option>
                            <option value="years">Years</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>
                            Gender <span className={requiredClass}>*</span>
                        </label>
                        <select
                            value={formData.gender}
                            onChange={(e) => updateFormData('gender', e.target.value)}
                            className={inputClass}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>
                            Size <span className={requiredClass}>*</span>
                        </label>
                        <select
                            value={formData.size}
                            onChange={(e) => updateFormData('size', e.target.value)}
                            className={inputClass}
                            required
                        >
                            <option value="">Select size</option>
                            <option value="small">Small (0-20 lbs)</option>
                            <option value="medium">Medium (20-50 lbs)</option>
                            <option value="large">Large (50-100 lbs)</option>
                            <option value="xlarge">Extra Large (100+ lbs)</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Weight (lbs)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={formData.weight}
                            onChange={(e) => updateFormData('weight', e.target.value)}
                            className={inputClass}
                            placeholder="e.g., 45"
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Photos
    if (step === 2) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Pet Photos
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Upload clear, recent photos. First photo will be the main image.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 group">
                            <Image
                                src={preview}
                                alt={`Pet photo ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="200px"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <X size={16} />
                            </button>
                            {index === 0 && (
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                                    Main
                                </div>
                            )}
                        </div>
                    ))}

                    {images.length < 6 && (
                        <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors bg-gray-50 dark:bg-gray-800/50">
                            <Upload size={32} className="text-gray-400 dark:text-gray-500" />
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {images.length === 0 ? 'Upload Photo' : `+${6 - images.length}`}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                multiple
                            />
                        </label>
                    )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Photo Tips:</strong> Use clear, well-lit photos showing your pet&apos;s face and full body.
                        Avoid filters or heavy editing. Show their personality!
                    </p>
                </div>
            </div>
        );
    }

    // Step 3: Details & Description
    if (step === 3) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Description & Personality
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Tell potential adopters about your pet&apos;s personality and needs.
                    </p>
                </div>

                <div>
                    <label className={labelClass}>
                        Short Description <span className={requiredClass}>*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.shortDescription}
                        onChange={(e) => updateFormData('shortDescription', e.target.value)}
                        className={inputClass}
                        placeholder="A brief one-sentence summary (e.g., 'A playful and affectionate pup looking for an active family')"
                        maxLength={150}
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formData.shortDescription.length}/150 characters
                    </p>
                </div>

                <div>
                    <label className={labelClass}>
                        Full Description <span className={requiredClass}>*</span>
                    </label>
                    <textarea
                        value={formData.fullDescription}
                        onChange={(e) => updateFormData('fullDescription', e.target.value)}
                        className={`${inputClass} h-40 resize-none`}
                        placeholder="Tell us about your pet's personality, habits, favorite activities, what kind of home they'd thrive in, any special needs, etc."
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Temperament & Traits
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {temperamentOptions.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTemperamentTag(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.temperamentTags.includes(tag)
                                        ? 'bg-secondary text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Select all that apply to help match with the right family
                    </p>
                </div>
            </div>
        );
    }

    // Step 4: Health & Location
    if (step === 4) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Health & Location
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Provide health information and where the pet is located.
                    </p>
                </div>

                {/* Health Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <input
                            type="checkbox"
                            checked={formData.vaccinated}
                            onChange={(e) => updateFormData('vaccinated', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50"
                        />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Vaccinated</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Up-to-date on shots</p>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <input
                            type="checkbox"
                            checked={formData.spayedNeutered}
                            onChange={(e) => updateFormData('spayedNeutered', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50"
                        />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Spayed/Neutered</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Already altered</p>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <input
                            type="checkbox"
                            checked={formData.microchipped}
                            onChange={(e) => updateFormData('microchipped', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50"
                        />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Microchipped</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">For identification</p>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <input
                            type="checkbox"
                            checked={formData.healthCertificate}
                            onChange={(e) => updateFormData('healthCertificate', e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/50"
                        />
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Health Certificate</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Vet examined</p>
                        </div>
                    </label>
                </div>

                <div>
                    <label className={labelClass}>Health Notes</label>
                    <textarea
                        value={formData.healthNotes}
                        onChange={(e) => updateFormData('healthNotes', e.target.value)}
                        className={`${inputClass} h-24 resize-none`}
                        placeholder="Any health conditions, medications, or special care needs..."
                    />
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
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
                </div>

                {/* Shelter/Contact Info */}
                <div>
                    <label className={labelClass}>Shelter/Rescue Name (if applicable)</label>
                    <input
                        type="text"
                        value={formData.shelterName}
                        onChange={(e) => updateFormData('shelterName', e.target.value)}
                        className={inputClass}
                        placeholder="e.g., Forever Paws Rescue"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>
                            Contact Email <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="email"
                            value={formData.contactEmail}
                            onChange={(e) => updateFormData('contactEmail', e.target.value)}
                            className={inputClass}
                            placeholder="contact@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Contact Phone <span className={requiredClass}>*</span>
                        </label>
                        <input
                            type="tel"
                            value={formData.contactPhone}
                            onChange={(e) => updateFormData('contactPhone', e.target.value)}
                            className={inputClass}
                            placeholder="(555) 123-4567"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>
                        Adoption Fee ($) <span className={requiredClass}>*</span>
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={formData.adoptionFee}
                        onChange={(e) => updateFormData('adoptionFee', e.target.value)}
                        className={inputClass}
                        placeholder="250"
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Suggested: $50-$500 depending on species and age
                    </p>
                </div>
            </div>
        );
    }

    // Step 5: Review
    if (step === 5) {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-poppins">
                        Review & Submit
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Please review all information before listing your pet.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="space-y-4">
                    {/* Basic Info Summary */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Basic Information</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Name:</span>
                                <p className="font-medium text-gray-900 dark:text-white">{formData.name}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Species:</span>
                                <p className="font-medium text-gray-900 dark:text-white capitalize">{formData.species}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Breed:</span>
                                <p className="font-medium text-gray-900 dark:text-white">{formData.breed}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Age:</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {formData.age} {formData.ageUnit}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Gender:</span>
                                <p className="font-medium text-gray-900 dark:text-white capitalize">{formData.gender}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Size:</span>
                                <p className="font-medium text-gray-900 dark:text-white capitalize">{formData.size}</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Summary */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Location & Contact</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Location:</span>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {formData.city}, {formData.state}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Adoption Fee:</span>
                                <p className="font-medium text-gray-900 dark:text-white">${formData.adoptionFee}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                                <p className="font-medium text-gray-900 dark:text-white">{formData.contactEmail}</p>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                                <p className="font-medium text-gray-900 dark:text-white">{formData.contactPhone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Health Summary */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Health Status</h4>
                        <div className="flex flex-wrap gap-2">
                            {formData.vaccinated && (
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm">
                                    ✓ Vaccinated
                                </span>
                            )}
                            {formData.spayedNeutered && (
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm">
                                    ✓ Spayed/Neutered
                                </span>
                            )}
                            {formData.microchipped && (
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm">
                                    ✓ Microchipped
                                </span>
                            )}
                            {formData.healthCertificate && (
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm">
                                    ✓ Health Certificate
                                </span>
                            )}
                            {!formData.vaccinated && !formData.spayedNeutered && !formData.microchipped && !formData.healthCertificate && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">No health information provided</p>
                            )}
                        </div>
                    </div>

                    {/* Temperament Summary */}
                    {formData.temperamentTags.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Temperament</h4>
                            <div className="flex flex-wrap gap-2">
                                {formData.temperamentTags.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-secondary/90 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Agreement */}
                <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 border border-primary/20">
                    <p className="text-sm text-primary dark:text-primary/90 font-medium mb-2">
                        By listing this pet, you confirm that:
                    </p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                        <li>All information provided is accurate and truthful</li>
                        <li>You have the legal right to rehome this pet</li>
                        <li>The pet is in good health (or disclosed conditions are accurate)</li>
                        <li>You will respond to adoption inquiries in a timely manner</li>
                    </ul>
                </div>
            </div>
        );
    }

    return null;
}