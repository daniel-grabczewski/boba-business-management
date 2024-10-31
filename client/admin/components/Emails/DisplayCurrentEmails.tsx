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
    <div className="bg-white mt-4 mb-8 border-l border-r border-t border-gray-300">
      {/* Table Header (Visible only on desktop) */}
      <div className="hidden sm:flex bg-gray-300 text-gray-700 uppercase text-sm leading-normal border-b border-gray-300">
        <div className="w-1/5 py-4 px-6 border-r border-gray-300">Username</div>
        <div className="w-1/5 py-4 px-6 border-r border-gray-300">Title</div>
        <div className="w-2/5 py-4 px-6 border-r border-gray-300">Subject</div>
        <div className="w-1/5 py-4 px-6">Date Received</div>
      </div>

      {/* Table Body */}
      <div className="text-gray-600 text-sm font-light">
        {getPaginatedEmails().map((email) => (
          <div
            key={email.id}
            onClick={() => handleSelectEmailId(email.id)}
            className={`border-b border-gray-300 ${
              email.isRead
                ? 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                : 'hover:bg-gray-50 cursor-pointer'
            } flex flex-col sm:flex-row relative`}
          >
            {/* Mobile View */}
            <div className="flex flex-col p-4 sm:hidden">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={email.isRead ? faEnvelopeOpen : faEnvelope}
                    className="text-xl mr-2"
                  />
                  <span
                    className={`truncate text-sm ${
                      email.isRead ? 'font-normal' : 'font-bold'
                    }`}
                  >
                    {getUserNameByUserId(email.userId)}
                  </span>
                </div>
                <div className="text-xs">
                  {formatRelativeDate(email.createdAt) === 'Today' ? (
                    <span
                      className={`${
                        email.isRead ? 'font-normal' : 'font-bold'
                      }`}
                    >
                      Today {format24HourTo12Hour(email.createdAt)}
                    </span>
                  ) : (
                    <span>
                      {formatDateToDDMMYYYY(email.createdAt)}{' '}
                      {format24HourTo12Hour(email.createdAt)}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`truncate text-sm mb-1 ${
                  email.isRead ? 'font-normal' : 'font-bold'
                }`}
              >
                {truncate(email.title, 40)}
              </div>
              {/* Description */}
              <div className="text-xs text-gray-500">
                {truncate(email.description, 45)}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex w-full sm:w-1/5 py-5 px-6 sm:border-r border-gray-300 items-center">
              <div className="mr-2">
                {email.isRead ? (
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="text-xl" />
                ) : (
                  <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                )}
              </div>
              <div className="truncate text-sm sm:text-base">
                {getUserNameByUserId(email.userId)}
              </div>
            </div>

            <div className="hidden sm:flex w-full sm:w-1/5 py-5 px-6 sm:border-r border-gray-300 items-center">
              <span className="truncate text-sm sm:text-base">
                {truncate(email.title, 40)}
              </span>
            </div>

            <div className="hidden sm:flex w-full sm:w-2/5 py-5 px-6 sm:border-r border-gray-300 items-center">
              <span className="truncate">
                {truncate(email.description, 45)}
              </span>
            </div>

            <div className="hidden sm:flex w-full sm:w-1/5 py-5 px-6 items-center">
              <div className="text-left">
                <div
                  className={
                    formatRelativeDate(email.createdAt) === 'Today'
                      ? email.isRead
                        ? 'font-normal'
                        : 'font-bold'
                      : ''
                  }
                >
                  {formatRelativeDate(email.createdAt) === 'Today'
                    ? `Today ${format24HourTo12Hour(email.createdAt)}`
                    : `${formatDateToDDMMYYYY(
                        email.createdAt
                      )} ${format24HourTo12Hour(email.createdAt)}`}
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
