// app/how-it-works/page.tsx
import Link from 'next/link';
import { Search, Mail, Users, Heart, Shield, Clock, FileText, CheckCircle, ChevronRight, PawPrint, MessageCircle, Calendar, Star } from 'lucide-react';

export default function HowItWorksPage() {
    const steps = [
        {
            number: '01',
            title: 'Browse Available Pets',
            icon: Search,
            color: 'bg-[#3B7A99]',
            description: 'Explore our diverse collection of pets from verified shelters and rescues. Use our advanced filters to find your perfect match.',
            features: [
                'Search by species, breed, age, and size',
                'Filter by location and distance',
                'View detailed profiles with photos',
                'Read about personality and temperament',
                'Save favorites to review later',
            ],
        },
        {
            number: '02',
            title: 'Submit an Application',
            icon: Mail,
            color: 'bg-[#6FA287]',
            description: 'Once you\'ve found a pet that captures your heart, complete our simple adoption application to get started.',
            features: [
                'Quick 5-minute online form',
                'Provide basic household information',
                'Share your pet experience',
                'Upload references if needed',
                'Track application status in real-time',
            ],
        },
        {
            number: '03',
            title: 'Meet Your Match',
            icon: Users,
            color: 'bg-[#F2A65A]',
            description: 'Schedule a meet-and-greet to ensure you and your potential new companion are the perfect fit for each other.',
            features: [
                'Visit the shelter or arrange a home visit',
                'Spend quality time with the pet',
                'Ask questions to shelter staff',
                'Introduce family members or other pets',
                'Take your time to decide',
            ],
        },
        {
            number: '04',
            title: 'Complete Adoption',
            icon: FileText,
            color: 'bg-[#3B7A99]',
            description: 'Finalize the adoption process with our streamlined paperwork and prepare to welcome your new family member home.',
            features: [
                'Review and sign adoption agreement',
                'Pay adoption fee',
                'Receive medical records and history',
                'Get starter tips and resources',
                'Schedule follow-up support',
            ],
        },
        {
            number: '05',
            title: 'Bring Them Home',
            icon: Heart,
            color: 'bg-[#6FA287]',
            description: 'The moment you\'ve been waiting for! Welcome your new companion to their forever home with confidence.',
            features: [
                'Forever Paws 30-day health guarantee',
                'Post-adoption support and resources',
                'Access to training tips and guides',
                'Join our adopter community',
                'Share your success story',
            ],
        },
    ];

    const faqs = [
        {
            question: 'How long does the adoption process take?',
            answer: 'The timeline varies depending on the pet and shelter, but typically ranges from 1-2 weeks. Some adoptions can be completed in as little as 2-3 days, while others may take longer to ensure the best match.',
        },
        {
            question: 'What is included in the adoption fee?',
            answer: 'Adoption fees typically cover vaccinations, spaying/neutering, microchipping, and a basic health exam. Fees help support the shelter\'s ongoing rescue operations and care for other animals in need.',
        },
        {
            question: 'Can I adopt if I rent my home?',
            answer: 'Yes! Many of our pets can go to rental homes. You\'ll need to provide proof of landlord approval for pets, and we can help you find pets that are suitable for your living situation.',
        },
        {
            question: 'What if the adoption doesn\'t work out?',
            answer: 'We offer a 30-day health guarantee and post-adoption support. If there are unforeseen issues, we work with you to find solutions or, if necessary, help rehome the pet responsibly.',
        },
        {
            question: 'Are the pets already vaccinated and spayed/neutered?',
            answer: 'Most of our partner shelters ensure pets are up-to-date on vaccinations and spayed/neutered before adoption. This information is clearly listed on each pet\'s profile.',
        },
        {
            question: 'Can I adopt if I have other pets?',
            answer: 'Absolutely! We encourage introducing your current pets during the meet-and-greet process to ensure everyone gets along. Our staff can provide guidance on proper introductions.',
        },
    ];

    const stats = [
        { icon: PawPrint, value: '1,200+', label: 'Happy Adoptions' },
        { icon: Shield, value: '100%', label: 'Verified Shelters' },
        { icon: Clock, value: '12 Days', label: 'Average Adoption Time' },
        { icon: Star, value: '4.9/5', label: 'Adopter Satisfaction' },
    ];

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3B7A99]/10 dark:bg-[#3B7A99]/20 rounded-full mb-6">
                        <MessageCircle size={16} className="text-[#3B7A99]" />
                        <span className="text-sm font-medium text-[#3B7A99]">Simple & Straightforward</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold text-[#3B7A99] dark:text-[#3B7A99] font-poppins mb-6">
                        How It Works
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Finding your perfect companion is easier than you think. Follow our simple five-step process to bring home your new best friend.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white dark:bg-def-dark-bg p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <stat.icon size={32} className="mx-auto mb-3 text-[#3B7A99]" />
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps Timeline */}
            <section className="py-16 lg:py-24 bg-white dark:bg-def-dark-bg/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-16 lg:space-y-24">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            const Icon = step.icon;

                            return (
                                <div key={step.number} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                                    {/* Content */}
                                    <div className="flex-1 text-center lg:text-left">
                                        <div className="inline-flex items-center gap-3 mb-4">
                                            <span className="text-5xl font-bold text-gray-200 dark:text-gray-800">{step.number}</span>
                                            <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center`}>
                                                <Icon size={24} className="text-white" />
                                            </div>
                                        </div>

                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
                                            {step.title}
                                        </h2>

                                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                            {step.description}
                                        </p>

                                        <ul className="space-y-3">
                                            {step.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                                    <CheckCircle size={18} className="text-[#6FA287] flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Visual */}
                                    <div className="flex-1">
                                        <div className={`relative ${step.color} rounded-3xl p-8 lg:p-12 text-white overflow-hidden`}>
                                            <div className="relative z-10">
                                                <Icon size={80} className="mb-6 opacity-90" />
                                                <h3 className="text-2xl font-bold font-poppins mb-2">
                                                    Step {step.number}
                                                </h3>
                                                <p className="opacity-90">
                                                    {step.title}
                                                </p>
                                            </div>
                                            {/* Decorative circles */}
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Timeline Visual */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#3B7A99] dark:bg-[#3B7A99]/90 rounded-3xl p-8 lg:p-12 text-white">
                        <h2 className="text-3xl font-bold font-poppins text-center mb-12">Your Adoption Journey</h2>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2" />

                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    return (
                                        <div key={index} className="relative flex flex-col items-center text-center">
                                            <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg`}>
                                                <Icon size={28} className="text-white" />
                                            </div>
                                            <h3 className="font-semibold mb-1">{step.title.split(' ')[0]} {step.title.split(' ')[1]}</h3>
                                            <p className="text-sm opacity-80 hidden lg:block">Step {index + 1}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-24 bg-white dark:bg-def-dark-bg/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#3B7A99] dark:text-[#3B7A99] font-poppins mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Got questions? We&apos;ve got answers.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-[#FFF9F2] dark:bg-def-dark-bg rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-start gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 bg-[#3B7A99]/10 dark:bg-[#3B7A99]/20 rounded-full flex items-center justify-center text-[#3B7A99] font-bold text-sm">
                                        {index + 1}
                                    </span>
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 pl-11">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-[#6FA287] to-[#3B7A99] dark:from-[#6FA287]/90 dark:to-[#3B7A99]/90 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-5xl font-bold font-poppins mb-6">
                                Ready to Find Your Perfect Companion?
                            </h2>
                            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                                Join thousands of happy families who have found their forever friends through Forever Paws.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/pets"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#3B7A99] hover:bg-gray-100 font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95"
                                >
                                    <Search size={20} />
                                    Browse Available Pets
                                </Link>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur font-semibold rounded-full transition-all duration-200"
                                >
                                    Learn More About Us
                                    <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="py-16 bg-white dark:bg-def-dark-bg/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#3B7A99]/10 dark:bg-[#3B7A99]/20 rounded-2xl flex items-center justify-center">
                                <MessageCircle size={32} className="text-[#3B7A99]" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                Our team is here to guide you through every step of the process.
                            </p>
                            <Link href="/chat" className="text-[#3B7A99] hover:text-[#3B7A99]/80 font-medium text-sm">
                                Chat with Us →
                            </Link>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#6FA287]/10 dark:bg-[#6FA287]/20 rounded-2xl flex items-center justify-center">
                                <Calendar size={32} className="text-[#6FA287]" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Schedule a Visit</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                Meet the pets in person and get all your questions answered.
                            </p>
                            <Link href="/pets" className="text-[#6FA287] hover:text-[#6FA287]/80 font-medium text-sm">
                                Find a Shelter →
                            </Link>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#F2A65A]/10 dark:bg-[#F2A65A]/20 rounded-2xl flex items-center justify-center">
                                <FileText size={32} className="text-[#F2A65A]" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Adoption Guide</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                Download our comprehensive guide to preparing for your new pet.
                            </p>
                            <Link href="/resources" className="text-[#F2A65A] hover:text-[#F2A65A]/80 font-medium text-sm">
                                View Resources →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}