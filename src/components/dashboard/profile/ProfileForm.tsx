'use client';

import { useState, useRef, useTransition } from 'react';
import Image from 'next/image';
import { Save, User, Phone, MapPin, FileText, Camera } from 'lucide-react';
import { UserType } from '@/types/userType';
import { updateProfileAction } from '@/lib/actions/updateProfileAction';
import { toast } from 'react-toastify';

interface ProfileFormProps {
    user: UserType;
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone?.toString() ?? '',
        city: user.city ?? '',
        state: user.state ?? '',
        bio: user.bio ?? '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be under 5MB.');
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        formPayload.append('phone', formData.phone);
        formPayload.append('city', formData.city);
        formPayload.append('state', formData.state);
        formPayload.append('bio', formData.bio);

        if (imageFile) {
            formPayload.append('profileImage', imageFile);
        }

        startTransition(async () => {
            const result = await updateProfileAction(formPayload);
            if (result.success) {
                toast.success(result.message);
                setImageFile(null);
                setImagePreview(null);
            } else {
                toast.error(result.message || 'Failed to update profile. Please try again.');
            }
        });
    };

    const inputClass = "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200";
    const labelClass = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-def-dark-bg shadow-md bg-gray-100 dark:bg-gray-800">
                        <Image
                            src={imagePreview ?? user.profileImage ?? "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png"}
                            alt={user.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                        title="Change Photo"
                    >
                        <Camera size={14} />
                    </button>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Profile Photo</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">JPG, PNG or WebP. Max 5MB.</p>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        {imagePreview ? 'Choose a different photo' : 'Upload a photo'}
                    </button>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Full Name</label>
                    <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Phone Number</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="(555) 123-4567"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>City</label>
                    <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={inputClass}
                            placeholder="Your city"
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>State / Region</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your state"
                    />
                </div>
            </div>

            <div>
                <label className={labelClass}>About You</label>
                <div className="relative">
                    <FileText size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell potential shelters a bit about yourself, your home, and why you want to adopt..."
                    />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    This information may be shared with shelters when you apply to adopt.
                </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
