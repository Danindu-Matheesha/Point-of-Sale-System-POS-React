import { useAuth } from "../context/AuthContext";

function Home() {
    const { logout } = useAuth()

    const navigation = [
        {name: "Category" , href: "/categories"}
    ]

    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <img
                            alt=""
                            src="https://sgsolutions.com.mt/wp-content/uploads/2020/04/POS-Icon.png"
                            className="h-8 w-auto"
                        />
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                        <button className="text-sm font-semibold leading-6 text-gray-900" onClick={logout}>Logout
                        <span aria-hidden="true">&rarr;</span>  
                        </button>
                    </div>
                </nav>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Point of Sale System (POS)
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            A POS, or point of sale, enables merchants to process payments and log transactions. It is a computer-based cash register with software capable of tallying up orders, taking payments, monitoring inventory and buying trends, creating invoices, and collecting marketing data.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;