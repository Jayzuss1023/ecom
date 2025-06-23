import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async(couponCode: CouponCode) => {
    // $couponCode is the argument being passed by the User
    const ACTIVE_SALE_BY_COUPON_CODE_QUERY = defineQuery(`
            *[
            _type == "sale"
            && isActive == true
            && couponCode == $couponCode
        ] | order(validFrom desc)[0]
        `)

        try {
            const activeSale = await sanityFetch({
                query: ACTIVE_SALE_BY_COUPON_CODE_QUERY,
                params: {
                    couponCode
                    // pass the coupon code as a query param
                }
            })

            return activeSale ? activeSale.data : null
        } catch(error) {
            console.error("error retreiving active sale by coupon code: ", error)
            return null
        }
}