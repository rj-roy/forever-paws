'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitch from '../ui/ThemeSwitch';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { Grid2X2, User2 } from 'lucide-react';

const navLinks = [
    { name: 'Find a Pet', href: '/find' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const { data: session } = authClient.useSession();
    console.log(session);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white dark:bg-def-dark-bg shadow-sm dark:border-b dark:border-b-white/30 ${isScrolled ? 'shadow-md' : ''}`} >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <svg
                            width="42"
                            height="42"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-300 group-hover:scale-110"
                        >
                            {/* House/Heart outline with paw */}
                            <path
                                d="M24 4L6 18v6c0 9.941 8.059 18 18 18s18-8.059 18-18v-6L24 4z"
                                fill="#3B7A99"
                                fillOpacity="0.15"
                                stroke="#3B7A99"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {/* Heart shape inside */}
                            <path
                                d="M24 14c-3.5-4-7-5-10-2-2.5 2.5-2 6 1 9l9 9 9-9c3-3 3.5-6.5 1-9-3-3-6.5-2-10 2z"
                                fill="#3B7A99"
                                stroke="#3B7A99"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            {/* Paw pads */}
                            <circle cx="24" cy="22" r="3" fill="#FFF9F2" />
                            <circle cx="19" cy="26" r="2" fill="#FFF9F2" />
                            <circle cx="29" cy="26" r="2" fill="#FFF9F2" />
                            <circle cx="24" cy="28" r="2" fill="#FFF9F2" />
                        </svg>
                        <span
                            className="text-2xl font-semibold tracking-tight md:block hidden"                        >
                            Forever Paws
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center space-x-1 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="rounded-full px-5 py-2.5 text-base font-medium transition-all duration-200 hover:text-tertiary hover:bg-[#F5EBE0]"
                            >
                                {link.name}
                            </Link>
                        ))}


                    </div>

                    <div className='flex gap-1 items-center gap-3'>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="rounded-full p-2 transition-colors duration-200 hover:bg-[#F5EBE0] md:hidden"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-5 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                        <button onClick={()=> setUserMenuOpen(!userMenuOpen)}>
                            {
                                !session ?
                                    <Link
                                        href="/auth?login=false"
                                        className="rounded-full px-3 py-1 sm:px-6 sm:py-2.5 text-base font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 bg-tertiary text-xs sm:text-sm"
                                    >
                                        Register
                                    </Link>
                                    : <div className='flex gap-1 items-center cursor-pointer'>
                                        <Image
                                            src={(session?.user as { profileImage?: string })?.profileImage as string}
                                            alt='icon'
                                            width={40}
                                            height={40}
                                            className='rounded-full'
                                        />
                                    </div>
                            }
                        </button>
                        <ThemeSwitch />
                    </div>
                </div>



                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="animate-fadeIn md:hidden">
                        <div className="space-y-2 pb-6 pt-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block border border-neutral rounded-2xl px-4 py-3 text-base font-medium text-black dark:text-white transition-colors duration-200 hover:bg-[#F5EBE0]"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {userMenuOpen && (
                    <div className="absolute right-10 top-15 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {session?.user?.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {session?.user?.email}
                            </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1 ml-auto text-right">
                            <Link
                                href={`/dashboard/${(session?.user as { role?: string })?.role || 'seeker'}`}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => setUserMenuOpen(false)}
                            >
                                <Grid2X2 />
                                Dashboard
                            </Link>
                            <Link
                                href={`/dashboard/${(session?.user as { role?: string })?.role}/profile`}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => setUserMenuOpen(false)}
                            >
                                <User2 size={20} />
                                Profile
                            </Link>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                        <button
                            // onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}