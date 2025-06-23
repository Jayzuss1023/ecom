import { TagIcon, TrendUpwardIcon } from "@sanity/icons";
import {defineField, defineType} from "sanity";

export const salesType = defineType({
    name: "sale",
    title: "Sale",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Sale Title",
            type: "string"
        }),
        defineField({
            name: "description",
            title: "Sale Description",
            type: "text"
        }),
        defineField({
            name: "discountAmount",
            title: "Discount Amount",
            description: "Amount off in percentage of fixed value",
            type: "number"
        }),
        defineField({
            name: "couponCode",
            title: "Coupon Code",
            type: "string"
        }),
        defineField({
            name: "validFrom",
            title: "Valid From",
            type: "datetime"
        }),
        defineField({
            name: "validUntil",
            title: "Valid Until",
            type: "datetime"
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            description: "Toggle to activate/deactivate the sale",
            type: "boolean",
            initialValue: true
        })
    ],
    preview: {
        select: {
            title: "title",
            discountAmount: "discountAmount",
            couponCode: "couponCode",
            isActive: "isActive",
        },
        prepare(selection) {
            const {title, discountAmount, couponCode, isActive} = selection;
            const status = isActive ? "Active" : "Inactive";
            return {
                title,
                subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`
            }
        }
    }
})