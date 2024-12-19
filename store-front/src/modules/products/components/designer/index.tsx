"use client";

import { useState } from "react";
import { createDesign } from "@lib/data/designs";
import Image from "next/image"

const Designer = ({ initialPrompt, onDesignChange }) => {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [design, setDesign] = useState<{ id: string; imageLocation: string; prompt: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await createDesign(prompt);
            setDesign(result);
        } catch (err) {
            console.error("Error creating design:", err);
            setError("Failed to create design. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create a Design</h1>

            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a prompt for the design"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300"
                />
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-300"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Generate Design"}
                </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {design && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Your Design</h2>
                    <p>Prompt: {design.prompt}</p>
                    <Image
                        // todo: fix so not hard coded to localhost 9000
                        src={`http://localhost:9000/static/${design.imageLocation}`}
                        width="200"
                        height="200"

                        alt="Generated Design"
                        className="mt-4 max-w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            )}
        </div>
    );
};

export default Designer;
