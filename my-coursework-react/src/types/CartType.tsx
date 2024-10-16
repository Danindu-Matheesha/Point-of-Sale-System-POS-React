import ItemType from "./ItemType";

interface StockType {
    id: number,
    cartDateTime: Date,
    totalPrice: number,
    cartedItems: ItemType[]
}

export default StockType;