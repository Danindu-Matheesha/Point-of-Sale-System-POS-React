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

    function handleQuantity(event: any){
        setQuantity(event.target.value);
    }

    function handleItemCategoryId(event: any) {
        setItemCategoryId(event.target.value);
    }

    async function handleSubmit() {
        const data = {
            name: itemName,
            price: price,
            description: description,
            quantity: quantity,
            itemcategoryId: itemcategoryId
        }

        try {
            await axios.post("http://localhost:8081/items", data);
            loadItems();
            setItemName("");
            setPrice(0);
            setDescription("");
            setQuantity(0);
            setItemCategoryId(0);
        } catch (error: any) {
            console.log(error);
        }
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
            quantity:quantity,
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
            <h1 className="text-3xl font-semibold mb-5">Items</h1>

            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
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
                                    <button onClick={() => editItem(item)} className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-300">Edit</button>

                                    <button onClick={() => deleteItem(item.id)} className="bg-red-400 text-white rounded-lg px-2 py-1 hover:bg-red-500">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

            <div className="border border-slate-200 py-3 px-4 rounded-lg max-w-[350px]">
                <form>
                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Item Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemName} onChange={handleItemName} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Price</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={price} onChange={handlePrice} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Description</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={description} onChange={handleDescription} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Quantity</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={quantity} onChange={handleQuantity} required />
                    </div>

                    <div>
                        <label className="text-slate-600 font-sm block mb-2">Item Category</label>
                        <select className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" value={itemcategoryId} onChange={handleItemCategoryId} required>
                            <option value="">Please select category</option>
                            {itemCategories.map(function (itemcategory) {
                                return (
                                    <option value={itemcategory.id}>{itemcategory.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {itemEditing ? (
                        <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={updateItem}>Update Item</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handleSubmit}>Create Item</button>
                        </>
                    )}



                </form>
            </div>


        </div>
    )
}

export default Item;