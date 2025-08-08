// import Image from "next/image";
import LLMRouter from "./components/index"; // <-- Add this import

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={38}
            priority
          /> */}
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              LLM Evaluation Platform
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Set up and evaluate LLM responses with custom parameters and
              configurations.
            </p>
          </div>
        </div>

        {/* Main UI */}
        <LLMRouter />
      </div>
    </div>
  );
}
