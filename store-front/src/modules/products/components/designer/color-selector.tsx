'use client'

import { useState } from 'react'

const colors = [
    { name: 'Green', class: 'bg-green-500' },
    { name: 'White', class: 'bg-white' },
    { name: 'Black', class: 'bg-black' },
    { name: 'Blue', class: 'bg-blue-500' },
]

export default function ColorSelector() {
    const [selectedColor, setSelectedColor] = useState(colors[0])

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-2">Color Selector</h2>
            <div className="flex space-x-2 mb-2">
                {colors.map((color) => (
                    <button
                        key={color.name}
                        className={`w-8 h-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${color.class
                            } ${color.name === 'White' ? 'border border-gray-200' : ''} ${selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                            }`}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color.name}`}
                        aria-pressed={selectedColor.name === color.name}
                    />
                ))}
            </div>
            <div>
                {/* <p className="text-sm">
                    Selected: <span className="font-semibold">{selectedColor.name}</span>
                </p> */}
            </div>
        </div>
    )
}

