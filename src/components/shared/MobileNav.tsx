'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PawPrint, Grid2X2, User } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Pets', href: '/pets', icon: PawPrint },
    { name: 'Board', href: '/board', icon: Grid2X2 },
    { name: 'Profile', href: '/profile', icon: User },
];

export default function MobileNav() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(pathname);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
            <div className="bg-white dark:bg-def-dark-bg shadow-sm dark:border-t dark:border-gray-800 border-t border-gray-100">
                <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.href || pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setActiveTab(item.href)}
                                className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-200 ${isActive ? 'text-secondary' : 'text-neutral dark:text-gray-400'
                                    }`}
                            >
                                {isActive && item.name === 'Pets' && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-secondary/20 dark:bg-secondary/30" />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <Icon
                                        size={22}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className={isActive && item.name === 'Pets' ? 'text-secondary' : ''}
                                    />
                                </div>

                                <span className={`relative z-10 text-xs font-medium ${isActive && item.name === 'Pets' ? 'text-secondary' : ''
                                    }`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}