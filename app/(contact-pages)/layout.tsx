export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="mt-8 flex flex-col w-full h-screen justify-center items-center rounded-lg space-y-4 text-white">
        {children}
      </div>
    )
  }