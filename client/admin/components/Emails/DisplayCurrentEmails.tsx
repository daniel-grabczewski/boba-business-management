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
    <div className="bg-white mt-4 mb-8">
      {/* Table Header (Visible only on desktop) */}
      <div className="hidden sm:flex bg-gray-200 text-gray-700 uppercase text-sm leading-normal border-b border-gray-300">
        <div className="w-1/5 py-4 px-6 border-r border-gray-200">Username</div>
        <div className="w-1/5 py-4 px-6 border-r border-gray-200">Title</div>
        <div className="w-2/5 py-4 px-6 border-r border-gray-200">Subject</div>
        <div className="w-1/5 py-4 px-6">Date Received</div>
      </div>

      {/* Table Body */}
      <div className="text-gray-600 text-sm font-light">
        {getPaginatedEmails().map((email) => (
          <div
            key={email.id}
            onClick={() => handleSelectEmailId(email.id)}
            className={`border-b border-gray-200 ${
              email.isRead
                ? 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                : 'hover:bg-gray-50 cursor-pointer'
            } flex flex-col sm:flex-row`}
          >
            {/* Username Column */}
            <div className="flex w-full sm:w-1/5 py-5 px-6 sm:border-r border-gray-200">
              <div className="mr-2">
                {email.isRead ? (
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="text-xl" />
                ) : (
                  <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                )}
              </div>
              <div className="truncate">
                {getUserNameByUserId(email.userId)}
              </div>
            </div>

            {/* Title Column */}
            <div className="flex w-full sm:w-1/5 py-5 px-6 sm:border-r border-gray-200">
              <span className="truncate">{truncate(email.title, 25)}</span>
            </div>

            {/* Subject Column */}
            <div className="flex w-full sm:w-2/5 py-5 px-6 sm:border-r border-gray-200">
              <span className="truncate">
                {truncate(email.description, 45)}
              </span>
            </div>

            {/* Date Column */}
            <div className="flex w-full sm:w-1/5 py-5 px-6">
              <div className="text-left">
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayCurrentEmails
