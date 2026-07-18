'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: 'general',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill out all required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, you would POST to your API here:
            // const res = await fetch('/api/v1/contact', { method: 'POST', body: JSON.stringify(formData) });
            // if (!res.ok) throw new Error('Failed to send');

            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setIsSuccess(true);
            setFormData({ name: '', email: '', topic: 'general', message: '' });

            // Reset success state after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl text-[#4A3F35] dark:text-white placeholder-[#8A7A6B] dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-200";
    const labelClass = "block text-sm font-semibold text-[#4A3F35] dark:text-gray-300 mb-2";

    return (
        <div className="bg-white dark:bg-def-dark-bg rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-tertiary" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-2">
                    Send us a message
                </h2>
                <p className="text-[#8A7A6B] dark:text-gray-400 text-sm">
                    Fill out the form below and our team will get back to you within 24 hours.
                </p>
            </div>

            {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
                    <div className="w-16 h-16 bg-secondary/10 dark:bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle size={32} className="text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-2">
                        Message Received!
                    </h3>
                    <p className="text-[#8A7A6B] dark:text-gray-400 max-w-sm">
                        Thanks for reaching out. A member of our team will be in touch with you shortly.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className={labelClass}>
                                Your Name <span className="text-tertiary">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Jane Doe"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className={labelClass}>
                                Email Address <span className="text-tertiary">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="jane@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="topic" className={labelClass}>
                            How can we help?
                        </label>
                        <select
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="general">General Inquiry</option>
                            <option value="adoption">Adoption Question</option>
                            <option value="application">Application Status</option>
                            <option value="partnership">Shelter Partnership</option>
                            <option value="feedback">Feedback / Suggestion</option>
                            <option value="other">Something Else</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className={labelClass}>
                            Your Message <span className="text-tertiary">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className={`${inputClass} resize-none`}
                            placeholder="Tell us what's on your mind..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <Send size={18} />
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}