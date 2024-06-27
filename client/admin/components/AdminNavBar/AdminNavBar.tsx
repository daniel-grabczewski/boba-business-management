
import { useNavigate } from 'react-router-dom'

export const AdminNavBar = () => {

  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  return (
    <div className="bg-gray-500 py-4 text-center">
      <div className="inline-block space-x-4">
        <button
          onClick={() => goTo('/admin')}
          className="font-bold text-white hover:bg-gray-400 px-4 py-2 rounded"
        >
          Dashboard
        </button>
        <button
          onClick={() => goTo('/admin/inbox')}
          className="font-bold text-white hover:bg-gray-400 px-4 py-2 rounded"
        >
          Inbox
        </button>
        <button
          onClick={() => goTo('/admin/orders')}
          className="font-bold text-white hover:bg-gray-400 px-4 py-2 rounded"
        >
          Orders
        </button>
        <button
          onClick={() => goTo('/admin/products-summary')}
          className="font-bold text-white hover:bg-gray-400 px-4 py-2 rounded"
        >
          Products
        </button>
        <button
          onClick={() => goTo('/admin/add-product')}
          className="font-bold text-white hover:bg-gray-400 px-4 py-2 rounded"
        >
          Add Product
        </button>
        <button
          onClick={() => goTo('/admin/reviews')}
          className="font-bold text-white hover:bg-gray-400 px-4 py-2 rounded"
        >
          Reviews
        </button>
      </div>
    </div>
  )
}
