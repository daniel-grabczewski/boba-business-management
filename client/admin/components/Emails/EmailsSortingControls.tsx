interface EmailSortingControlsProps {
  filter: string
  handleChangePage: (newPage : number) => void
  sort: string
  handleChangeSort: (newSort : string) => void
  page: number
  handleChangeFilter: (newFilter : string) => void
  totalPages: number
  sortedEmailsCount: number
}

const EmailsSortingControls: React.FC<EmailSortingControlsProps> = ({
  filter,
  handleChangeFilter,
  sort,
  handleChangeSort,
  page,
  handleChangePage,
  totalPages,
  sortedEmailsCount,
}) => {
  const lastIndex = page * 10
  const firstIndex = lastIndex - 10
  return (
    <div className="border p-2 rounded flex flex-row justify-between items-center">
      <div className="flex items-center">
        {/* FILTER */}
        <p className="mx-2 font-semibold">Filter by:</p>
        <select
          className="border p-2 rounded"
          onChange={(e) => handleChangeFilter(e.target.value)}
          value={filter}
        >
          <option value="all">All emails</option>
          <option value="unread">Unread emails</option>
        </select>

        {/* SORT */}
        <p className="mx-2 font-semibold">Sort by:</p>
        <select
          className="border p-2 rounded"
          onChange={(e) => handleChangeSort(e.target.value)}
          value={sort}
        >
          <option value="newest-first">Newest first</option>
          <option value="oldest-first">Oldest first</option>
        </select>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center mx-2 font-semibold">
          Showing {firstIndex + 1}-{Math.min(lastIndex, sortedEmailsCount)} of{' '}
          {sortedEmailsCount}
        </div>
        <div className="flex justify-center">
          <button
            className={`${
              page === 1
                ? 'bg-gray-300 cursor-default'
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded`}
            disabled={page === 1}
            onClick={() => handleChangePage(page - 1)}
          >
            {'<'}
          </button>
          <button
            className={`${
              page === totalPages
                ? 'bg-gray-300 cursor-default'
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded ml-2`}
            disabled={page === totalPages}
            onClick={() => handleChangePage(page + 1)}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailsSortingControls
