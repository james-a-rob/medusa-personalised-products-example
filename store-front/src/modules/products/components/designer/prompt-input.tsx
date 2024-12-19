"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PromptInput = () => {
    const [prompt, setPrompt] = useState("");
    const router = useRouter();

    const handleButtonClick = () => {
        if (prompt) {
            router.push(`/products/t-shirt?prompt=${encodeURIComponent(prompt)}`);
        }
    };

    return (
        <>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your T-shirt design"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
                type="submit"
                onClick={handleButtonClick}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
                Get Started
            </button>
        </>
    );
};

export default PromptInput;
