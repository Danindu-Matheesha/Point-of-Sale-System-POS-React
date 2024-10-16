import { useEffect, useState } from "react";
import CartType from "../../types/CartType";
import axios from "axios";
import { Link } from "react-router-dom";

function Order() {

    const [carts, setCarts] = useState<CartType[]>([]);

    async function loadCarts() {
        try {
            const response = await axios.get("http://localhost:8081/cart");
            setCarts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function() {
        loadCarts();
    },[])


    return (
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Cart</h1>

            <Link to="/cart/create" className="text-blue-500 mb-5 block">Add Cart</Link>

            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200">
                    <tr>
                        <th className="w-[80px]">Cart ID</th>
                        <th className="w-[200px]">Cart Date and Time</th>
                        <th className="w-[200px]">Total Amount</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map(function (cart) {
                        return (
                            <tr>
                                <td>{cart.id}</td>
                                <td>{new Date(cart.cartDateTime).toLocaleString()}</td>
                                <td>{cart.totalPrice}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Order;