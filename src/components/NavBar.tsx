'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
    { name: 'Find a Pet', href: '/find' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white dark:bg-def-dark-bg shadow-2xl ${isScrolled ? 'shadow-md' : ''}`} >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                            className="text-2xl font-semibold tracking-tight"                        >
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

                        <Link
                            href="/login"
                            className="rounded-full hover:underline underline-offset-4 px-6 py-2.5 text-base font-medium transition-all duration-200 hover:opacity-80"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-full px-6 py-2.5 text-base font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95 bg-tertiary"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="rounded-full p-2 transition-colors duration-200 hover:bg-[#F5EBE0] md:hidden"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="h-6 w-6"
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
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="animate-fadeIn md:hidden">
                        <div className="space-y-2 pb-6 pt-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block rounded-2xl px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-[#F5EBE0]"
                                    style={{ color: '#4A3F35' }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <Link
                                href="/login"
                                className="block rounded-2xl px-4 py-3 text-base font-medium text-center transition-colors duration-200 hover:bg-[#F5EBE0]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="block rounded-full px-4 py-3 text-base font-medium text-center text-white shadow-md transition-all duration-200 active:scale-95"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}