import { useQuery } from 'react-query'
import {
  getEmailsFromLocalStorage,
  getEmailById,
} from '../../../services/emails'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import EmailsColumnTitles from '../../components/Emails/EmailsColumnTitles'
import DisplayCurrentEmails from '../../components/Emails/DisplayCurrentEmails'
import { useEffect, useState } from 'react'
import { Email } from '../../../../models/Emails'
import EmailsSortingControls from '../../components/Emails/EmailsSortingControls'
import EmailPopup from '../../components/Emails/EmailPopup'

const Emails = () => {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('Newest first')
  const [selectedEmail, setSelectedEmail] = useState<Email | undefined>(
    undefined
  )

  const [currentPage, setCurrentPage] = useState(1)
  // the 10 just for testing if the filter work or not
  const emailsPerPage = 10

  const {
    data: emails,
    status: emailStatus,
    isLoading,
    refetch: refetchGetEmailsFromLocalStorage,
  } = useQuery(['getEmailsFromLocalStorage'], async () =>
    getEmailsFromLocalStorage()
  )

  const setSelectedEmailById = async (id: number) => {
    const email = getEmailById(id)
    setSelectedEmail(email)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, sort, selectedEmail])

  const filteredAndSortedEmails = emails
    ?.filter((email) => {
      if (filter === 'all') return true
      if (filter === 'unread') return !email.isRead
      return true
    })
    .sort((a, b) => {
      switch (sort) {
        case 'Newest first':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case 'Oldest first':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        default:
          return 0
      }
    })

  const lastIndex = currentPage * emailsPerPage
  const firstIndex = lastIndex - emailsPerPage
  const currentEmails = filteredAndSortedEmails?.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(
    (filteredAndSortedEmails?.length ?? 0) / emailsPerPage
  )

  const closeEmailPopup = () => {
    setSelectedEmail(undefined)
    refetchGetEmailsFromLocalStorage()
  }
  return (
    <>
      <LoadError status={emailStatus} />
      {selectedEmail && (
        <EmailPopup
          emailId={selectedEmail.id}
          closeEmailPopup={closeEmailPopup}
        />
      )}

      {!isLoading && emails && currentEmails && filteredAndSortedEmails && (
        <div className="flex justify-center overflow-x-auto">
          <div className="p-4 w-full lg:w-11/12">
            {/* SortingControl */}
            <EmailsSortingControls
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalEmails={filteredAndSortedEmails.length}
            />
            <div className="w-full bg-white mt-4 border border-gray-300">
              <EmailsColumnTitles />
              <DisplayCurrentEmails
                currentEmails={currentEmails}
                setSelectedEmailById={setSelectedEmailById}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Emails
