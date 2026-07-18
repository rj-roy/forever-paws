// app/about/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import {
    Heart,
    PawPrint,
    Users,
    Shield,
    Sparkles,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Mail,
    Phone,
} from 'lucide-react';

export default function AboutPage() {
    const values = [
        {
            icon: Heart,
            title: 'Compassion First',
            description: 'Every decision we make is guided by empathy for animals and the humans who love them.',
            color: 'bg-primary/10 text-primary dark:bg-primary/20',
        },
        {
            icon: Shield,
            title: 'Transparent & Safe',
            description: 'We verify every shelter and provide clear, honest information so you can adopt with confidence.',
            color: 'bg-secondary/10 text-secondary dark:bg-secondary/20',
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'We believe in the power of local communities coming together to give pets a second chance.',
            color: 'bg-tertiary/10 text-tertiary dark:bg-tertiary/20',
        },
        {
            icon: Sparkles,
            title: 'Joyful Experiences',
            description: 'Adopting a pet should be a happy, seamless journey, not a stressful bureaucratic hurdle.',
            color: 'bg-primary/10 text-primary dark:bg-primary/20',
        },
    ];

    const team = [
        {
            name: 'Elena Rodriguez',
            role: 'Founder & CEO',
            bio: 'Lifelong dog mom and animal welfare advocate. Founded Forever Paws after adopting her rescue beagle, Barnaby.',
            image: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
        },
        {
            name: 'Marcus Chen',
            role: 'Head of Shelter Partnerships',
            bio: 'Former shelter manager who knows exactly what rescues need to thrive and find homes faster.',
            image: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
        },
        {
            name: 'Sarah Jenkins',
            role: 'Lead Product Designer',
            bio: 'Designs our cozy, user-friendly interfaces. Believes technology should feel as warm as a puppy cuddle.',
            image: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
        },
    ];

    const milestones = [
        { year: '2021', title: 'The Idea is Born', desc: 'Elena adopts Barnaby and realizes the pet adoption process needs a warmer, more transparent approach.' },
        { year: '2022', title: 'Forever Paws Launches', desc: 'We partner with our first 10 local shelters in the Pacific Northwest.' },
        { year: '2023', title: 'Going National', desc: 'Expanded to 15+ cities and helped over 500 pets find their forever homes.' },
        { year: '2024', title: '1,200+ Adoptions', desc: 'Reached our biggest milestone yet, with 80+ verified partner shelters across the country.' },
    ];

    return (
        <div className="min-h-screen bg-[#FFF9F2] dark:bg-def-dark-bg text-[#4A3F35] dark:text-gray-100">

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-tertiary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-def-dark-bg rounded-full shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
                        <PawPrint size={16} className="text-primary" />
                        <span className="text-sm font-medium text-[#4A3F35] dark:text-gray-300">Our Story</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-6 leading-tight">
                        More than just a platform. <br className="hidden lg:block" />
                        <span className="text-primary">We&apos;re a community of pet lovers.</span>
                    </h1>

                    <p className="text-lg lg:text-xl text-[#8A7A6B] dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Forever Paws was built on a simple belief: every animal deserves a loving home, and every family deserves a joyful, transparent adoption experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/pets"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95"
                        >
                            Find Your Companion
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-def-dark-bg text-[#4A3F35] dark:text-white font-semibold rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-200"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-white dark:bg-def-dark-bg/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                                <Image
                                    src="https://loremflickr.com/600/450/dog?lock=48"
                                    alt="Happy volunteer playing with dogs at a shelter"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                            {/* Floating card */}
                            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-def-dark-bg p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 max-w-xs hidden md:block">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-white dark:border-def-dark-bg flex items-center justify-center">
                                            <Heart size={14} className="text-secondary" />
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-tertiary/20 border-2 border-white dark:border-def-dark-bg flex items-center justify-center">
                                            <PawPrint size={14} className="text-tertiary" />
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-[#4A3F35] dark:text-white">1,200+ Happy Tails</span>
                                </div>
                                <p className="text-xs text-[#8A7A6B] dark:text-gray-400">
                                    And counting! Every adoption is a new beginning.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-[#4A3F35] dark:text-white">
                                Born from a love of muddy paws and wet noses.
                            </h2>
                            <p className="text-lg text-[#8A7A6B] dark:text-gray-400 leading-relaxed">
                                In 2021, our founder Elena was navigating the confusing, often cold process of adopting her dog, Barnaby. She realized that while shelters do incredible work, the technology connecting them to adopters felt like a corporate database, not a community.
                            </p>
                            <p className="text-lg text-[#8A7A6B] dark:text-gray-400 leading-relaxed">
                                Forever Paws was created to change that. We wanted to build a space that feels like a cozy community bulletin board—warm, transparent, and focused on the joy of bringing a new family member home.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-secondary flex-shrink-0 mt-1" />
                                    <span className="text-[#4A3F35] dark:text-gray-300 font-medium">100% Non-profit focused</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-secondary flex-shrink-0 mt-1" />
                                    <span className="text-[#4A3F35] dark:text-gray-300 font-medium">Verified shelter partners</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-secondary flex-shrink-0 mt-1" />
                                    <span className="text-[#4A3F35] dark:text-gray-300 font-medium">Transparent adoption fees</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-secondary flex-shrink-0 mt-1" />
                                    <span className="text-[#4A3F35] dark:text-gray-300 font-medium">Post-adoption support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-4">
                            What Drives Us
                        </h2>
                        <p className="text-lg text-[#8A7A6B] dark:text-gray-400 max-w-2xl mx-auto">
                            Our core values guide everything we do, from the code we write to the shelters we partner with.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-def-dark-bg p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${value.color}`}>
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-[#8A7A6B] dark:text-gray-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline / Milestones */}
            <section className="py-20 bg-white dark:bg-def-dark-bg/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-4">
                            Our Journey So Far
                        </h2>
                        <p className="text-lg text-[#8A7A6B] dark:text-gray-400">
                            From a small idea to a nationwide community.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 hidden md:block" />

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="relative flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                                    {/* Dot */}
                                    <div className="hidden md:flex absolute left-8 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-def-dark-bg -translate-x-1/2 mt-1.5 z-10" />

                                    <div className="md:w-32 flex-shrink-0">
                                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary dark:bg-primary/20 rounded-full text-sm font-bold">
                                            {milestone.year}
                                        </span>
                                    </div>

                                    <div className="flex-1 bg-[#FFF9F2] dark:bg-def-dark-bg p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                        <h3 className="text-xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-2">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-[#8A7A6B] dark:text-gray-400 leading-relaxed">
                                            {milestone.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-4">
                            The Humans Behind the Paws
                        </h2>
                        <p className="text-lg text-[#8A7A6B] dark:text-gray-400 max-w-2xl mx-auto">
                            A passionate team of animal lovers, tech enthusiasts, and community builders.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-def-dark-bg rounded-3xl p-8 text-center border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-def-dark-bg shadow-md bg-gray-100 dark:bg-gray-800">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                            sizes="128px"
                                        />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-primary font-medium mb-4">{member.role}</p>
                                <p className="text-[#8A7A6B] dark:text-gray-400 text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact / Stats Section */}
            <section className="py-20 bg-primary dark:bg-primary/90 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Every number represents a life changed, a family completed, and a shelter supported.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: '1,200+', label: 'Pets Adopted', icon: Heart },
                            { value: '80+', label: 'Partner Shelters', icon: MapPin },
                            { value: '15+', label: 'Cities Covered', icon: Users },
                            { value: '12', label: 'Avg Days to Adopt', icon: Sparkles },
                        ].map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                                    <Icon size={32} className="mx-auto mb-4 text-tertiary" />
                                    <div className="text-4xl lg:text-5xl font-bold font-poppins mb-2">{stat.value}</div>
                                    <div className="text-white/80 font-medium">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Partner Shelters CTA */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#FFF9F2] dark:bg-def-dark-bg rounded-[2.5rem] p-12 lg:p-20 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary/10 text-tertiary rounded-full mb-6">
                                    <Users size={16} />
                                    <span className="text-sm font-bold">For Shelters & Rescues</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-6">
                                    Help more pets find their people.
                                </h2>
                                <p className="text-lg text-[#8A7A6B] dark:text-gray-400 mb-8 leading-relaxed">
                                    Are you a shelter or rescue organization? Join our network to reach thousands of potential adopters, manage your listings easily, and get the support you need to save more lives.
                                </p>
                                <Link
                                    href="/shelters/register"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg active:scale-95"
                                >
                                    Register Your Shelter
                                    <ArrowRight size={18} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    'Free listing management',
                                    'Dedicated support team',
                                    'Verified adopter applications',
                                    'Community outreach tools',
                                    'Analytics & insights',
                                    'Post-adoption resources',
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white dark:bg-def-dark-bg p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                                        <CheckCircle2 size={20} className="text-secondary flex-shrink-0" />
                                        <span className="text-sm font-medium text-[#4A3F35] dark:text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Contact CTA */}
            <section className="py-20 bg-white dark:bg-def-dark-bg/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-[#4A3F35] dark:text-white mb-6">
                        Let&apos;s chat!
                    </h2>
                    <p className="text-lg text-[#8A7A6B] dark:text-gray-400 mb-10 max-w-xl mx-auto">
                        Have a question, a partnership idea, or just want to share a photo of your newly adopted best friend? We&lsquo;d love to hear from you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <a href="mailto:hello@foreverpaws.com" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-def-dark-bg text-[#4A3F35] dark:text-white font-semibold rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-200">
                            <Mail size={18} />
                            hello@foreverpaws.com
                        </a>
                        <a href="tel:+15551234567" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-def-dark-bg text-[#4A3F35] dark:text-white font-semibold rounded-full border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-200">
                            <Phone size={18} />
                            (555) 123-4567
                        </a>
                    </div>

                    <div className="flex justify-center gap-4">
                        {[PawPrint, PawPrint, PawPrint].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-12 h-12 rounded-full bg-[#FFF9F2] dark:bg-def-dark-bg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#8A7A6B] dark:text-gray-400 hover:text-primary hover:border-primary dark:hover:text-primary transition-all duration-200"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}