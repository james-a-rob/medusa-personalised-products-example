'use client'

import Image from 'next/image'
import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation' // Use next/navigation for Next.js 13+

interface Design {
    id: string;
    imageLocation: string;
    prompt: string;
}

export default function ProductCarousel({ designs }: { designs: Design[] }) {
    const router = useRouter();

    const handleImageClick = (event: MouseEvent<HTMLDivElement>, promptVal: string) => {
        event.preventDefault();
        event.stopPropagation();
        if (promptVal) {
            router.push(`/products/t-shirt?prompt=${encodeURIComponent(promptVal)}`);
        }
    };

    return (
        <div className="w-full overflow-x-auto pb-6">
            <div className="flex gap-6 px-4">
                {designs.map((design) => (
                    <div
                        key={design.id}
                        className="w-[300px] flex-shrink-0 cursor-pointer"
                        onClick={(event) => handleImageClick(event, design.prompt)} // Pass design.prompt to the function
                    >
                        <div className="bg-white rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                            <div className="aspect-square relative mb-4">
                                <Image
                                    src={`${design.imageLocation}`}
                                    alt={design.imageLocation}
                                    fill
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
