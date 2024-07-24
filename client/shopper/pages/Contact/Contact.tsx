import { FormEvent, useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { NewEmail } from '../../../../models/Emails'
import { sendEmailFromDemoUser } from '../../../services/emails'

function Contact() {
  const mutations = useMutation(async (newEmail: NewEmail) =>
    sendEmailFromDemoUser(newEmail)
  )

  const [newEmail, setNewEmail] = useState({
    title: '',
    description: '',
  } as NewEmail)
  const [alertMessage, setAlertMessage] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setNewEmail((prevEmail) => ({ ...prevEmail, [name]: value }))
  }

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target

    setNewEmail((prevEmail) => ({ ...prevEmail, [name]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!newEmail.title || !newEmail.description) {
      alert('Please fill out empty fields!')
      return
    }

    try {
      mutations.mutate(newEmail)
      setNewEmail({ title: '', description: '' })
      setAlertMessage('Message sent successfully!')
    } catch (error) {
      setAlertMessage('An error occurred. Please try again.')
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
      {alertMessage && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
          {alertMessage}
        </div>
      )}
      <form className="space-y-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold">
            Topic:
          </label>
          <input
            className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
            type="text"
            name="title"
            onChange={handleChange}
            value={newEmail.title}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold">
            Message:
          </label>
          <textarea
            className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
            style={{ height: '150px', maxHeight: '300px', minHeight: '150px' }}
            name="description"
            onChange={handleMessageChange}
            value={newEmail.description}
            placeholder="Type your message here"
            rows={6}
            required
          />
        </div>
        <div className="w-1/4 mx-auto">
          <button
            className="bg-black text-white py-2 px-4 rounded-md w-full text-lg font-semibold hover:bg-gray-800 hover:text-gray-100 transition-all duration-300"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Contact
