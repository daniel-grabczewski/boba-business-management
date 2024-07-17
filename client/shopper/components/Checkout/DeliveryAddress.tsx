import { User } from '../../../../models/Users'

interface PaymentInformationProps {
  handleUserDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  displayUserDetails: User
  handleNumberOnlyFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  fillDetailsWithDefaults: () => void
  emptyFields: string[]
  invalidFields: string[]
}

function DeliveryAddress({
  handleUserDetailsChange,
  displayUserDetails,
  fillDetailsWithDefaults,
  emptyFields,
  invalidFields,
  handleNumberOnlyFieldChange
}: PaymentInformationProps) {
  return (
    <>
      <div className="flex flex-row w-full justify-between ">
        <h1 className="text-2xl font-semibold mb-4">YOUR DETAILS</h1>
        <button
          type="button"
          className="px-3 text-sm bg-gray-500 text-white rounded-md transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
          onClick={fillDetailsWithDefaults}
        >
          Load defaults from profile
        </button>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-full mr-6 flex flex-col">
          <label htmlFor="phoneNumber" className="font-normal text-gray-600">
            Phone number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className={`rounded border p-2 w-full ${emptyFields.includes('phoneNumber') ? 'border-red-500' : ''} ${invalidFields.includes('phoneNumber') ? 'border-red-500 text-red-500' : ''}`}
            value={displayUserDetails.phoneNumber}
            onChange={handleNumberOnlyFieldChange}
          />
          <p className={`text-normal ${invalidFields.includes('phoneNumber') ? 'text-red-500' : 'text-gray-600'}`}>{`${invalidFields.includes('phoneNumber') ? `Please enter a valid phone number` : `e.g. 020 000 0000`}`}</p>
        </div>
        <div className="w-full mb-4"></div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-full mr-6">
          <label htmlFor="firstName" className="font-normal text-gray-600">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className={`rounded border p-2 w-full mr-6 ${emptyFields.includes('firstName') ? 'border-red-500' : ''}`}
            value={displayUserDetails.firstName}
            onChange={handleUserDetailsChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="lastName" className="font-normal text-gray-600">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={`rounded border p-2 w-full ${emptyFields.includes('lastName') ? 'border-red-500' : ''}`}
            value={displayUserDetails.lastName}
            onChange={handleUserDetailsChange}
          />
        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="w-full mr-6">
          <label htmlFor="address" className="font-normal text-gray-600">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className={`rounded border p-2 w-full ${emptyFields.includes('address') ? 'border-red-500' : ''}`}
            value={displayUserDetails.address}
            onChange={handleUserDetailsChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="city" className="font-normal text-gray-600">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className={`rounded border p-2 w-full ${emptyFields.includes('city') ? 'border-red-500' : ''}`}
            value={displayUserDetails.city}
            onChange={handleUserDetailsChange}
          />
        </div>
      </div>
      <div className="flex flex-row mb-8">
        <div className="w-full mr-6 flex flex-col">
          <label htmlFor="zipCode" className="font-normal text-gray-600">
            Zip code
          </label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            className={`rounded border p-2 w-full ${emptyFields.includes('zipCode') ? 'border-red-500' : ''} ${invalidFields.includes('zipCode') ? 'border-red-500 text-red-500' : ''}`}
            value={displayUserDetails.zipCode}
            onChange={handleNumberOnlyFieldChange}
          />
          <p className={`text-normal ${invalidFields.includes('zipCode') ? 'text-red-500' : 'text-gray-600'}`}>{`${invalidFields.includes('zipCode') ? `Please enter a valid zip code` : `e.g. 2345`}`}</p>
        </div>
        <div className="w-full">
          <label htmlFor="country" className="font-normal text-gray-600">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            className={`rounded border p-2 w-full ${emptyFields.includes('country') ? 'border-red-500' : ''}`}
            value={displayUserDetails.country}
            onChange={handleUserDetailsChange}
          />
        </div>
      </div>
    </>
  )
}

export default DeliveryAddress
