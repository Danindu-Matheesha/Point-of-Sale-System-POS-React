import { useEffect, useState } from "react";
import StockType from "../../types/StockType";
import axios from "axios";
import { Link } from "react-router-dom";

function Stock() {

    const [stocks, setStocks] = useState<StockType[]>([]);

    async function loadStocks() {
        try {
            const response = await axios.get("http://localhost:8081/stock");
            setStocks(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        loadStocks();
    }, [])


    return (
        <div className="container mx-auto pt-5 pb-5">
            <div className="container mx-auto pt-5 pb-5 flex items-baseline justify-between border-b border-gray-400 pb-15 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Stocks</h1>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                    <a
                        href="/"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    > Back
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>

            <div className="pt-4 pb-4"></div>
            <Link to="/stock/Create" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 clear">Add Stock</Link>
            <div className="pt-4 pb-4"></div>

            <h1 className="text-1xl font-bold tracking-tight text-gray-600 broder underline underline-offset-1">Show All Stocks</h1>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end ">

            </div>
            <div className="pt-4 pb-4"></div>

            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-blue-400">
                    <tr>
                        <th className="w-[100px]">Stock ID</th>
                        <th className="w-[300px]">Stock Date and Time</th>
                        <th className="w-[300px]">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => (
                        <tr key={stock.id}>
                            <td>{stock.id}</td>
                            <td>{new Date(stock.stockDateTime).toLocaleString()}</td>
                            <td>{stock.quantity}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default Stock;