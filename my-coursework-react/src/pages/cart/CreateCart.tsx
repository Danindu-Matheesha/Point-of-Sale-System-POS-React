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
        const updatedCart = [...cartedItems, item];
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
        var itemIds: any = [];

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
                    <div className="container mx-auto pt-5 pb-5 flex items-baseline justify-between border-b border-gray-400 pb-15 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Items</h1>
                    </div>

                    <div className="mt-5">
                        {items.map(function (item) {
                            return (
                                <div onClick={() => addItemToCart(item)} className="text-slate-600 border border-indigo-600 border-purple-300 rounded-full mb-3 p-3 shadow-lg">
                                    <div className="text-lg font-semibold text-slate-800">{item.name}</div>
                                    <div className="text-sm text-slate-400">{item.itemcategory?.name}</div>
                                    <div className="text-sm text-blue-500 text-right">Rs. {item.price}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="p-2 w-full">
                    <div className="container mx-auto pt-5 pb-5 flex items-baseline justify-between border-b border-gray-400 pb-15 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Cart Add</h1>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                            <a
                                href="/cart"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            > Back
                                <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>

                    <div className="pt-5 pb-5"></div>

                    <table className="w-full border-separate border-spacing-0 border-none text-left">
                        <thead className="bg-blue-400">
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
                                        <td className="w-[200px] text-right"> Rs. {item.price}</td>
                                    </tr>
                                )
                            })}
                            <div className="pt-5 pb-5"></div>
                            <tr>
                                <td colSpan={2}>
                                    <strong>Total Price</strong>
                                </td>
                                <td className="border-t border-slate-500  text-right">
                                    <strong>Rs. {total}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-5">
                        <button type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 clear" onClick={saveCart}>Save Cart</button>
                    </div>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-1 -top-50 -z-20 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
        </div>
    )
}

export default CreateCart;