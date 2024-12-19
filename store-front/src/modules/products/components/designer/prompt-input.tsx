"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PromptInput = () => {
    const [promptVal, setPrompt] = useState("");
    const router = useRouter();

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (promptVal) {
            router.push(`/products/t-shirt?prompt=${encodeURIComponent(promptVal)}`);
        }
    };

    return (
        <>
            <input
                type="text"
                value={promptVal}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your T-shirt design"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
                type="button"
                onClick={handleButtonClick}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
                Get Started
            </button>
        </>
    );
};

export default PromptInput;
