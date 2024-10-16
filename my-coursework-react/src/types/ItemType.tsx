import ItemCategoryType from "./ItemCategoryType";

interface ProductType {
    id: number,
    name: string,
    price: number,
    description: string,
    quantity: number,
    itemcategory?: ItemCategoryType
}

export default ProductType;