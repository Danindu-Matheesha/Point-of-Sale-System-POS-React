import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import axios from "axios";
import ItemCategoryType from "../../types/ItemCategoryType";
import { useAuth } from "../../context/AuthContext";

function Item() {

    const { isAuthenticated, jwtToken } = useAuth();

    const [items, setItems] = useState<ItemType[]>([]);

    const [itemName, setItemName] = useState<string>("");
    const [price, setPrice] = useState<number>(0.0);
    const [description, setDescription] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0.0);
    const [itemcategoryId, setItemCategoryId] = useState<number>();

    const [itemCategories, setItemCategories] = useState<ItemCategoryType[]>([]);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadItems() {
        const response = await axios.get("http://localhost:8081/items", config)
        setItems(response.data);
    }

    async function loadItemCategories() {
        const response = await axios.get("http://localhost:8081/categories", config);
        setItemCategories(response.data);
    }

    useEffect(function () {

        if (isAuthenticated) {
            loadItems();
            loadItemCategories();
        }
    }, [isAuthenticated])

    function handleItemName(event: any) {
        setItemName(event.target.value);
    }

    function handlePrice(event: any) {
        setPrice(event.target.value);
    }

    function handleDescription(event: any) {
        setDescription(event.target.value);
    }

    function handleQuantity(event: any) {
        setQuantity(event.target.value);
    }

    function handleItemCategoryId(event: any) {
        setItemCategoryId(event.target.value);
    }

    const [itemEditing, setItemEditing] = useState<ItemType | null>(null);

    function editItem(item: ItemType) {
        setItemEditing(item);
        setItemName(item.name);
        setPrice(item.price);
        setDescription(item.description);
        setQuantity(item.quantity);
        setItemCategoryId(item.itemcategory?.id);
    }
    async function updateItem() {
        const data = {
            name: itemName,
            price: price,
            description: description,
            quantity: quantity,
            itemcategoryId: itemcategoryId
        }
        try {
            await axios.put(`http://localhost:8081/items/${itemEditing?.id}`, data);
            setItemEditing(null);
            loadItems();
            setItemName("");
            setPrice(0);
            setDescription("");
            setQuantity(0);
            setItemCategoryId(0);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteItem(itemId: number) {
        try {
            await axios.delete(`http://localhost:8081/items/${itemId}`);
            loadItems();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container mx-auto pt-5 pb-5">
            <div className="container mx-auto pt-5 pb-5 flex items-baseline justify-between border-b border-gray-400 pb-15 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Show All Items</h1>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                    <a
                        href="/item"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    > Back
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
            <div className="pt-4 pb-4"></div>
            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-blue-400">
                    <tr>
                        <th className="w-[80px]">Item ID</th>
                        <th className="w-[200px]">Item Name</th>
                        <th className="w-[200px]">Item Price</th>
                        <th className="w-[200px]">Item Description</th>
                        <th className="w-[200px]">Item Quantity</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(function (item) {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>

                                <td>
                                    <div className="space-x-4">
                                        <button onClick={() => editItem(item)} className="bg-blue-400 text-white px-2 py-1 rounded-lg hover:bg-blue-600 ">Edit</button>

                                        <button onClick={() => deleteItem(item.id)} className="bg-red-500 text-black  rounded-lg px-2 py-1 hover:bg-red-500 space-x-4">
                                            Delete
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="border border-slate-600 py-3 px-4 rounded-lg max-w-[350px]">
                <form>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Item Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-400 rounded-lg" value={itemName} onChange={handleItemName} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Price</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-400 rounded-lg" value={price} onChange={handlePrice} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Description</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-400 rounded-lg" value={description} onChange={handleDescription} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Quantity</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-400 rounded-lg" value={quantity} onChange={handleQuantity} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Item Category</label>
                        <select className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-400 rounded-lg" value={itemcategoryId} onChange={handleItemCategoryId} required>
                            <option value="">Please select category</option>
                            {itemCategories.map(function (itemcategory) {
                                return (
                                    <option value={itemcategory.id}>{itemcategory.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <button type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 clear" onClick={updateItem}>Update Item</button>

                </form>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
        </div>
    )
}

export default Item;