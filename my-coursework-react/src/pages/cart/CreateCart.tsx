import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCart() {

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

    const [cartedItems, setCartedItems] = useState<ItemType[]>([]);
    const [total, setTotal] = useState<number>(0);

    function addItemToCart(item: ItemType) {
        const updatedCart = [...cartedItems,item ];
        setCartedItems(updatedCart);
    }

    useEffect(function () {
        cartedItems.map(function (item) {
            const totalPrice = total + item.price;
            setTotal(totalPrice);
        })
    }, [cartedItems]);

    const navigate = useNavigate();

    async function saveCart() {
        var itemIds:any = [];

        cartedItems.map(function (item) {
            itemIds.push(item.id);
        });

        try {
            await axios.post("http://localhost:8081/cart", {
                itemIds: itemIds
            })

            navigate("/cart");
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
                                <div onClick={() => addItemToCart(item)} className="border border-slate-200 rounded-lg p-2 mb-3">
                                    <div className="text-lg font-semibold text-slate-800">{item.name}</div>
                                    <div className="text-sm text-slate-400">{item.itemcategory?.name}</div>
                                    <div className="text-sm text-green-600 text-right">Rs. {item.price}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="p-2 w-full">
                    <span className="text-xl font-semibold text-slate-800">New Cart</span>

                    <table className="w-full border-separate border-spacing-0 border-none text-left">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th className="text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartedItems.map(function (item) {
                                return (
                                    <tr>
                                        <td className="w-[80px]">{item.id}</td>
                                        <td className="w-[200px]">{item.name}</td>
                                        <td className="w-[200px] text-right">{item.price}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={2}>
                                    <strong>Total</strong>
                                </td>
                                <td className="border-t border-slate-500 text-right">
                                    <strong>{total}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-5">
                        <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={saveCart}>Save Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCart;