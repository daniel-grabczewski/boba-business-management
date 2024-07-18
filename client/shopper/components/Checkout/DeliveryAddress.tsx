import { User } from '../../../../models/Users'

interface PaymentInformationProps {
  handleUserDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  displayUserDetails: User
  userDetails: User
  handleNumberOnlyFieldChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  handleLetterOnlyFieldChange : (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  fillDetailsWithDefaults: () => void
  emptyFields: string[]
  invalidFields: string[]
  handlePreviewMouseEnter: () => void
  handlePreviewMouseLeave: () => void
  previewDefaultDetailsColor: string
}

function DeliveryAddress({
  handleUserDetailsChange,
  displayUserDetails,
  userDetails,
  fillDetailsWithDefaults,
  emptyFields,
  invalidFields,
  handleNumberOnlyFieldChange,
  handlePreviewMouseEnter,
  handlePreviewMouseLeave,
  previewDefaultDetailsColor,
  handleLetterOnlyFieldChange
}: PaymentInformationProps) {
  const getFieldClass = (fieldName: keyof User) => {
    return userDetails[fieldName] !== displayUserDetails[fieldName]
      ? previewDefaultDetailsColor
      : ''
  }

  return (
    <>
      <div className="flex flex-row w-full justify-between ">
        <h1 className="text-2xl font-semibold mb-4">YOUR DETAILS</h1>
        <button
          type="button"
          className="px-3 text-sm bg-gray-500 text-white rounded-md transition-colors hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
          onClick={fillDetailsWithDefaults}
          onMouseEnter={handlePreviewMouseEnter}
          onMouseLeave={handlePreviewMouseLeave}
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
            className={`${getFieldClass(
              'phoneNumber'
            )} rounded border p-2 w-full ${
              emptyFields.includes('phoneNumber') ? 'border-red-500' : ''
            } ${
              invalidFields.includes('phoneNumber')
                ? 'border-red-500 text-red-500'
                : ''
            }`}
            value={displayUserDetails.phoneNumber}
            onChange={handleNumberOnlyFieldChange}
          />
          <p
            className={`text-normal ${
              invalidFields.includes('phoneNumber')
                ? 'text-red-500'
                : 'text-gray-600'
            }`}
          >{`${
            invalidFields.includes('phoneNumber')
              ? `Please enter a valid phone number`
              : `e.g. 020 000 0000`
          }`}</p>
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
            className={`${getFieldClass(
              'firstName'
            )} rounded border p-2 w-full mr-6 ${
              emptyFields.includes('firstName')|| invalidFields.includes('firstName') ? 'border-red-500' : ''
            }`}
            value={displayUserDetails.firstName}
            onChange={handleLetterOnlyFieldChange}
          />
          <p
            className={`text-normal ${
              invalidFields.includes('firstName')
                ? 'text-red-500'
                : 'text-gray-600'
            }`}
            style={{
              visibility: invalidFields.includes('firstName')
                ? 'visible'
                : 'hidden',
            }}
          >
            {`Please enter a valid first name`}
          </p>
        </div>
        <div className="w-full">
          <label htmlFor="lastName" className="font-normal text-gray-600">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={`${getFieldClass(
              'lastName'
            )} rounded border p-2 w-full ${
              emptyFields.includes('lastName') || invalidFields.includes('lastName')? 'border-red-500' : ''
            }`}
            value={displayUserDetails.lastName}
            onChange={handleLetterOnlyFieldChange}
          />
          <p
            className={`text-normal ${
              invalidFields.includes('lastName')
                ? 'text-red-500'
                : 'text-gray-600'
            }`}
            style={{
              visibility: invalidFields.includes('lastName')
                ? 'visible'
                : 'hidden',
            }}
          >
            {`Please enter a valid last name`}
          </p>
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
            className={`${getFieldClass('address')} rounded border p-2 w-full ${
              emptyFields.includes('address') ? 'border-red-500' : ''
            }`}
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
            className={`${getFieldClass('city')} rounded border p-2 w-full ${
              emptyFields.includes('city') || 
              invalidFields.includes('city') ? 'border-red-500' : ''
            }`}
            value={displayUserDetails.city}
            onChange={handleLetterOnlyFieldChange}
          />
          <p
            className={`text-normal ${
              invalidFields.includes('city') 
                ? 'text-red-500'
                : 'text-gray-600'
            }`}
            style={{
              visibility: invalidFields.includes('city')
                ? 'visible'
                : 'hidden',
            }}
          >
            {`Please enter a valid city`}
          </p>
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
            className={`${getFieldClass('zipCode')} rounded border p-2 w-full ${
              emptyFields.includes('zipCode') ? 'border-red-500' : ''
            } ${
              invalidFields.includes('zipCode')
                ? 'border-red-500 text-red-500'
                : ''
            }`}
            value={displayUserDetails.zipCode}
            onChange={handleNumberOnlyFieldChange}
          />
          <p
            className={`text-normal ${
              invalidFields.includes('zipCode')
                ? 'text-red-500'
                : 'text-gray-600'
            }`}
          >{`${
            invalidFields.includes('zipCode')
              ? `Please enter a valid zip code`
              : `e.g. 2345`
          }`}</p>
        </div>
        <div className="w-full">
          <label htmlFor="country" className="font-normal text-gray-600">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            className={`${getFieldClass('country')} rounded border p-2 w-full ${
              emptyFields.includes('country') || invalidFields.includes('country') ? 'border-red-500' : ''
            }`}
            value={displayUserDetails.country}
            onChange={handleLetterOnlyFieldChange}
          />
          <p
            className={`text-normal ${
              invalidFields.includes('country')
                ? 'text-red-500'
                : 'text-gray-600'
            }`}
            style={{
              visibility: invalidFields.includes('country')
                ? 'visible'
                : 'hidden',
            }}
          >
            {`Please enter a valid country`}
          </p>
        </div>
      </div>
    </>
  )
}

export default DeliveryAddress
