import { Category, Product } from "@/sanity.types";

import { ProductGrid } from "./ui/ProductGrid"
import { CategorySelectorComponent } from "./ui/category-selector";

export interface ProductsViewProps {
    products: Product[]
    categories: Category[]
}

export const ProductsView = ({products, categories}: ProductsViewProps) => {

    return (
        <div className="flex flex-col">
            <div className="md:w-full sm:w-[200px]">
                {/* categories */}
                <div className="w-full sm:w-[200px]">
                    <CategorySelectorComponent categories={categories}/>
                </div>


                {/* products */}
                <div className="flex-1">
                    <ProductGrid products={products} />
                    <hr className="w-1/2 sm:w-3/4"/>
                </div>
            </div>
        </div>
    )
}

