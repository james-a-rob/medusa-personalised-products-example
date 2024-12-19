import React, { useState, useMemo } from 'react';
import { useParams } from "next/navigation"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import ProductPrice from '@modules/products/components/product-price/index.tsx'
import { addToCart } from "@lib/data/cart"

import { isEqual } from "lodash"

import ColorSelector from './color-selector';
import { Button } from '@medusajs/ui';

const optionsAsKeymap = (
    variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
    return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
        acc[varopt.option_id] = varopt.value
        return acc
    }, {})
}

const Actions: React.FC = ({ product, options, setOptionValue }) => {
    const disabled = false;
    const [isAdding, setIsAdding] = useState(false)
    const countryCode = useParams().countryCode as string

    const isValidVariant = useMemo(() => {
        return product.variants?.some((v) => {
            const variantOptions = optionsAsKeymap(v.options)
            return isEqual(variantOptions, options)
        })
    }, [product.variants, options])



    const selectedVariant = useMemo(() => {
        if (!product.variants || product.variants.length === 0) {
            return
        }

        return product.variants.find((v) => {
            const variantOptions = optionsAsKeymap(v.options)
            return isEqual(variantOptions, options)
        })
    }, [product.variants, options])

    const inStock = useMemo(() => {
        // If we don't manage inventory, we can always add to cart
        if (selectedVariant && !selectedVariant.manage_inventory) {
            return true
        }

        // If we allow back orders on the variant, we can add to cart
        if (selectedVariant?.allow_backorder) {
            return true
        }

        // If there is inventory available, we can add to cart
        if (
            selectedVariant?.manage_inventory &&
            (selectedVariant?.inventory_quantity || 0) > 0
        ) {
            return true
        }

        // Otherwise, we can't add to cart
        return false
    }, [selectedVariant])

    const handleAddToCart = async () => {
        if (!selectedVariant?.id) return null

        setIsAdding(true)

        await addToCart({
            variantId: selectedVariant.id,
            quantity: 1,
            countryCode,
            metadata: { logo: 'image-src.png' }
        })

        setIsAdding(false)
    }

    if (!product) {
        return
    }


    return <>
        {/* <ColorSelector /> */}

        {(product.options || []).map((option) => {
            return (
                <div key={option.id}>

                    <OptionSelect
                        option={option}
                        current={options[option.id]}
                        updateOption={setOptionValue}
                        title={option.title ?? ""}
                        data-testid="product-options"
                        disabled={!!disabled || isAdding}
                    />
                </div>
            )
        })}

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
            onClick={handleAddToCart}
            disabled={
                !inStock ||
                !selectedVariant ||
                !!disabled ||
                isAdding ||
                !isValidVariant
            }
            variant="primary"
            className="w-full h-10"
            isLoading={isAdding}
            data-testid="add-product-button"
        >
            {!selectedVariant && !options
                ? "Select variant"
                : !inStock || !isValidVariant
                    ? "Out of stock"
                    : "Add to cart"}
        </Button>
    </>
};

export default Actions;