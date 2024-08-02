import { useQuery } from 'react-query'
import {
  getEmailsFromLocalStorage,
} from '../../../services/emails'
import LoadError from '../../../shopper/components/LoadError/LoadError'
import EmailsColumnTitles from '../../components/Emails/EmailsColumnTitles'
import DisplayCurrentEmails from '../../components/Emails/DisplayCurrentEmails'
import { useEffect, useState } from 'react'
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
  const initialSelectedEmailId = parseInt(queryParams.get('email') || '0')

  const [page, setPage] = useState(initialPage)
  const [filter, setFilter] = useState(initialFilter)
  const [sort, setSort] = useState(initialSort)
  const [selectedEmailId, setSelectedEmailId] = useState(initialSelectedEmailId)

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

  useEffect(() => {
    if (!location.search) {
      setPage(1)
      setSort('newest-first')
      setFilter('all')
      queryParams.delete('email')
    }
  }, [location.search])

  const filteredEmails = emails
    ? emails.filter((email) => {
        if (filter === 'all') return true
        if (filter === 'unread') return !email.isRead
        return true
      })
    : []

  const sortedEmails = [...filteredEmails].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    switch (sort) {
      case 'newest-first':
        return dateB - dateA
      case 'oldest-first':
        return dateA - dateB
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedEmails.length / emailsPerPage)

  const getPaginatedEmails = () => {
    const start = (page - 1) * emailsPerPage
    const end = start + emailsPerPage
    return sortedEmails.slice(start, end)
  }

  const handleSelectEmailId = (id : number) => {
    setSelectedEmailId(id)
    queryParams.set('email', `${id}`)
    navigate(`?${queryParams.toString()}`, { replace: true })
  }

  const closeEmailPopup = () => {
    setSelectedEmailId(0)
    queryParams.delete('email')
    navigate(`?${queryParams.toString()}`, { replace: true })
    refetchGetEmailsFromLocalStorage()
  }
  return (
    <>
      <LoadError status={emailStatus} />
        <EmailPopup
          emailId={selectedEmailId}
          closeEmailPopup={closeEmailPopup}
        />

      {!isLoading && emails && sortedEmails && (
        <div className="flex justify-center overflow-x-auto">
          <div className="p-4 w-full lg:w-11/12">
            <h1 className="text-center text-4xl font-semibold mb-4">Inbox</h1>
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
                handleSelectEmailId={handleSelectEmailId}
                
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Emails
