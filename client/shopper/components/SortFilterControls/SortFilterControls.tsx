interface SortFilterControlsProps {
  filter: string
  sort: string
  handleChangeFilter: (value: string) => void
  handleChangeSort: (value: string) => void
  search: string
  handleChangeSearch: (search: string) => void
}

const SortFilterControls = ({
  filter,
  sort,
  handleChangeFilter,
  handleChangeSort,
  search,
  handleChangeSearch,
}: SortFilterControlsProps) => {
  return (
    <div
      className="flex flex-col lg:flex-row items-start lg:items-center gap-4 bg-gray-200 p-4 rounded-md justify-between w-full sm:w-2/3 lg:w-full mx-auto"
      style={{ marginTop: '20px', marginBottom: '40px' }}
    >
      {/* Search Input */}
      <input
        className="border p-2 rounded w-full xl:max-w-md"
        type="text"
        placeholder="Search Product Name..."
        value={search}
        onChange={(e) => handleChangeSearch(e.target.value)}
      />

      {/* Filter and Sort Controls */}
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-2 lg:w-auto">
          <label
            htmlFor="filter"
            className="font-bold mr-2 lg:whitespace-nowrap"
          >
            Filter by:
          </label>
          <select
            name="filter"
            id="filter"
            onChange={(e) => handleChangeFilter(e.target.value)}
            value={filter}
            className="border rounded-md p-2 w-full lg:w-auto"
          >
            <option value="">...</option>
            <option value="with-pearls">With pearls</option>
            <option value="without-pearls">Without pearls</option>
            <option value="teas">Teas</option>
            <option value="smoothies">Smoothies</option>
            <option value="yogurts">Yogurts</option>
            <option value="fruit-drinks">Fruit drinks</option>
            <option value="dairy-free">Dairy free</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-2 lg:w-auto">
          <label htmlFor="sort" className="font-bold mr-2 lg:whitespace-nowrap">
            Sort by:
          </label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => handleChangeSort(e.target.value)}
            value={sort}
            className="border rounded-md p-2 w-full lg:w-auto"
          >
            <option value="">...</option>
            <option value="price-low-to-high">Price (Low to High)</option>
            <option value="price-high-to-low">Price (High to Low)</option>
            <option value="a-z">Alphabetical (A to Z)</option>
            <option value="rating-low-to-high">Rating (Low to High)</option>
            <option value="rating-high-to-low">Rating (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SortFilterControls
