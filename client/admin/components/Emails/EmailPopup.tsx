import { useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  deleteEmailById,
  getEmailById,
  updateEmailReadStatusById,
} from '../../../services/emails'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../utils/formatDate'
import { getUserNameByUserId } from '../../../services/users'

interface EmailPopupProps {
  emailId: number
  closeEmailPopup: () => void
}

const EmailPopup = ({ emailId, closeEmailPopup }: EmailPopupProps) => {
  const queryClient = useQueryClient()
  const popupRef = useRef<HTMLDivElement>(null)

  const { data: email, status } = useQuery(
    ['getEmailById', emailId],
    async () => getEmailById(emailId),
    {}
  )

  const updateEmailStatusMutation = useMutation(
    async (data: { emailId: number; isRead: boolean }) => {
      return updateEmailReadStatusById(data.emailId, data.isRead)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getEmailById')
        queryClient.invalidateQueries('getEmailsFromLocalStorage')
      },
    }
  )

  const deleteEmailMutation = useMutation(
    async (emailId: number) => {
      return deleteEmailById(emailId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getEmailById')
        queryClient.invalidateQueries('getEmailsFromLocalStorage')
      },
    }
  )

  const updateEmailStatus = async (emailId: number, isRead: boolean) => {
    updateEmailStatusMutation.mutate({ emailId, isRead })
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        if (email && !email.isRead) {
          updateEmailStatus(email.id, true)
        }
        closeEmailPopup()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [email, closeEmailPopup])

  return (
    <>
      <LoadError status={status} />
      {status === 'success' && email && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => {
            if (!email.isRead) {
              updateEmailStatus(email.id, true)
            }
          }}
        >
          <div
            ref={popupRef}
            className="bg-white p-5 rounded-lg flex flex-col gap-8 w-4/5 max-w-lg p-8"
          >
            <div>
              <div className=" flex flex-row justify-between">
                <button
                  onClick={closeEmailPopup}
                  className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 mb-5"
                >
                  Back to inbox
                </button>
                <button
                  onClick={() => deleteEmailMutation.mutate(emailId)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700 mb-5"
                >
                  Delete
                </button>
              </div>
              <div className="flex justify-between text-lg">
                <div>
                  <h2 className="font-bold">{email.title}</h2>
                  <p className="text-md">
                    From {getUserNameByUserId(email.userId)}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p>{formatDateToDDMMYYYY(email.createdAt)}</p>
                  <div>
                    <p>{format24HourTo12Hour(email.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-2">Description:</h2>
              <p>{email.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EmailPopup
