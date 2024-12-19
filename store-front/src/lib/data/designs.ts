import { sdk } from "@lib/config";
import { HttpTypes } from "@medusajs/types";

export interface CreateDesignResponse {
    id: string;
    imageLocation: string;
    prompt: string;
}
interface Design {
    id: string;
    imageLocation: string;
    prompt: string;
}

export const createDesign = async (prompt: string): Promise<CreateDesignResponse> => {

    return sdk.client
        .fetch<CreateDesignResponse>("/store/design", {
            method: "POST",
            body: { prompt },
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((response) => response)
        .catch((error) => {
            console.error("Error creating design:", error);
            throw new Error("Failed to create design");
        });
};

export const getAllDesigns = async (): Promise<Design[]> => {
    return sdk.client
        .fetch<{ designs: Design[] }>("/store/design", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((response) => response.designs)
        .catch((error) => {
            console.error("Error fetching designs:", error);
            throw new Error("Failed to fetch designs");
        });
};
