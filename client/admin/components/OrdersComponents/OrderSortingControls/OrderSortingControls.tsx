interface OrderSortingControlsProps {
  search: string
  handleChangeSearch: (search: string) => void
  sort: string
  handleChangeSort: (newSort: string) => void
  page: number
  totalPages: number
  handleChangePage: (newPage: number) => void
  ordersCount: number
}

function OrderSortingControls({
  search,
  handleChangeSearch,
  sort,
  handleChangeSort,
  page,
  totalPages,
  handleChangePage,
  ordersCount,
}: OrderSortingControlsProps) {
  const lastIndex = page * 10
  const firstIndex = lastIndex - 10

  return (
    <div className="border p-2 rounded flex flex-col sm:flex-row justify-between items-center mb-4 bg-white sticky top-0 z-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
        {/* SEARCH */}
        <input
          className="border p-2 rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
          type="text"
          placeholder="Search Order Number..."
          value={search}
          onChange={(e) => {
            handleChangeSearch(e.target.value)
            handleChangePage(1)
          }}
        />

        {/* SORT */}
        <div className="flex flex-wrap items-center w-full sm:w-auto">
          <p className="mx-2 font-semibold whitespace-nowrap">Sort by:</p>
          <select
            className="border p-2 rounded w-full sm:w-auto"
            onChange={(e) => handleChangeSort(e.target.value)}
            value={sort}
          >
            <option value="newest-first">Newest first</option>
            <option value="oldest-first">Oldest first</option>
            <option value="sale-high-to-low">Total Sale (High to Low)</option>
            <option value="sale-low-to-high">Total Sale (Low to High)</option>
          </select>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center w-full sm:w-auto mt-2 sm:mt-0">
        <div className="flex flex-col justify-end mx-2 font-semibold w-full sm:w-auto">
          <p className="text-left sm:text-right">
            Showing {ordersCount === 0 ? 0 : firstIndex + 1}-
            {Math.min(lastIndex, ordersCount)} of {ordersCount}
          </p>
        </div>
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
            page === totalPages || ordersCount === 0
              ? 'bg-gray-300 cursor-default'
              : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded ml-2 transition-all duration-300`}
          disabled={page === totalPages || ordersCount === 0}
          onClick={() => handleChangePage(page + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default OrderSortingControls
