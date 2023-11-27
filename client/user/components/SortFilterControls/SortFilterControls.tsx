import React from 'react'

interface SortFilterControlsProps {
  filter: string
  sort: string
  setFilter: (value: string) => void
  setSort: (value: string) => void
}

const SortFilterControls: React.FC<SortFilterControlsProps> = ({
  filter,
  sort,
  setFilter,
  setSort,
}) => {
  return (
    <div className="sort-filter-controls">
      <label htmlFor="filter" className="label">
        Filter by:
      </label>
      <select
        name="filter"
        id="filter"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        className="select"
      >
        <option value="">...</option>
        <option value="With pearls">With pearls</option>
        <option value="Without pearls">Without pearls</option>
        <option value="Teas">Teas</option>
        <option value="Smoothies">Smoothies</option>
        <option value="Yogurts">Yogurts</option>
        <option value="Fruit Drinks">Fruit drinks</option>
        <option value="Dairy free">Dairy free</option>
      </select>

      <label htmlFor="sort" className="label">
        Sort by:{' '}
      </label>
      <select
        name="sort"
        id="sort"
        onChange={(e) => setSort(e.target.value)}
        value={sort}
        className="select"
      >
        <option value="">...</option>
        <option value="Price (Low to High)">Price (Low to High)</option>
        <option value="Price (High to Low)">Price (High to Low)</option>
        <option value="Alphabetical (A to Z)">Alphabetical (A to Z)</option>
      </select>
    </div>
  )
}

export default SortFilterControls
