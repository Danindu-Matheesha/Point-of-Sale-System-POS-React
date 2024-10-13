import { useAuth } from "../context/AuthContext";

function Home() {

  const { logout } = useAuth()

  return (
    <div>
        <h1 className="text-2xl text-center">Point of Sale System (POS)</h1>
        <button className="bg-gray-800 text-white px-5 py-2 me-3" onClick={logout}>Logout</button>
    </div>
  )
}

export default Home;