import AuthFooter from '@/components/auth/AuthFooter';
import AuthForm from '@/components/auth/AuthForm';
import AuthTabs from '@/components/auth/AuthTabs';
import GoogleButton from '@/components/auth/GoogleButton';


export const metadata = {
    title: "Sign Up | Forever Paws",
    description: "Join Forever Paws as an adopter or shelter"
};

type authParams = {
    searchParams: Promise<{
        login: string;
    }>;
};

export default async function Auth({ searchParams }: authParams) {
    const params = await searchParams;
    const login = params.login;
    const isLogin = login === "true" ? true : false;

    return (
        <div className="min-h-screen dark:text-white flex flex-col">
            <main className="grow flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-xl rounded-2xl shadow-lg p-8 space-y-6 border border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
                    <AuthTabs isLogin={isLogin} />
                    <GoogleButton />
                    <AuthForm isLogin={isLogin} />
                    <AuthFooter />
                </div>
            </main>
        </div>
    );
}