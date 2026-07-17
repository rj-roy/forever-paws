// components/HealthBadges.tsx
import { Check } from 'lucide-react';

interface HealthBadgesProps {
    vaccinated: boolean;
    spayedNeutered: boolean;
    microchipped: boolean;
    healthCertificate: boolean;
}

export default function HealthBadges({
    vaccinated,
    spayedNeutered,
    microchipped,
    healthCertificate
}: HealthBadgesProps) {
    const badges = [
        { label: 'Vaccinations Up-to-date', value: vaccinated },
        { label: 'Neutered / Spayed', value: spayedNeutered },
        { label: 'Microchipped', value: microchipped },
        { label: 'Health Certificate Provided', value: healthCertificate },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {badges.map((badge) => (
                <div
                    key={badge.label}
                    className={`flex items-center gap-3 p-4 rounded-xl border ${badge.value
                            ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                            : 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800 opacity-50'
                        }`}
                >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${badge.value ? 'bg-secondary/20 dark:bg-secondary/30' : 'bg-gray-200 dark:bg-gray-700'
                        }`}>
                        {badge.value && <Check size={14} className="text-secondary" />}
                    </div>
                    <span className={`text-sm ${badge.value ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'
                        }`}>
                        {badge.label}
                    </span>
                </div>
            ))}
        </div>
    );
}