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
            <h1 className="text-3xl font-semibold mb-5">Stock</h1>

            <Link to="/stock/create" className="text-blue-500 mb-5 block">Add Stock</Link>

            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Stock ID</th>
                        <th className="w-[200px]">Stock Date and Time</th>
                        <th className="w-[200px]">Quantity</th>
                        <th className="w-[200px]">Actions</th>
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
        </div>
    )
}

export default Stock;