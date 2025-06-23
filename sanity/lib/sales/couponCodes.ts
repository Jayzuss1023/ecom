export const COUPON_CODES = {
    BFRIDAY: "BFRIDAY",
    XMAS2021: "XMAS2021",
    NY2022: "NY2022"
} as const

// As const. The object is immutable. It is a read only document with the fields displayed. Can not be added, or updated.

export type CouponCode = keyof typeof COUPON_CODES

