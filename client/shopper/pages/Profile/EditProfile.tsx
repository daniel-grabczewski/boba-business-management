import { useEffect, useState } from 'react'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import {
  getDemoUserDetails,
  updateDemoUserDetails,
} from '../../../services/users'
import { UpdateUser } from '../../../../models/Users'
import LoadError from '../../components/LoadError/LoadError'
import {
  checkIfStringIsOnlyLetters,
  checkIfStringIsOnlyNumbers,
} from '../../../utils/checkInput'
import { baseURL } from '../../../../baseUrl'

const EditProfile = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { data: userData, status } = useQuery('getDemoUserDetails', async () =>
    getDemoUserDetails()
  )

  const initialFormData = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    phoneNumber: userData?.phoneNumber || '',
    address: userData?.address || '',
    city: userData?.city || '',
    country: userData?.country || '',
    zipCode: userData?.zipCode || '',
  }

  const [formData, setFormData] = useState(initialFormData)
  const [emptyFields, setEmptyFields] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        city: userData.city || '',
        country: userData.country || '',
        zipCode: userData.zipCode || '',
      })
    }
  }, [userData])

  const mutation = useMutation(
    async (formDataToUpdate: UpdateUser) => {
      return updateDemoUserDetails(formDataToUpdate)
    },
    {
      onMutate: (formDataToUpdate: UpdateUser) => {
        queryClient.setQueryData('user', formDataToUpdate)
        return formDataToUpdate
      },
      onSuccess: () => {
        queryClient.invalidateQueries('getDemoUserDetails')
        queryClient.invalidateQueries('getReviewsByProductId')
        queryClient.invalidateQueries('getReviewsOfDemoUser')
        navigate(`${baseURL}/profile`)
      },
    }
  )

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    validationType?: 'letters' | 'numbers'
  ) => {
    const { name, value } = event.target

    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))

    if (value !== '') {
      setEmptyFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    }

    let isValid = true
    if (validationType === 'letters') {
      isValid = checkIfStringIsOnlyLetters(value)
    } else if (validationType === 'numbers') {
      isValid = checkIfStringIsOnlyNumbers(value)
    }

    setInvalidFields((prevFields) => {
      if (isValid) {
        return prevFields.filter((field) => field !== name)
      } else {
        if (!prevFields.includes(name)) {
          return [...prevFields, name]
        }
        return prevFields
      }
    })
  }

  const checkValues = (obj: { [key: string]: string }) => {
    const emptyKeys = Object.keys(obj).filter((key) => obj[key] === '')
    setEmptyFields(emptyKeys)
    return emptyKeys.length === 0 && invalidFields.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkValues(formData)) {
      mutation.mutate(formData)
    } else {
      setShowError(true)
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-1/2 mx-auto p-4 bg-gray-100 rounded shadow-lg">
        <LoadError status={status} />
        <h2 className="text-2xl text-center mb-4 font-semibold">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex w-full gap-4 mb-4 ">
            <div className="w-full">
              <label htmlFor="firstName" className="block font-semibold mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleFieldChange(e, 'letters')}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 ${
                  emptyFields.includes('firstName') ? 'border-red-500' : ''
                } ${
                  invalidFields.includes('firstName')
                    ? 'border-red-500 text-red-500'
                    : ''
                }`}
              />
              <p
                className={`text-sm ${
                  invalidFields.includes('firstName')
                    ? 'text-red-500'
                    : 'invisible'
                }`}
              >
                Please enter a valid first name
              </p>
            </div>

            <div className="w-full">
              <label htmlFor="lastName" className="block font-semibold mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleFieldChange(e, 'letters')}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 ${
                  emptyFields.includes('lastName') ? 'border-red-500' : ''
                } ${
                  invalidFields.includes('lastName')
                    ? 'border-red-500 text-red-500'
                    : ''
                }`}
              />
              <p
                className={`text-sm ${
                  invalidFields.includes('lastName')
                    ? 'text-red-500'
                    : 'invisible'
                }`}
              >
                Please enter a valid last name
              </p>
            </div>
          </div>

          <div className=" w-full flex gap-4">
            <div className="w-full">
              <label htmlFor="phoneNumber" className="block font-semibold mb-1">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleFieldChange(e, 'numbers')}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 ${
                  emptyFields.includes('phoneNumber') ? 'border-red-500' : ''
                } ${
                  invalidFields.includes('phoneNumber')
                    ? 'border-red-500 text-red-500'
                    : ''
                }`}
              />
              <p
                className={`text-sm ${
                  invalidFields.includes('phoneNumber')
                    ? 'text-red-500'
                    : 'invisible'
                }`}
              >
                Please enter a valid phone number
              </p>
            </div>
            <div className="w-full"></div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label htmlFor="address" className="block font-semibold mb-1">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleFieldChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 ${
                  emptyFields.includes('address') ? 'border-red-500' : ''
                }`}
              />
              <p className="invisible text-sm">Placeholder</p>
            </div>

            <div className="w-full">
              <label htmlFor="city" className="block font-semibold mb-1">
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={(e) => handleFieldChange(e, 'letters')}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 ${
                  emptyFields.includes('city') ? 'border-red-500' : ''
                } ${
                  invalidFields.includes('city')
                    ? 'border-red-500 text-red-500'
                    : ''
                }`}
              />

              <p
                className={`text-sm ${
                  invalidFields.includes('city') ? 'text-red-500' : 'invisible'
                }`}
              >
                Please enter a valid city
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-8">
            <div className="w-full">
              <label htmlFor="country" className="block font-semibold mb-1">
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={(e) => handleFieldChange(e, 'letters')}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 ${
                  emptyFields.includes('country') ? 'border-red-500' : ''
                } ${
                  invalidFields.includes('country')
                    ? 'border-red-500 text-red-500'
                    : ''
                }`}
              />
              <p
                className={`text-sm ${
                  invalidFields.includes('country')
                    ? 'text-red-500'
                    : 'invisible'
                }`}
              >
                Please enter a valid country
              </p>
            </div>

            <div className="w-full">
              <label htmlFor="zipCode" className="block font-semibold mb-1">
                Zip Code:
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleFieldChange(e, 'numbers')}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 ${
                  emptyFields.includes('zipCode') ? 'border-red-500' : ''
                } ${
                  invalidFields.includes('zipCode')
                    ? 'border-red-500 text-red-500'
                    : ''
                }`}
              />
              <p
                className={`text-sm ${
                  invalidFields.includes('zipCode')
                    ? 'text-red-500'
                    : 'invisible'
                }`}
              >
                Please enter a valid zip code
              </p>
            </div>
          </div>

          <div className="items-center flex flex-col">
            <button
              type="submit"
              className={`w-1/6 py-2 px-4 text-white font-semibold rounded focus:outline-none focus:ring transition-all duration-300 ${
                mutation.isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              Submit
            </button>
            <p
              className={`text-sm ${
                showError && emptyFields.length > 0
                  ? 'text-red-500'
                  : 'invisible'
              }`}
            >
              Please fill all fields
            </p>
            <p
              className={`text-sm ${
                showError && invalidFields.length > 0
                  ? 'text-red-500'
                  : 'invisible'
              }`}
            >
              Please correct the invalid inputs
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
