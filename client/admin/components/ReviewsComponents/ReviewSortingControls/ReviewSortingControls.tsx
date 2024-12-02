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
    <div className="border p-2 rounded flex flex-col custom:flex-row justify-between items-center mb-4 bg-white sticky top-0 z-10">
      <div className="flex flex-col custom:flex-row items-start custom:items-center w-full custom:w-auto">
        {/* SEARCH */}
        <input
          className="border p-2 rounded mb-2 custom:mb-0 custom:mr-2 w-full custom:w-auto text-sm custom:text-base"
          type="text"
          placeholder="Search Review or User..."
          value={search}
          onChange={(e) => {
            handleChangeSearch(e.target.value)
            handleChangePage(1)
          }}
        />

        {/* FILTER */}
        <div className="flex flex-wrap items-center w-full custom:w-auto">
          <p className="mx-2 font-semibold whitespace-nowrap text-sm custom:text-base">
            Filter by:
          </p>
          <select
            className="border p-2 rounded w-full custom:w-auto text-sm custom:text-base"
            onChange={(e) => handleChangeFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All Reviews</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>

          {/* SORT */}
          <p className="mx-2 font-semibold whitespace-nowrap mt-2 custom:mt-0 text-sm custom:text-base">
            Sort by:
          </p>
          <select
            className="border p-2 rounded w-full custom:w-auto text-sm custom:text-base"
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
      <div className="flex justify-between items-center w-full custom:w-auto mt-2 custom:mt-0">
        <div className="flex flex-col justify-end mx-2 font-semibold w-full custom:w-auto text-sm custom:text-base">
          <p className="text-left custom:text-right">
            Showing {reviewsCount === 0 ? 0 : firstIndex + 1}-
            {Math.min(lastIndex, reviewsCount)} of {reviewsCount}
          </p>
        </div>
        <button
          className={`${
            page === 1
              ? 'bg-gray-300 cursor-default'
              : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded transition-all duration-300 text-sm custom:text-base`}
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
          } text-white font-bold py-2 px-4 rounded ml-2 transition-all duration-300 text-sm custom:text-base`}
          disabled={page === totalPages || reviewsCount === 0}
          onClick={() => handleChangePage(page + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default ReviewSortingControls
