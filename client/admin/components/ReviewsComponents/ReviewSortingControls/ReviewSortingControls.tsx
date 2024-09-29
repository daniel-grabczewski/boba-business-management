interface ReviewSortingControlsProps {
  search: string
  handleChangeSearch: (newSearch: string) => void
  filter: string
  handleChangeFilter: (newFilter: string) => void
  sort: string
  handleChangeSort: (newSort: string) => void
  page: number
  handleChangePage: (newPage: number) => void
  totalPages: number
  reviewsCount: number
}

const ReviewSortingControls: React.FC<ReviewSortingControlsProps> = ({
  search,
  handleChangeSearch,
  filter,
  handleChangeFilter,
  sort,
  handleChangeSort,
  page,
  handleChangePage,
  totalPages,
  reviewsCount,
}) => {
  const lastIndex = page * 10
  const firstIndex = lastIndex - 10

  return (
    <div className="border p-2 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 bg-white">
      {/* SEARCH & FILTERS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
        {/* SEARCH */}
        <input
          className="border p-2 rounded w-full sm:w-auto"
          type="text"
          placeholder="Search Product or User..."
          value={search}
          onChange={(e) => {
            handleChangeSearch(e.target.value)
            handleChangePage(1)
          }}
        />

        {/* FILTER */}
        <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
          <p className="font-semibold">Filter by:</p>
          <select
            className="border p-2 rounded w-full sm:w-auto"
            onChange={(e) => handleChangeFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        {/* SORT */}
        <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
          <p className="font-semibold">Sort by:</p>
          <select
            className="border p-2 rounded w-full sm:w-auto"
            onChange={(e) => handleChangeSort(e.target.value)}
            value={sort}
          >
            <option value="newest-first">Newest first</option>
            <option value="oldest-first">Oldest first</option>
            <option value="rating-high-to-low">
              User Rating (High to Low)
            </option>
            <option value="rating-low-to-high">
              User Rating (Low to High)
            </option>
          </select>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-auto">
        <div className="flex flex-col justify-center mx-2 font-semibold w-full sm:w-auto text-center sm:text-left">
          Showing {reviewsCount === 0 ? 0 : firstIndex + 1}-
          {Math.min(lastIndex, reviewsCount)} of {reviewsCount}
        </div>
        <div className="flex justify-center mt-2 sm:mt-0">
          <button
            className={`${
              page === 1
                ? 'bg-gray-300 cursor-default'
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded transition-all duration-300`}
            disabled={page === 1}
            onClick={() => handleChangePage(page - 1)}
          >
            {'<'}
          </button>
          <button
            className={`${
              page === totalPages || reviewsCount === 0
                ? 'bg-gray-300 cursor-default'
                : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded ml-2 transition-all duration-300`}
            disabled={page === totalPages || reviewsCount === 0}
            onClick={() => handleChangePage(page + 1)}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewSortingControls
