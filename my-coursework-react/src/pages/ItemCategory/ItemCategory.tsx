import axios from "axios";
import { useEffect, useState } from "react";
import ItemCategoryType from "../../types/ItemCategoryType";
import { useAuth } from "../../context/AuthContext";

function Category() {

    const { isAuthenticated, jwtToken } = useAuth();

    const [categories, setCategories] = useState<ItemCategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadCategories() {
        const response = await axios.get("http://localhost:8081/categories", config);
        setCategories(response.data);
    }

    useEffect(function () {
        if (isAuthenticated) {
            loadCategories();  
        }
    }, [isAuthenticated]) 

    function handleCategoryName(event: any) {
        setCategoryName(event.target.value);
    }

    async function handleSubmit() {
        const data = {
            name: categoryName
        }
        const response = await axios.post("http://localhost:8081/categories", data, config);
        console.log(response);
        loadCategories();
    }

    return (
        <div className="container mx-auto pt-10 pb-10">
            <div className="container mx-auto pt-5 pb-5 flex items-baseline justify-between border-b border-gray-400 pb-15 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Item Categories</h1>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                    <a
                        href="/"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    > Back
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
            <div className="pt-5 pb-5">
                {categories && categories.map(function (itemcategory: ItemCategoryType) {
                    return (
                        <div className="text-slate-600 border border-gray-400 rounded-lg mb-3 p-3 shadow-lg inline-block me-3">
                            {itemcategory.name}
                        </div>
                    )
                })
                }
            </div>
            <div className="border border-slate-900 py-3 px-4 rounded-lg max-w-[350px]">
                <h2 className="text-xl text-slate-1000 font-medium mb-3 mt-5">Create Category</h2>
                <div className="pt-5 pb-5">
                    <form>
                        <label className="text-slate-600 font-sm block mb-2">Category Name</label>
                        <input type="text" className="text-slate-600 font-sm block mb-3 w-full p-2 border border-slate-300 rounded-lg" onChange={handleCategoryName} required />
                        <div className="pt-5">
                            <button type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 clear" onClick={handleSubmit}>Create Category</button>
                        </div>
                    </form>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-1 -top-50 -z-20 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </div>
    )
}

export default Category;

