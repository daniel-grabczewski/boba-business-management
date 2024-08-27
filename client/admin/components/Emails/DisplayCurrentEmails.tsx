import { Email } from '../../../../models/Emails'
import { getUserNameByUserId } from '../../../services/users'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
  formatRelativeDate,
} from '../../../utils/formatDate'
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { truncate } from '../../../utils/truncate'

interface DisplayCurrentEmailsProps {
  getPaginatedEmails: () => Email[]
  handleSelectEmailId: (emailId: number) => void
}

const DisplayCurrentEmails = ({
  getPaginatedEmails,
  handleSelectEmailId,
}: DisplayCurrentEmailsProps) => {
  return (
    <div className="divTable bg-white mt-4 border border-gray-300 mb-8">
      <div className="divRow bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <div className="divCell py-3 px-8">Username</div>
        <div className="divCell py-3 px-8">Title</div>
        <div className="divCell py-3 px-8">Subject</div>
        <div className="divCell py-3 px-8">Date Recieved</div>
      </div>

      <div className="divBody text-gray-600 text-sm font-light ">
        {getPaginatedEmails().map((email) => (
          <div
            key={email.id}
            onClick={() => handleSelectEmailId(email.id)}
            className={`divRow border-b border-gray-200 ${
              email.isRead
                ? 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                : 'hover:bg-gray-50 cursor-pointer'
            }`}
          >
            <div
              className="divCell py-3 px-8 text-left whitespace-nowrap"
              style={{ minWidth: '150px', maxWidth: '150px' }}
            >
              <div className="flex flex-row items-center ">
                <div className="mr-2">
                  {email.isRead ? (
                    <FontAwesomeIcon
                      icon={faEnvelopeOpen}
                      className="text-xl align-middle "
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-xl align-middle "
                    />
                  )}
                </div>
                <div>{getUserNameByUserId(email.userId)}</div>
              </div>
            </div>

            <div
              className="divCell py-3 px-8 text-left"
              style={{ minWidth: '250px' }}
            >
              {truncate(email.title, 25)}
            </div>
            <div
              className="divCell py-3 px-8 text-left"
              style={{ minWidth: '200px' }}
            >
              {truncate(email.description, 45)}
            </div>
            <div
              className="divCell py-3 px-8 text-left"
              style={{ minWidth: '200px' }}
            >
              <div
                className={
                  formatRelativeDate(email.createdAt) === 'Today'
                    ? 'font-semibold'
                    : ''
                }
              >
                {formatRelativeDate(email.createdAt) === 'Today'
                  ? formatRelativeDate(email.createdAt)
                  : formatDateToDDMMYYYY(email.createdAt)}{' '}
                {format24HourTo12Hour(email.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayCurrentEmails
