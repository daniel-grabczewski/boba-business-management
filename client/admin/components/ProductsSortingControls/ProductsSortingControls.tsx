interface ProductsSortingControlsProps {
  search: string
  handleChangeSearch: (search: string) => void
  sort: string
  handleChangeSort: (newSort: string) => void
  page: number
  totalPages: number
  handleChangePage: (newPage: number) => void
  productsCount: number
  handleChangeFilter: (newFilter: string) => void
  filter: string
}

function ProductsSortingControls({
  search,
  handleChangeSearch,
  sort,
  handleChangeSort,
  page,
  totalPages,
  handleChangePage,
  productsCount,
  handleChangeFilter,
  filter,
}: ProductsSortingControlsProps) {
  const lastIndex = page * 10
  const firstIndex = lastIndex - 10

  return (
    <div className="border p-2 rounded flex flex-col custom:flex-row justify-between items-center mb-4 bg-white sticky top-0 z-10">
      <div className="flex flex-col custom:flex-row items-start custom:items-center w-full custom:w-auto">
        {/* SEARCH */}
        <input
          className="border p-2 rounded mb-2 custom:mb-0 custom:mr-2 w-full custom:w-auto text-sm custom:text-base"
          type="text"
          placeholder="Search Product Name..."
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
            <option value="all">All products</option>
            <option value="low-stock">Low stock</option>
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
            <option value="a-z">Alphabetical (A to Z)</option>
            <option value="price-low-to-high">Price (Low to High)</option>
            <option value="price-high-to-low">Price (High to Low)</option>
            <option value="stock-low-to-high">Stock (Low to High)</option>
            <option value="stock-high-to-low">Stock (High to Low)</option>
            <option value="rating-low-to-high">
              Average Rating (Low to High)
            </option>
            <option value="rating-high-to-low">
              Average Rating (High to Low)
            </option>
          </select>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center w-full custom:w-auto mt-2 custom:mt-0">
        <div className="flex flex-col justify-end mx-2 font-semibold w-full custom:w-auto text-sm custom:text-base">
          <p className="text-left custom:text-right">
            Showing {productsCount === 0 ? 0 : firstIndex + 1}-
            {Math.min(lastIndex, productsCount)} of {productsCount}
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
            page === totalPages || productsCount === 0
              ? 'bg-gray-300 cursor-default'
              : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded ml-2 transition-all duration-300 text-sm custom:text-base`}
          disabled={page === totalPages || productsCount === 0}
          onClick={() => handleChangePage(page + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default ProductsSortingControls
