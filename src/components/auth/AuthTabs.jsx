import Link from 'next/link';
export default function AuthTabs({ isLogin }) {
    return (
        <>
            <div className="flex border-b border-stone-200 dark:border-stone-700 text-black dark:text-white">
                <Link
                    href={'/auth?login=true'}
                    className={`flex-1 py-3 text-center font-medium transition-colors ${isLogin ? 'text-black dark:text-white border-b-2 border-stone-900 dark:border-stone-200' : 'text-stone-500 hover:text-stone-700'
                        }`}
                >
                    Login
                </Link>
                <Link
                    href={'/auth?login=false'}
                    className={`flex-1 py-3 text-center font-medium transition-colors ${!isLogin ? 'text-black dark:text-white border-b-2 border-stone-900 dark:border-stone-200' : 'text-stone-500 hover:text-stone-700'
                        }`}
                >
                    Sign Up
                </Link>
            </div>
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-white">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-stone-600 dark:text-stone-300">
                    {isLogin ? 'Please enter your culinary credentials.' : 'Start your culinary journey with us.'}
                </p>
            </div>
        </>
    );
}