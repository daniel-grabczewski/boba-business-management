import { useQuery } from 'react-query'
import { getEmailsFromLocalStorage } from '../../../services/emails'
import LoadError from '../../../shopper/components/LoadError/LoadError'
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
import { Email } from '../../../../models/Emails'
import { getUserNameByUserId } from '../../../services/users'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate'

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
  const [search, setSearch] = useState<string>('')
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

  const handleChangeSearch = (search: string) => {
    localStorage.setItem('emailSearch', JSON.stringify(search))
    setSearch(search)
  }

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
    const searchInLocalStorage = localStorage.getItem('emailSearch')
    if (searchInLocalStorage) {
      setSearch(JSON.parse(searchInLocalStorage))
    }
  }, [])

  useEffect(() => {
    if (!location.search) {
      setPage(1)
      setSort('newest-first')
      setFilter('all')
      handleChangeSearch('')
      queryParams.delete('email')
    }
  }, [location.search])

  const searchedOrders = emails
    ? emails.filter(
        (email: Email) =>
          getUserNameByUserId(email.userId)
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          email.title.toLowerCase().includes(search.toLowerCase()) ||
          email.description.toLowerCase().includes(search.toLowerCase()) ||
          formatDateToDDMMYYYY(email.createdAt).includes(search.toLowerCase())
      )
    : []

  const filteredEmails = searchedOrders
    ? searchedOrders.filter((email) => {
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

  const handleSelectEmailId = (id: number) => {
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
      <EmailPopup emailId={selectedEmailId} closeEmailPopup={closeEmailPopup} />

      {!isLoading && emails && sortedEmails && (
        <div className="w-full mx-auto pt-4 px-4 sm:w-3/4 ">
          <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            Inbox
          </h1>

          {/* SortingControl */}
          <EmailsSortingControls
            search={search}
            handleChangeSearch={handleChangeSearch}
            filter={filter}
            handleChangeFilter={handleChangeFilter}
            sort={sort}
            handleChangeSort={handleChangeSort}
            page={page}
            handleChangePage={handleChangePage}
            totalPages={totalPages}
            sortedEmailsCount={sortedEmails.length}
          />

          <DisplayCurrentEmails
            getPaginatedEmails={getPaginatedEmails}
            handleSelectEmailId={handleSelectEmailId}
          />
        </div>
      )}
    </>
  )
}

export default Emails
