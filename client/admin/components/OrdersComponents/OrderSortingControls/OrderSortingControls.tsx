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
    <div className="border p-2 rounded flex justify-between items-center">
      <div className="flex items-center">
        {/* SEARCH */}
        <input
          className="border p-2 rounded mr-2"
          type="text"
          placeholder="Search Order Number..."
          value={search}
          onChange={(e) => {
            handleChangeSearch(e.target.value)
            handleChangePage(1)
          }}
        />

        {/* SORT */}
        <p className="mx-2 font-semibold">Sort by:</p>
        <select
          className="border p-2 rounded"
          onChange={(e) => handleChangeSort(e.target.value)}
          value={sort}
        >
          <option value="newest-first">Newest first</option>
          <option value="oldest-first">Oldest first</option>
          <option value="sale-high-to-low">{'Total Sale (High to Low)'}</option>
          <option value="sale-low-to-high">{'Total Sale (Low to High)'}</option>
        </select>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center mx-2 font-semibold">
          Showing {firstIndex + 1}-{Math.min(lastIndex, ordersCount)} of{' '}
          {ordersCount}
        </div>
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
              : 'bg-blue-500 hover.bg-blue-700'
          } text-white font-bold py-2 px-4 rounded ml-2`}
          disabled={page === totalPages}
          onClick={() => handleChangePage(page + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default OrderSortingControls
