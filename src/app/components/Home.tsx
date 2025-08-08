"use client";
import { useState } from "react";
import CreateExperiment from "../components/createExperiment";

const experiments = [
	{
		name: "Customer Service Chatbot",
		models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
		testCases: 68,
		created: "2025-08-07T12:00:00Z",
	},
	{
		name: "Therapy Bot",
		models: ["llama-3.1-8b-instant", "gpt-3.5-turbo", "gpt-4o-mini"],
		testCases: 12,
		created: "2025-08-08T09:00:00Z",
	},
	{
		name: "Financial Advisor Bot",
		models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
		testCases: 22,
		created: "2025-08-08T10:00:00Z",
	},
	{
		name: "Legal Document Analyzer",
		models: ["gpt-4o-mini", "llama-3.3-70b-versatile"],
		testCases: 35,
		created: "2025-08-08T11:00:00Z",
	},
	{
		name: "Medical Diagnosis Assistant",
		models: ["gpt-3.5-turbo", "llama-3.1-8b-instant", "gpt-4o-mini"],
		testCases: 50,
		created: "2025-08-08T12:00:00Z",
	},
	{
		name: "Travel Planner Bot",
		models: ["llama-3.1-8b-instant", "gpt-4o-mini"],
		testCases: 27,
		created: "2025-08-08T13:00:00Z",
	},
];

