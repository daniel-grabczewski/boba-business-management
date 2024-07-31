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
  const lastIndex = page * 20
  const firstIndex = lastIndex - 20

  return (
    <>
      {/* SEARCH */}
      <div className="border p-2 rounded flex justify-between items-center">
        <div className="flex items-center">
          <input
            className="border p-2 rounded mr-2"
            type="text"
            placeholder="Search product or user"
            value={search}
            onChange={(e) => {
              handleChangeSearch(e.target.value)
              handleChangePage(1)
            }}
          />

          {/* FILTER */}
          <p className="mx-2 font-semibold">Filter by:</p>
          <select
            className="border p-2 rounded"
            onChange={(e) => handleChangeFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
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
            <option value="rating-high-to-low">
              User Rating (High to Low)
            </option>
            <option value="rating-low-to-high">
              User Rating (Low to High)
            </option>
          </select>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center mx-2 font-semibold">
            Showing {reviewsCount === 0 ? 0 : firstIndex + 1}-{Math.min(lastIndex, reviewsCount)} of{' '}
            {reviewsCount}
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
                page === totalPages || reviewsCount === 0
                  ? 'bg-gray-300 cursor-default'
                  : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded ml-2`}
              disabled={page === totalPages || reviewsCount === 0}
              onClick={() => handleChangePage(page + 1)}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewSortingControls
