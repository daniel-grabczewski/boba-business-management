import { useQuery } from 'react-query'
import LoadError from '../../components/LoadError/LoadError'
import { getLatestOrderOfDemoUser } from '../../../services/orders'
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
  const navigate = useNavigate()

  const { data: demoUserOrder, status: statusDemoUserOrder } = useQuery(
    ['getLatestOrderOfDemoUser'],
    async () => getLatestOrderOfDemoUser()
  )

  return (
    <>
      <LoadError status={statusDemoUserOrder} />
      <div className="mt-8 text-2xl text-center font-bold">
        <div>THANK YOU</div>
        {demoUserOrder && (
          <div>{`${demoUserOrder.firstName} ${demoUserOrder.lastName}`}</div>
        )}
        <div>FOR YOUR ORDER!</div>
      </div>

      {demoUserOrder && (
        <div className="mt-8 mb-8 ml-2 rounded-md px-3 py-2 text-center">
          ORDER NUMBER #{demoUserOrder.id}
        </div>
      )}

      <div className="mt-8 mb-8 ml-2 rounded-md px-3 py-2 text-center">
        <div className="text-xl">Your order will be shipped to</div>
        {demoUserOrder && (
          <div className="mb-8">
            <div>{demoUserOrder.address}</div>
            <div>{demoUserOrder.city}</div>
            <div>
              {demoUserOrder.country}, {demoUserOrder.zipCode}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="ml-2 mr-2 mt-8 rounded-md bg-black text-white p-4 text-2xl font-bold"
        >
          Back to home
        </button>
      </div>
    </>
  )
}

export default ThankYou
