import { model } from "@medusajs/framework/utils";

export const Design = model.define("design", {
    id: model
        .id()
        .primaryKey(),
    imageLocation: model.text(),
    prompt: model.text(),
});
