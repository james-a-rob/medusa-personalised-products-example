'use client'

import Image from 'next/image'

interface Design {
    id: string;
    imageLocation: string;
    prompt: string;
}
export default function ProductCarousel({ designs }: { designs: Design[] }) {
    return (
        <div className="w-full overflow-x-auto pb-6">
            <div className="flex gap-6 px-4">
                {designs.map((design) => (
                    <div
                        key={design.id}
                        className="w-[300px] flex-shrink-0"
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

