interface OrderSortingControlsProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  sort: string
  setSort: React.Dispatch<React.SetStateAction<string>>
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalRows: number
}

function OrderSortingControls({
  search,
  setSearch,
  sort,
  setSort,
  page,
  totalPages,
  setPage,
  totalRows,
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
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SORT */}
        <p className="mx-2 font-semibold">Sort by:</p>
        <select
          className="border p-2 rounded"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center mx-2 font-semibold">
          Showing {firstIndex + 1}-{Math.min(lastIndex, totalRows)} of{' '}
          {totalRows}
        </div>
        <button
          className={`${
            page === 1
              ? 'bg-gray-300 cursor-default'
              : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
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
          onClick={() => setPage(page + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default OrderSortingControls
