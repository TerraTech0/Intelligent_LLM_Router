'use client';

import { useState } from "react";
import axios from "axios";

export default function CreateExperiment() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<any>(null);
  const [llmResponse, setLlmResponse] = useState("");

  const handleRoutePrompt = async () => {
    const res = await axios.post("http://localhost:3001/api/route-prompt", {
      prompt,
    });
    setResult(res.data);
  };

  return (
    <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-blue-500/20 px-12 py-6 overflow-hidden animate-fadeIn max-w-2xl w-full">
      {/* Animated Accent */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-tr from-blue-500 via-indigo-500 to-transparent rounded-full blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-blue-400 via-indigo-400 to-transparent rounded-full blur-2xl opacity-30 animate-pulse"></div>

      <h1 className="text-3xl font-extrabold text-blue-400 mb-2 drop-shadow-lg animate-fadeInDown">Create New Experiment</h1>
      <p className="mb-6 text-zinc-400 animate-fadeInDown delay-100">
        Set up a new experiment to evaluate LLM responses with custom parameters.
      </p>

      <div className="mb-4 animate-fadeInUp">
        <label className="block text-lg font-semibold mb-2 text-white">Experiment Name</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-zinc-800/80 text-white border border-zinc-700 focus:border-blue-500 focus:outline-none transition"
          placeholder="e.g. Code Review Assistant Evaluation"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="mb-4 animate-fadeInUp delay-100">
        <label className="block text-lg font-semibold mb-2 text-white">System Prompt</label>
        <textarea
          rows={3}
          className="w-full p-3 rounded-lg bg-zinc-800/80 text-white border border-zinc-700 focus:border-blue-500 focus:outline-none transition"
          placeholder="Enter the system prompt that will guide the LLM's behavior..."
          value={llmResponse}
          onChange={(e) => setLlmResponse(e.target.value)}
        />
      </div>

      <div className="mb-4 animate-fadeInUp delay-200">
        <label className="block text-lg font-semibold mb-2 text-white">Select Model</label>
        <select
          className="w-full p-3 rounded-lg bg-zinc-800/80 text-white border border-zinc-700 focus:border-blue-500 focus:outline-none transition"
          value={result?.selected?.name || ""}
          onChange={(e) =>
            setResult((prev: { selected: any; }) => ({
              ...prev,
              selected: { ...prev?.selected, name: e.target.value },
            }))
          }
        >
          <option value="">Select a provider...</option>
          {["Provider A", "Provider B", "Provider C"].map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleRoutePrompt}
        className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-3 font-bold text-lg text-white shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 animate-fadeInUp delay-300"
      >
        Route Prompt
      </button>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 4s infinite;
        }
      `}</style>
    </div>
  );
}
