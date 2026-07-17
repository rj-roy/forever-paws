// components/QuickInfoBar.tsx
interface QuickInfoBarProps {
    breed: string;
    age: number;
    ageUnit: string;
    size: string;
    weight?: string;
    gender: string;
}

export default function QuickInfoBar({
    breed,
    age,
    ageUnit,
    size,
    weight,
    gender
}: QuickInfoBarProps) {
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Breed</p>
                <p className="font-semibold text-gray-900 dark:text-white">{breed}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Age</p>
                <p className="font-semibold text-gray-900 dark:text-white">{age} {ageUnit}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Size</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                    {size}{weight && ` (${weight})`}
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Gender</p>
                <p className="font-semibold text-gray-900 dark:text-white">{gender}</p>
            </div>
        </div>
    );
}