export default function Home() {
	const [showModal, setShowModal] = useState(false);
	const [search, setSearch] = useState("");
	const [dateFormat, setDateFormat] = useState("relative"); // "relative" | "absolute" | "iso"

	// Helper to format date
	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		if (dateFormat === "absolute") {
			return date.toLocaleDateString();
		}
		if (dateFormat === "iso") {
			return date.toISOString().split("T")[0];
		}
		// Relative (simple demo)
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		if (diffDays === 0) return "today";
		if (diffDays === 1) return "1 day ago";
		return `${diffDays} days ago`;
	}

	return (
		<div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
			{/* Animated Gradient Background with accent blobs */}
			<div className="absolute inset-0 -z-10">
				<div className="w-full h-full bg-gradient-to-br from-[#0a0d18] via-[#101322] to-[#1a1f2b] opacity-98"></div>
				<div className="absolute -top-20 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-700 via-indigo-800 to-transparent rounded-full blur-3xl opacity-40 animate-pulse"></div>
				<div className="absolute -bottom-20 -right-32 w-80 h-80 bg-gradient-to-tr from-blue-600 via-indigo-700 to-transparent rounded-full blur-3xl opacity-30 animate-pulse"></div>
			</div>

			<div className="w-full max-w-6xl mx-auto px-6 py-12">
				{/* Header */}
				<div className="flex items-center justify-between mb-10">
					<div>
						<h1 className="text-5xl font-extrabold mb-2 text-blue-200 drop-shadow-lg animate-fadeInDown tracking-tight">
							LLM Evaluation Platform
						</h1>
						<p className="text-zinc-300 text-lg animate-fadeInDown delay-100">
							Create and manage your LLM evaluation experiments
						</p>
					</div>
					<button
						className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-bold text-lg shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-blue-500 transition-all duration-200 animate-fadeInDown delay-200 ring-2 ring-blue-500/30"
						onClick={() => setShowModal(true)}
					>
						<span className="inline-flex items-center gap-2">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path d="M12 4v16m8-8H4" />
							</svg>
							Create New Experiment
						</span>
					</button>
				</div>

				{/* Experiments Section */}
				<div className="bg-zinc-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border border-blue-900 animate-fadeInUp ring-1 ring-blue-500/10">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="text-3xl font-bold text-blue-100 tracking-tight">
								Experiments
							</h2>
							<p className="text-zinc-400">
								Create and manage your LLM evaluation experiments
							</p>
						</div>
						<div className="flex gap-2">
							{
								[
									{
										type: "relative",
										icon: (
											<svg
												width="20"
												height="20"
												fill="none"
												stroke="currentColor"
											>
												<rect x="3" y="3" width="6" height="6" rx="2" />
												<rect x="11" y="3" width="6" height="6" rx="2" />
												<rect x="3" y="11" width="6" height="6" rx="2" />
												<rect x="11" y="11" width="6" height="6" rx="2" />
											</svg>
										),
										label: "Grid",
									},
									{
										type: "absolute",
										icon: (
											<svg
												width="20"
											height="20"
												fill="none"
												stroke="currentColor"
											>
												<rect x="3" y="5" width="14" height="3" rx="1.5" />
												<rect x="3" y="12" width="14" height="3" rx="1.5" />
											</svg>
										),
										label: "List",
									},
									{
										type: "iso",
										icon: (
											<svg
												width="20"
												height="20"
												fill="none"
												stroke="currentColor"
											>
												<path d="M3 5h14M6 10h8M9 15h2" />
											</svg>
										),
										label: "Cards",
									},
								].map(({ type, icon, label }) => (
									<button
										key={type}
										className={`p-2 rounded-lg transition ring-2 ring-blue-500/30 flex flex-col items-center justify-center
											${
												dateFormat === type
													? "bg-blue-700 scale-110 shadow-xl text-white animate-shape"
													: "bg-zinc-800 hover:bg-zinc-700 text-blue-300"
											}`}
										onClick={() => setDateFormat(type)}
										title={label}
									>
										{icon}
										<span
											className={`mt-1 text-xs font-semibold transition-all duration-200 ${
												dateFormat === type ? "opacity-100" : "opacity-0"
											}`}
										>
											{label}
										</span>
									</button>
								))}
						</div>
					</div>
					<input
						type="text"
						placeholder="Search experiments..."
						className="w-full mb-8 p-4 rounded-lg bg-zinc-800 text-white border border-blue-500/30 focus:border-blue-500 focus:outline-none transition shadow"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					{/* Dynamic experiment shape */}
					{dateFormat === "relative" && (
						// Grid view (boxes) - fix layout shift by setting min-height
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[520px]">
							{experiments
								.filter((exp) =>
									exp.name.toLowerCase().includes(search.toLowerCase())
								)
								.map((exp, idx) => (
									<div
										key={idx}
										className="bg-blue-950/60 rounded-2xl shadow-lg p-6 flex flex-col gap-2 hover:scale-105 transition-all duration-300 border border-blue-900"
									>
										<h3 className="text-xl font-bold text-blue-200 mb-1">
											{exp.name}
										</h3>
										<div className="flex flex-wrap gap-2 mb-2">
											{exp.models.map((model) => (
												<span
													key={model}
													className="px-2 py-1 rounded bg-blue-900 text-blue-300 text-xs font-mono"
												>
													{model}
												</span>
											))}
										</div>
										<div className="flex justify-between text-sm text-blue-300">
											<span>
												Test Cases:{" "}
												<b>{exp.testCases}</b>
											</span>
											<span>
												<svg
													className="inline w-4 h-4 mr-1"
													fill="none"
													stroke="currentColor"
													strokeWidth={2}
													viewBox="0 0 24 24"
												>
													<circle cx="12" cy="12" r="10" />
													<path d="M12 6v6l4 2" />
												</svg>
												{formatDate(exp.created)}
											</span>
										</div>
									</div>
								))}
						</div>
					)}
					{dateFormat === "absolute" && (
						// List view
						<ul className="divide-y divide-blue-900">
							{experiments
								.filter((exp) =>
									exp.name.toLowerCase().includes(search.toLowerCase())
								)
								.map((exp, idx) => (
									<li
										key={idx}
										className="py-6 flex items-center gap-6 hover:bg-blue-950/30 transition rounded-xl px-2"
									>
										<div className="flex-1">
											<h3 className="text-lg font-bold text-indigo-200">
												{exp.name}
											</h3>
											<div className="flex flex-wrap gap-2 mb-1">
												{exp.models.map((model) => (
													<span
														key={model}
														className="px-2 py-1 rounded bg-indigo-900 text-indigo-300 text-xs font-mono"
													>
														{model}
													</span>
												))}
											</div>
											<div className="text-xs text-indigo-300">
												Test Cases: {exp.testCases}
											</div>
										</div>
										<div className="flex items-center gap-2 text-indigo-300 font-semibold">
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												viewBox="0 0 24 24"
											>
												<rect x="3" y="4" width="18" height="18" rx="4" />
												<path d="M16 2v4M8 2v4M3 10h18" />
											</svg>
											{formatDate(exp.created)}
										</div>
									</li>
								))}
						</ul>
					)}
					{dateFormat === "iso" && (
						// Card view: 3 cards per row
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{experiments
								.filter((exp) =>
									exp.name.toLowerCase().includes(search.toLowerCase())
								)
								.map((exp, idx) => (
									<div
										key={idx}
										className="bg-zinc-900/90 border border-blue-500/20 rounded-xl shadow-xl p-8 flex flex-col gap-3 hover:scale-105 transition-all duration-300"
									>
										<div className="flex items-center gap-2 mb-2">
											<svg
												className="w-5 h-5 text-blue-400"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												viewBox="0 0 24 24"
											>
												<rect x="4" y="4" width="16" height="16" rx="2" />
												<path d="M8 8h8v8H8z" />
											</svg>
											<h3 className="text-lg font-bold text-zinc-100">
												{exp.name}
											</h3>
										</div>
										<div className="flex flex-wrap gap-2 mb-1">
											{exp.models.map((model) => (
												<span
													key={model}
													className="px-2 py-1 rounded bg-zinc-800 text-blue-300 text-xs font-mono"
												>
													{model}
												</span>
											))}
										</div>
										<div className="flex justify-between text-xs text-zinc-400 font-mono">
											<span>Test Cases: {exp.testCases}</span>
											<span>{formatDate(exp.created)}</span>
										</div>
									</div>
								))}
						</div>
					)}
				</div>

				{/* Modal */}
				{showModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
						<div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-xl w-full relative animate-fadeIn border border-blue-900 ring-1 ring-blue-500/20">
							<button
								className="absolute top-4 right-4 text-zinc-400 hover:text-white text-2xl font-bold transition"
								onClick={() => setShowModal(false)}
								aria-label="Close"
							>
								&times;
							</button>
							<h2 className="text-2xl font-bold mb-6 text-blue-300 text-center animate-fadeInDown">
								Create New Experiment
							</h2>
							<CreateExperiment />
						</div>
					</div>
				)}

				{/* Custom Animations */}
				<style jsx global>{`
					@keyframes fadeInDown {
						from {
							opacity: 0;
							transform: translateY(-30px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}
					.animate-fadeInDown {
						animation: fadeInDown 0.7s cubic-bezier(0.39, 0.575, 0.565, 1)
							both;
					}
					@keyframes fadeInUp {
						from {
							opacity: 0;
							transform: translateY(30px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}
					.animate-fadeInUp {
						animation: fadeInUp 0.7s cubic-bezier(0.39, 0.575, 0.565, 1)
							both;
					}
					@keyframes fadeIn {
						from {
							opacity: 0;
							transform: scale(0.95);
						}
						to {
							opacity: 1;
							transform: scale(1);
						}
					}
					.animate-fadeIn {
						animation: fadeIn 0.3s ease;
					}
					@keyframes pulse {
						0%,
						100% {
							opacity: 0.3;
						}
						50% {
							opacity: 0.6;
						}
					}
					.animate-pulse {
						animation: pulse 4s infinite;
					}
					@keyframes shape {
						0% {
							transform: scale(1) rotate(-8deg);
						}
						50% {
							transform: scale(1.15) rotate(8deg);
						}
						100% {
							transform: scale(1) rotate(0deg);
						}
					}
					.animate-shape {
						animation: shape 0.4s cubic-bezier(.39,.575,.565,1);
					}
					@keyframes dateRelative {
						0% { background: #1e293b; color: #64748b; transform: scale(0.9) rotate(-3deg);}
						50% { background: #1e40af; color: #38bdf8; transform: scale(1.08) rotate(3deg);}
						100% { background: #1e293b; color: #64748b; transform: scale(1) rotate(0);}
					}
					.animate-dateRelative {
						animation: dateRelative 0.5s cubic-bezier(.39,.575,.565,1);
					}
					@keyframes dateAbsolute {
						0% { background: #312e81; color: #a5b4fc; transform: scale(0.9) rotate(-3deg);}
						50% { background: #6366f1; color: #818cf8; transform: scale(1.08) rotate(3deg);}
						100% { background: #312e81; color: #a5b4fc; transform: scale(1) rotate(0);}
					}
					.animate-dateAbsolute {
						animation: dateAbsolute 0.5s cubic-bezier(.39,.575,.565,1);
					}
					@keyframes dateIso {
						0% { background: #18181b; color: #e0e7ef; border-color: #64748b; transform: scale(0.9) rotate(-3deg);}
						50% { background: #334155; color: #38bdf8; border-color: #38bdf8; transform: scale(1.08) rotate(3deg);}
						100% { background: #18181b; color: #e0e7ef; border-color: #64748b; transform: scale(1) rotate(0);}
					}
					.animate-dateIso {
						animation: dateIso 0.5s cubic-bezier(.39,.575,.565,1);
					}
				`}</style>
			</div>
		</div>
	);
}