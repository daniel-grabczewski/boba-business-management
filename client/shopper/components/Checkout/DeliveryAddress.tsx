import { User } from '../../../../models/Users'

interface PaymentInformationProps {
  handleUserDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  userDetails: User
}

function DeliveryAddress({
  handleUserDetailsChange,
  userDetails,
}: PaymentInformationProps) {
  //! BUTTON THAT ALLOWS USER TO CLICK TO LOAD DEFAULTS FROM PROFILE? The button becomes clickable when the user details are modified. So the user can click on it anytime to fill it in with default values.

  //! FORM FIELDS SHOULD HAVE LABELS, SO THE USER CAN SEE WHAT FIELD THAT HAVE TYPED IN. Right now, after typing it in, you don't see what the field is.

  //! Make label inside of the border? LIke on kmart checkout? Somehow?
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">YOUR DETAILS</h1>
      <div className="flex flex-row mb-4">
        <div className="w-full mr-6">
          <label htmlFor="phoneNumber" className="font-normal text-gray-600">
            Phone number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="border p-2 w-full"
            //value={userDetails.phoneNumber}
            onChange={handleUserDetailsChange}
          />
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
            className="border p-2 w-full mr-6"
            //value={userDetails.firstName}
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
            className="border p-2 w-full"
            //value={userDetails.lastName}
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
          className="border p-2 w-full"
          //value={userDetails.address}
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
          className="border p-2 w-full"
          //value={userDetails.city}
          onChange={handleUserDetailsChange}
        />
      </div>
    </div>
    <div className="flex flex-row mb-8">
      <div className="w-full mr-6">
        <label htmlFor="zipCode" className="font-normal text-gray-600">
          Zip code
        </label>
        <input
          type="text"
          name="zipCode"
          id="zipCode"
          className="border p-2 w-full"
          //value={userDetails.zipCode}
          onChange={handleUserDetailsChange}
        />
      </div>
      <div className="w-full">
        <label htmlFor="country" className="font-normal text-gray-600">
          Country
        </label>
        <input
          type="text"
          name="country"
          id="country"
          className="border p-2 w-full"
          //value={userDetails.country}
          onChange={handleUserDetailsChange}
        />
      </div>
    </div>
    </>
  )
}

export default DeliveryAddress
