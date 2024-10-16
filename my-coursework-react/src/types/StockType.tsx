import ItemType from "./ItemType";

interface StockType {
    id: number,
    stockDateTime: Date,
    quantity: number,
    itemedStocks: ItemType[]
}

export default StockType;