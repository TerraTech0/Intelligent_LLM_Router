'use client';

import { useState } from "react";
import axios from "axios";

export default function LLMRouter() {
  const [prompt, setPrompt] = useState("");
  const [weights, setWeights] = useState({ cost: 1, speed: 1, accuracy: 1 });
  const [result, setResult] = useState<any>(null);
  const [llmResponse, setLlmResponse] = useState("");

  const handleRoutePrompt = async () => {
    const res = await axios.post("http://localhost:3001/api/route-prompt", {
      prompt,
      weights,
    });
    setResult(res.data);
  };

  const handleCallLLM = async () => {
    if (!result?.selected) return;
    const res = await axios.post("http://localhost:3001/api/call-llm", {
      provider: result.selected.name,
      prompt,
    });
    setLlmResponse(res.data.output);
  };

  return (


    <div className="mt-16 bg-white/[0.05] rounded-2xl shadow-xl ring-1 ring-white/[0.1] p-6">

      <h1 className="text-3xl font-bold">Create new Experiment</h1>
      <p className="mt-2 text-zinc-400">
        set up a new Experiment to evaluate LLM response With custome parameters
      </p>
    <br />
    <br />
      <h1 className="text-2xl font-bold">Experiment Name </h1>
            <textarea
        rows={1}
        className="w-full p-2 rounded bg-zinc-800 text-white"
        placeholder="e.g.. code Review Assistant Evaluation"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <br />
      <br />
      <h2>
        <span className="text-2xl font-bold">System Prompt</span>
      </h2>
      <textarea
        rows={4}
        className="w-full p-2 rounded bg-zinc-800 text-white"
        placeholder="Enter the system prompt that will guide the LLM's behavior..."
        value={llmResponse}
        onChange={(e) => setLlmResponse(e.target.value)}
      />

      {/* Select Model
      
      dropdown */}
      <h2 className="mt-6 text-2xl font-bold">Select Model</h2>
      <select
        className="w-full p-2 rounded bg-zinc-800 text-white"
        value={result?.selected?.name}
        onChange={(e) =>
          setResult((prev: { selected: any; }) => ({
            ...prev,
            selected: { ...prev.selected, name: e.target.value },
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

      <button
        onClick={handleRoutePrompt}
        className="mt-6 w-full rounded bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-700"
      >
        Route Prompt
      </button>

    </div>
  );
}
