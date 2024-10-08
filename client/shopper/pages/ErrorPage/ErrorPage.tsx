import { useNavigate, useLocation } from 'react-router-dom'
import {baseURL} from '../../../../baseUrl'

const ErrorPage = ({ errorMessage = "Sorry, we couldn't find that page" }) => {
  const location = useLocation()

  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(`${baseURL}${link}`)
  }

  // Determine whether the user is a shopper or admin based on the URL
  const isShopper = !location.pathname.includes(`${baseURL}/admin`)

  const buttonText = isShopper ? 'Continue shopping' : 'Back to dashboard'
  const navigatePath = isShopper ? '/shop' : '/admin'

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl font-medium text-center mt-12 mb-4">
        {errorMessage}
      </h1>
      <button
        className="bg-gray-500 text-white p-4 w-auto whitespace-nowrap text-lg font-bold rounded-md transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 mt-4"
        onClick={() => goTo(navigatePath)}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default ErrorPage
