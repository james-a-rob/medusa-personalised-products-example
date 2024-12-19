"use client";

import { useState } from "react";
import { createDesign } from "@lib/data/designs";
import Preview from './preview';
import { Button, Heading, Text, clx } from "@medusajs/ui"
import Action from './actions';

const Designer = ({ initialPrompt, onDesignChange, product }) => {
    const colorOption = product.options.find((option) => (option.title === 'Color'));

    const [prompt, setPrompt] = useState(initialPrompt);
    const [design, setDesign] = useState<{ id: string; imageLocation: string; prompt: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<Record<string, string | undefined>>({ [colorOption.id]: 'blue' })
    const selectedColor = options[colorOption.id]

    const setOptionValue = (optionId: string, value: string) => {
        setOptions((prev) => ({
            ...prev,
            [optionId]: value,
        }))
    }

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

    const productImage = product.images.find((image) => (image.url.includes(selectedColor)))

    return (
        <div className="flex max-w-screen-xl mx-auto p-4 space-x-4">
            {/* Design Section */}
            <div id="design" className="w-7/10 max-w-3xl flex-1 p-4">
                <h4 className="text-2xl font-bold mb-4">Describe your design</h4>

                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter a prompt for the design"
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-300"
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Generate Design"}
                    </Button>
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}


                <div>
                    <Preview designImageLocation={design?.imageLocation} productImageLocation={productImage.url} />
                    <h2 className="text-xl font-semibold">Your Design</h2>
                    <p>Prompt: {design?.prompt}</p>
                </div>

            </div>

            {/* Purchase Section */}
            <div id="purchase" className="w-3/10 flex flex-col sticky top-24 py-8 gap-y-12">
                <Action product={product} options={options} setOptionValue={setOptionValue} />
            </div>
        </div>


    );
};

export default Designer;
