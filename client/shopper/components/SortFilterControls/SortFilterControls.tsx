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
      style={{
        marginTop: '20px',
        marginBottom: '40px',
        minWidth: '1000px',
        maxWidth: '1000px',
      }}
      className="flex items-center gap-4 bg-gray-200 p-4 rounded-md justify-between"
    >
      <input
        style={{ maxWidth: '400px', minWidth: '400px' }}
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Search Product Name..."
        value={search}
        onChange={(e) => handleChangeSearch(e.target.value)}
      />
      <div className="flex gap-4">
        <div>
          <label
            htmlFor="filter"
            className={'font-bold'}
            style={{ marginRight: '4px' }}
          >
            Filter by:{' '}
          </label>
          <select
            name="filter"
            id="filter"
            onChange={(e) => handleChangeFilter(e.target.value)}
            value={filter}
            className="border rounded-md p-2"
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
        <div>
          <label
            htmlFor="sort"
            className="ml-4 font-bold"
            style={{ marginRight: '4px' }}
          >
            Sort by:{' '}
          </label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => handleChangeSort(e.target.value)}
            value={sort}
            className="border rounded-md p-2"
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
