import React from 'react';

interface SortFilterControlsProps {
  filter: string;
  sort: string;
  setFilter: (value: string) => void;
  setSort: (value: string) => void;
}

const SortFilterControls: React.FC<SortFilterControlsProps> = ({
  filter,
  sort,
  setFilter,
  setSort,
}) => {
  return (
      <div style = {{marginTop : "20px", marginBottom : "60px"}}>
        <label htmlFor="filter" className={'font-bold'}>Filter by: </label>
        <select
          name="filter"
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="border rounded-md"
        >
          <option value="">...</option>
          <option value="with-pearls">With pearls</option>
          <option value="without-pearls">Without pearls</option>
          <option value="teas">Teas</option>
          <option value="smoothies">Smoothies</option>
          <option value="yoghurts">Yogurts</option>
          <option value="fruit-drinks">Fruit drinks</option>
          <option value="dairy-free">Dairy free</option>
        </select>

        <label htmlFor="sort" className="ml-4 font-bold" >
          Sort by:{' '}
        </label>
        <select
          name="sort"
          id="sort"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
          className="border rounded-md"
        >
          <option value="">...</option>
          <option value="price-low-to-high">Price (Low to High)</option>
          <option value="price-high-to-low">Price (High to Low)</option>
          <option value="a-z">Alphabetical (A to Z)</option>
        </select>
      </div>
  );
};

export default SortFilterControls;
