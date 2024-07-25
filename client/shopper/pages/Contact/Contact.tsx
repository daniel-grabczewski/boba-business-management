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
      setEmptyFields((prevFields) => prevFields.filter((field) => field !== name))
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
      setEmptyFields((prevFields) => prevFields.filter((field) => field !== name))
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const emptyKeys = Object.keys(newEmail).filter((key) => !newEmail[key as keyof NewEmail])
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
    <div className="mx-auto max-w-2xl p-8 flex flex-col">
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
              showError && emptyFields.includes('description') ? 'border-red-500' : ''
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
            className="bg-black text-white py-2 px-4 rounded-md w-full text-lg font-semibold hover:bg-gray-800 hover:text-gray-100 transition-all duration-300"
            style={{maxWidth:'125px'}}
            type="submit"
          >
            Submit
          </button>
          <p className={`text-red-500 mt-2 ${showError ? 'visible' : 'invisible'}`}>
            Please fill out all fields
          </p>
          {alertMessage && (
      <div className="bg-green-200 text-green-800 p-2 mb-4 rounded text-center w-1/2">
          {alertMessage}
        </div>
  )}
        </div>
        
      </form>
    </div>
  )
}

export default Contact
