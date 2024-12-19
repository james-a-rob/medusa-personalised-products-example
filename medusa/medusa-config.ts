import { loadEnv, defineConfig } from '@medusajs/framework/utils'

import { DESIGN_MODULE } from "./src/modules/design"

loadEnv(process.env.NODE_ENV || 'development', process.cwd())


module.exports = defineConfig({
  modules: {
    [DESIGN_MODULE]: {
      resolve: "./src/modules/design",
    },
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
