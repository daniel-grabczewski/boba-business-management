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
import { useNavigate } from 'react-router-dom'
import {
  changeFilter,
  changePage,
  changeSort,
} from '../../../utils/queryHelpers'

const Emails = () => {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const initialPage = parseInt(queryParams.get('page') || '1')

  const initialFilter = queryParams.get('filter') || 'all'
  const initialSort = queryParams.get('sort') || 'newest-first'

  const [page, setPage] = useState(initialPage)
  const [filter, setFilter] = useState(initialFilter)
  const [sort, setSort] = useState(initialSort)
  const [selectedEmail, setSelectedEmail] = useState<Email | undefined>(
    undefined
  )

  console.log(initialPage)

  const emailsPerPage = 10

  const {
    data: emails,
    status: emailStatus,
    isLoading,
    refetch: refetchGetEmailsFromLocalStorage,
  } = useQuery(['getEmailsFromLocalStorage'], async () =>
    getEmailsFromLocalStorage()
  )

  const handleChangePage = (newPage: number) => {
    changePage(newPage, setPage, navigate, location.search)
  }

  const handleChangeFilter = (newFilter: string) => {
    changeFilter(newFilter, setFilter, setPage, navigate, location.search)
  }

  const handleChangeSort = (newSort: string) => {
    changeSort(newSort, setSort, setPage, navigate, location.search)
  }

  const setSelectedEmailById = async (id: number) => {
    const email = getEmailById(id)
    setSelectedEmail(email)
  }

  useEffect(() => {
    if (!location.search) {
      setPage(1)
      setSort('newest-first')
      setFilter('all')
    }
  }, [location.search])

  const filteredEmails = emails 
    ? emails.filter((email) => {
      if (filter === 'all') return true
      if (filter === 'unread') return !email.isRead
      return true
    }) : []

    const sortedEmails = [...filteredEmails]
    .sort((a, b) => {
      switch (sort) {
        case 'newest-first':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case 'oldest-first':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        default:
          return 0
      }
    })

    const totalPages = Math.ceil(
      (sortedEmails.length) / emailsPerPage
    )
    

  const getPaginatedEmails = () => {
    const start = (page - 1) * emailsPerPage
    const end = start + emailsPerPage
    return sortedEmails.slice(start, end)
  }


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

      {!isLoading && emails && sortedEmails && (
        <div className="flex justify-center overflow-x-auto">
          <div className="p-4 w-full lg:w-11/12">
            <h1 className="text-center text-4xl font-semibold mb-4">
              Inbox
            </h1>
            {/* SortingControl */}
            <EmailsSortingControls
              filter={filter}
              handleChangeFilter={handleChangeFilter}
              sort={sort}
              handleChangeSort={handleChangeSort}
              page={page}
              handleChangePage={handleChangePage}
              totalPages={totalPages}
              sortedEmailsCount={sortedEmails.length}
            />
            <div className="w-full bg-white mt-4 border border-gray-300">
              <EmailsColumnTitles />
              <DisplayCurrentEmails
                getPaginatedEmails={getPaginatedEmails}
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
