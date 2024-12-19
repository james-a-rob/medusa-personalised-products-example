import { defineWidgetConfig } from "@medusajs/admin-sdk"

const ProductWidget = ({ data }) => {
    return (
        <div className="shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg divide-y p-0">

            <div className="flex items-center justify-between px-6 py-4">
                <h2 className="font-sans font-medium h2-core">AI Generated Design</h2>
            </div>
            <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
                image {data.items[0].metadata.logo}
            </div>
            <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
                prompt
            </div>
        </div>
    )
}

export const config = defineWidgetConfig({
    zone: "order.details.side.before",
})

export default ProductWidget