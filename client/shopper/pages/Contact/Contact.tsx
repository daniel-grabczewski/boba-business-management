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
    <div className="mx-auto max-w-2xl p-4 flex flex-col my-8">
      <div className="text-4xl text-center font-bold mb-6">Contact Us</div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-lg font-semibold">
            Topic:
          </label>
          <input
            className={`mt-2 border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 ${
              showError && emptyFields.includes('title')
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-black'
            }`}
            type="text"
            name="title"
            onChange={handleChange}
            value={newEmail.title}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-semibold">
            Message:
          </label>
          <textarea
            className={`mt-2 border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 ${
              showError && emptyFields.includes('description')
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-black'
            }`}
            name="description"
            onChange={handleMessageChange}
            value={newEmail.description}
            placeholder="Type your message here"
            rows={6}
          />
        </div>
        <div className="flex flex-col items-center">
          <button
            className="bg-blue-500 text-white py-2 px-10 rounded-md w-full sm:w-auto text-lg font-semibold hover:bg-blue-700 transition duration-300"
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
          <div
            className={`bg-green-200 text-green-800 p-2 mb-4 rounded text-center w-full sm:w-1/2 transition-all duration-300 flex items-center justify-center ${
              alertMessage ? 'h-20' : 'h-20 opacity-0'
            }`}
          >
            {alertMessage}
          </div>
        </div>
      </form>
      <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
        <div className="w-full sm:w-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6497.876987938504!2d174.72966999140917!3d-35.4810655719159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0b47a4f8e4efc3%3A0xf00ef62249bfa20!2sAorangi%20Island!5e0!3m2!1sen!2snz!4v1724716819889!5m2!1sen!2snz"
            title="map"
            className="rounded-md w-full h-64 sm:h-80 lg:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="w-full sm:w-1/2">
          <h2 className="font-semibold text-2xl mb-2">Our Address</h2>
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
