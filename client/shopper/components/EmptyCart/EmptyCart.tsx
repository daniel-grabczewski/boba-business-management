import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../../../baseUrl'

const EmptyCart = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(`${baseURL}${link}`)
  }


  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl font text-center mt-12 mb-4">
        {`No items currently in your cart. Let's get shopping! 😀`}
      </h1>
      <button
        className="bg-gray-500 text-white p-4 w-auto whitespace-nowrap text-lg font-bold rounded-md transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 mt-4"
        onClick={() => goTo('/shop')}
      >
        Continue shopping
      </button>
    </div>
  )
}

export default EmptyCart
