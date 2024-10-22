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

    useEffect(function () {
        loadCarts();
    }, [])


    return (
        <div className="container mx-auto pt-5 pb-5">
            <div className="container mx-auto pt-5 pb-5 flex items-baseline justify-between border-b border-gray-400 pb-15 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Cart</h1>
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
            <Link to="/cart/create" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 clear">Add Cart</Link>
            <div className="pt-4 pb-4"></div>

            <h1 className="text-1xl font-bold tracking-tight text-gray-600 broder underline underline-offset-1">Show All Cart</h1>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end ">

            </div>

            <div className="pt-4 pb-4"></div>
            <table className="w-full border-separate border-spacing-0 border-none text-left">
                <thead className="bg-blue-400">
                    <tr>
                        <th className="w-[100px]">Cart ID</th>
                        <th className="w-[300px]">Cart Date and Time</th>
                        <th className="w-[200px]">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map(function (cart) {
                        return (
                            <tr>
                                <td>{cart.id}</td>
                                <td>{new Date(cart.cartDateTime).toLocaleString()}</td>
                                <td>Rs. {cart.totalPrice}</td>
                                <td></td>
                            </tr>
                        )
                    })}
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

export default Order;