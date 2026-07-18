// app/contact/page.tsx
import ContactForm from '@/components/pages/contact/ContactForm';
import { Mail, MapPin, Clock, MessageCircle, Heart, PawPrint } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    const contactMethods = [
        {
            icon: Mail,
            title: 'General Inquiries',
            description: 'Questions about our platform or general feedback.',
            contact: 'hello@foreverpaws.com',
            color: 'bg-primary/10 text-primary dark:bg-primary/20',
            link: 'mailto:hello@foreverpaws.com',
        },
        {
            icon: MessageCircle,
            title: 'Adoption Support',
            description: 'Need help with an application or adoption process?',
            contact: 'support@foreverpaws.com',
            color: 'bg-secondary/10 text-secondary dark:bg-secondary/20',
            link: 'mailto:support@foreverpaws.com',
        },
        {
            icon: PawPrint,
            title: 'Shelter Partnerships',
            description: 'Are you a rescue organization looking to join us?',
            contact: 'partners@foreverpaws.com',
            color: 'bg-tertiary/10 text-tertiary dark:bg-tertiary/20',
            link: 'mailto:partners@foreverpaws.com',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg text-[#4A3F35] dark:text-gray-100">
            {/* Decorative Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-def-dark-bg rounded-full shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
                        <Heart size={16} className="text-secondary" />
                        <span className="text-sm font-medium text-[#4A3F35] dark:text-gray-300">We&apos;re here to help</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-6 leading-tight">
                        Let&apos;s start a conversation.
                    </h1>

                    <p className="text-lg text-[#8A7A6B] dark:text-gray-400 leading-relaxed">
                        Whether you have a question about an adoption, want to partner with us, or just want to share a photo of your new best friend, we&apos;d love to hear from you.
                    </p>
                </div>

                {/* Main Grid: Info + Form */}
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Left Column: Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Methods */}
                        <div className="space-y-4">
                            {contactMethods.map((method, index) => {
                                const Icon = method.icon;
                                return (
                                    <a
                                        key={index}
                                        href={method.link}
                                        className="block bg-white dark:bg-def-dark-bg p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${method.color}`}>
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold font-poppins text-[#4A3F35] dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                                                    {method.title}
                                                </h3>
                                                <p className="text-sm text-[#8A7A6B] dark:text-gray-400 mb-2">
                                                    {method.description}
                                                </p>
                                                <span className="text-sm font-semibold text-primary dark:text-primary">
                                                    {method.contact}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Office Hours & Location */}
                        <div className="bg-white dark:bg-def-dark-bg p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="font-bold font-poppins text-[#4A3F35] dark:text-white mb-4 flex items-center gap-2">
                                <Clock size={20} className="text-tertiary" />
                                Support Hours
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-[#8A7A6B] dark:text-gray-400">Monday - Friday</span>
                                    <span className="font-medium text-[#4A3F35] dark:text-gray-200">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-[#8A7A6B] dark:text-gray-400">Saturday</span>
                                    <span className="font-medium text-[#4A3F35] dark:text-gray-200">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#8A7A6B] dark:text-gray-400">Sunday</span>
                                    <span className="font-medium text-[#4A3F35] dark:text-gray-200">Closed</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold font-poppins text-[#4A3F35] dark:text-white mb-2 flex items-center gap-2">
                                    <MapPin size={20} className="text-tertiary" />
                                    HQ Location
                                </h4>
                                <p className="text-sm text-[#8A7A6B] dark:text-gray-400">
                                    123 Pawsome Avenue, Suite 4B<br />
                                    Portland, OR 97201
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>
                </div>

                {/* Quick Help / FAQ Teaser */}
                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-px w-12 bg-gray-200 dark:bg-gray-800" />
                        <span className="text-sm font-medium text-[#8A7A6B] dark:text-gray-400 uppercase tracking-wider">Quick Help</span>
                        <div className="h-px w-12 bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-4">
                        Looking for quick answers?
                    </h2>
                    <p className="text-[#8A7A6B] dark:text-gray-400 mb-8 max-w-xl mx-auto">
                        Check out our Help Center for instant answers to common questions about adoptions, applications, and shelter partnerships.
                    </p>
                    <Link
                        href="/how-it-works"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-def-dark-bg text-[#4A3F35] dark:text-white font-semibold rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-200 shadow-sm"
                    >
                        Visit Help Center
                        <MessageCircle size={18} />
                    </Link>
                </div>

            </div>
        </div>
    );
}