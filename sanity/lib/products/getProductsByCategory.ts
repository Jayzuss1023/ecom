import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const getProductsByCategory = async (categorySlug: string) => {
    console.log(categorySlug)
    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
            *[
                _type == "product"
                && references(*[_type == "category" && slug.current == $categorySlug]._id)
            ] | order(name asc)
        `)

        try {
            const products = await sanityFetch({
                query: PRODUCTS_BY_CATEGORY_QUERY,
                params: {
                    categorySlug,
                }
            })
            console.log(products)

            return products.data || []
        } catch(err) {
            console.error("Error fetching products by category: ", err)
            return []
        }
}