import { AbstractFulfillmentProviderService } from "@medusajs/framework/utils"

class PrintFulfillmentProviderService extends AbstractFulfillmentProviderService {
  static identifier = "print"
  // todo - implement calls to fullfil orders via print api such as Prodigi
}

export default PrintFulfillmentProviderService