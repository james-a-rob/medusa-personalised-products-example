import DesignModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const DESIGN_MODULE = "design"

export default Module(DESIGN_MODULE, {
    service: DesignModuleService,
})