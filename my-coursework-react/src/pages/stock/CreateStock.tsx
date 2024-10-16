import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateStock() {

    const [items, setItems] = useState<ItemType[]>([]);

    async function loadItems() {
        try {
            const response = await axios.get("http://localhost:8081/items");
            setItems(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        loadItems();
    }, [])

    const [itemedStocks, setItemedStocks] = useState<ItemType[]>([]);
    const [quantitys, setQuantity] = useState<number>(0);

    function addItemToStock(item: ItemType) {
        const updatedStock = [...itemedStocks, item];
        setItemedStocks(updatedStock);
    }

    useEffect(function () {
        itemedStocks.map(function (item) {
            const quantity = item.quantity + quantitys;
            setQuantity(quantity);
        })
    }, [itemedStocks]);

    const navigate = useNavigate();

    async function saveStock() {
        var itemIds:any = [];

        itemedStocks.map(function (item) {
            itemIds.push(item.id);
        });

        try {
            await axios.post("http://localhost:8081/stock", {
                itemIds: itemIds
            })

            navigate("/stock");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex">
                <div className="w-[400px] border-r border-slate-100 p-2">
                    <span className="text-xl font-semibold text-slate-800 block h-[40px] p-2">Items</span>

                    <div className="mt-5">
                        {items.map(function (item) {
                            return (
                                <div onClick={() => addItemToStock(item)} className="border border-slate-200 rounded-lg p-2 mb-3">
                                    <div className="text-lg font-semibold text-slate-800">{item.name}</div>
                                    <div className="text-sm text-slate-400">{item.itemcategory?.name}</div>
                                    <div className="text-sm text-green-600 text-right">Quantity = {item.quantity}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="p-2 w-full">
                    <span className="text-xl font-semibold text-slate-800">New Stock</span>

                    <table className="w-full border-separate border-spacing-0 border-none text-left">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th className="text-right">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemedStocks.map(function (item) {
                                return (
                                    <tr>
                                        <td className="w-[80px]">{item.id}</td>
                                        <td className="w-[200px]">{item.name}</td>
                                        <td className="w-[200px] text-right">{item.quantity}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={2}>
                                    <strong>Quantity</strong>
                                </td>
                                <td className="border-t border-slate-500 text-right">
                                    <strong>{quantitys}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-5">
                        <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={saveStock}>Save Stock</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStock;