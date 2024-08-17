import { useQuery } from 'react-query'
import LoadError from '../../components/LoadError/LoadError'
import { getLatestOrderOfDemoUser } from '../../../services/orders'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ThankYou = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const orderCompleted = localStorage.getItem('orderCompleted')
    if (!orderCompleted) {
      navigate('/')
    } else {
      localStorage.removeItem('orderCompleted')
    }
  }, [navigate])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { data: demoUserOrder, status: statusDemoUserOrder } = useQuery(
    ['getLatestOrderOfDemoUser'],
    async () => getLatestOrderOfDemoUser()
  )

  return (
    <>
      <LoadError status={statusDemoUserOrder} />
      <div className="flex justify-center items-center h-full">
        <div style={{ paddingTop: '5vh' }}>
          <div className="text-center text-3xl">
            <img
              src="/images/thank-you.svg"
              alt="thank you"
              style={{ maxWidth: '250px', margin: 'auto' }}
            />
            <div>Thank you for being a Boba Buddy! 😊</div>
          </div>

          {demoUserOrder && (
            <div className="mt-2 mb-8 ml-2 rounded-md px-3 py-2 text-center text-xl">
              ORDER NUMBER #{demoUserOrder.id}
            </div>
          )}

          <div className="mt-8 mb-8 ml-2 rounded-md px-3 py-2 text-center text-xl">
            <div className="">Your order will be shipped to</div>
            {demoUserOrder && (
              <div className="mb-8 font-normal">
                <p>{demoUserOrder.address}</p>
                <p>{demoUserOrder.city}</p>
                <p>
                  {demoUserOrder.country}, {demoUserOrder.zipCode}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded transition-all duration-300"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThankYou
