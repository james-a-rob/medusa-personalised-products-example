import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"
import Hero from "@modules/home/components/hero"
import PromptInput from "@modules/products/components/designer/prompt-input"
import DesignCarousel from "@modules/home/components/featured-designs/designs-carousel"
import { listCollections } from "@lib/data/collections"
import { getAllDesigns } from "@lib/data/designs"

import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)


  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  const designs = await getAllDesigns();
  console.log('= = = = ', designs)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="px-4 py-4 flex justify-center">
        <div className="flex items-center gap-2 w-[60%] mt-8">
          <PromptInput />
        </div>
      </div>
      <div className="content-container py-12">
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="popular-designs"
        >
          Popular Designs
        </Heading>
        <DesignCarousel designs={designs} />

      </div>
    </>
  )
}
