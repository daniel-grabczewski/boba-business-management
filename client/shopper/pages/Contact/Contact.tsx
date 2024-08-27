import { FormEvent, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { NewEmail } from '../../../../models/Emails'
import { sendEmailFromDemoUser } from '../../../services/emails'

function Contact() {
  const mutations = useMutation(async (newEmail: NewEmail) =>
    sendEmailFromDemoUser(newEmail)
  )
  const [alertMessage, setAlertMessage] = useState('')

  const [newEmail, setNewEmail] = useState({
    title: '',
    description: '',
  } as NewEmail)
  const [showError, setShowError] = useState(false)
  const [emptyFields, setEmptyFields] = useState<string[]>([])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setNewEmail((prevEmail) => ({ ...prevEmail, [name]: value }))

    if (value) {
      setEmptyFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    }
  }

  useEffect(() => {
    if (newEmail.description !== '' && newEmail.title !== '') {
      setShowError(false)
    }
  }, [newEmail])

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target

    setNewEmail((prevEmail) => ({ ...prevEmail, [name]: value }))

    if (value) {
      setEmptyFields((prevFields) =>
        prevFields.filter((field) => field !== name)
      )
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const emptyKeys = Object.keys(newEmail).filter(
      (key) => !newEmail[key as keyof NewEmail]
    )
    if (emptyKeys.length > 0) {
      setEmptyFields(emptyKeys)
      setShowError(true)
      return
    }

    try {
      mutations.mutate(newEmail)
      setNewEmail({ title: '', description: '' })
      setAlertMessage('Message sent successfully!')

      setShowError(false)
      setEmptyFields([])
    } catch (error) {
      setAlertMessage('An error occurred. Please try again.')
      setShowError(true)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [alertMessage])

  return (
    <div
      className="mx-auto max-w-2xl p-8 flex flex-col"
      style={{ marginTop: '35px' }}
    >
      <div className="text-3xl text-center font-bold mb-6">Contact Us</div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">
            Topic:
          </label>
          <input
            className={`mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full ${
              showError && emptyFields.includes('title') ? 'border-red-500' : ''
            }`}
            type="text"
            name="title"
            onChange={handleChange}
            value={newEmail.title}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold">
            Message:
          </label>
          <textarea
            className={`mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full ${
              showError && emptyFields.includes('description')
                ? 'border-red-500'
                : ''
            }`}
            style={{ height: '150px', maxHeight: '300px', minHeight: '150px' }}
            name="description"
            onChange={handleMessageChange}
            value={newEmail.description}
            placeholder="Type your message here"
            rows={6}
          />
        </div>
        <div className="mx-auto flex flex-col items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full text-lg font-semibold hover:bg-blue-700 hover:text-gray-100 transition-all duration-300"
            style={{ maxWidth: '125px' }}
            type="submit"
          >
            Submit
          </button>
          <p
            className={`text-red-500 mt-2 ${
              showError ? 'visible' : 'invisible'
            }`}
          >
            Please fill out all fields
          </p>
          {alertMessage && (
            <div className="bg-green-200 text-green-800 p-2 mb-4 rounded text-center w-1/2">
              {alertMessage}
            </div>
          )}
        </div>
      </form>
      <div
        className="mt-8 mx-auto mb-8 mx-auto flex gap-4"
        style={{ width: '700px' }}
      >
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6497.876987938504!2d174.72966999140917!3d-35.4810655719159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0b47a4f8e4efc3%3A0xf00ef62249bfa20!2sAorangi%20Island!5e0!3m2!1sen!2snz!4v1724716819889!5m2!1sen!2snz"
            title="map"
            height="400"
            width="400px"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="w-1/2">
          <h2 className="font-semibold text-2xl">Our Address</h2>
          <p>42 Boba Street, Aorangi Island,</p>
          <p>New Zealand</p>
          <p className="font-semibold mt-2">Inquiries@boba.com</p>
          <p className="font-semibold mt-2">Barry Bobus VI</p>
          <p className="font-semibold">021 123 4567</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
