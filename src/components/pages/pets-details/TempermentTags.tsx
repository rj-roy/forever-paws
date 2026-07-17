// components/TemperamentTags.tsx
interface TemperamentTagsProps {
    tags: string[];
}

const tagColors: Record<string, string> = {
    'Good with Kids': 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200',
    'Good with Pets': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    'Energetic': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    'House Trained': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    'Calm': 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200',
    'Playful': 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200',
};

export default function TemperamentTags({ tags }: TemperamentTagsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${tagColors[tag] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    {tag}
                </span>
            ))}
        </div>
    );
}