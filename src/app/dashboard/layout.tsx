export const metadata = {
    title: "Dashboard | Work Dock",
    description: "Dashboard",
};

export default function DashLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="w-full max-w-full mx-auto flex bg-white-bg dark:bg-black-bg bg-white dark:bg-def-dark-bg text-black dark:text-white">
      <main className="flex-1 flex flex-col p-8 h-full">
        {children}
      </main>
    </div>
  )
}