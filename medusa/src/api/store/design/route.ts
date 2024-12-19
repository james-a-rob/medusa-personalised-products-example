import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import DesignModuleService from "../../../modules/design/service"
import { uploadFilesWorkflow } from "@medusajs/medusa/core-flows"

import { DESIGN_MODULE } from "../../../modules/design";

interface CreateDesignRequestBody {
  prompt: string;
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const designModuleService: DesignModuleService = req.scope.resolve(
    DESIGN_MODULE
  );

  try {
    // Fetch all designs from the database (you may need to customize this based on your data storage)
    const [designs] = await designModuleService.listAndCountDesigns({},
      {
        order: { created_at: 'DESC' },
        take: 8,
      });
    console.log('= = = = ', designs)
    // Return all designs to the frontend
    res.status(200).json({
      designs
    });
  } catch (error) {
    console.error("Error fetching designs:", error);
    res.status(500).json({
      error: "Failed to fetch designs."
    });
  }
}


export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const access = "public"
  console.log('body = = = = = =', req.body)
  const { prompt } = req.body as CreateDesignRequestBody;

  const designModuleService: DesignModuleService = req.scope.resolve(
    DESIGN_MODULE
  )

  // validate prompt a bit
  // call openAI
  const designBuffer = await designModuleService.generateDesign(prompt);
  if (!designBuffer) {
    console.log('failed to generate image');
    res.sendStatus(500)
    return;
  }

  // store image
  const { result } = await uploadFilesWorkflow(req.scope).run({
    input: {
      files: [{
        filename: 'ai-design.png',
        mimeType: 'png',
        content: designBuffer.toString("binary"),
        access,
      }
      ],
    },
  });

  console.log("result", result)
  // store design to designs table
  await designModuleService.createDesigns({
    imageLocation: result[0].url,
    prompt
  })
  // return design to frontend

  res.status(201).json({
    imageLocation: result[0].url,
    prompt
  });
}