/**
 * Updates the page query parameter in the URL, navigates to the new URL,
 * sets the current page in the state, and scrolls to the top of the page.
 *
 * @param {number} newPage - The new page number to set.
 * @param {(newPage: number) => void} setPage - The function to update the page state.
 * @param {(path: string, options?: { replace?: boolean }) => void} navigate - The navigate function from react-router-dom.
 * @param {string} locationSearch - The current location search string (query parameters).
 */
export const changePage = (
  newPage: number,
  setPage: (newPage: number) => void,
  navigate: (path: string, options?: { replace?: boolean }) => void,
  locationSearch: string
) => {
  const queryParams = new URLSearchParams(locationSearch)
  queryParams.set('page', `${newPage}`)
  navigate(`?${queryParams.toString()}`, { replace: true })
  setPage(newPage)
  window.scrollTo({ top: 0 })
}

/**
 * Updates the filter query parameter in the URL, navigates to the new URL,
 * and sets the current filter in the state.
 *
 * @param {string} newFilter - The new filter value to set.
 * @param {(newFilter: string) => void} setFilter - The function to update the filter state.
 * @param {(path: string, options?: { replace?: boolean }) => void} navigate - The navigate function from react-router-dom.
 * @param {string} locationSearch - The current location search string (query parameters).
 */
export const changeFilter = (
  newFilter: string,
  setFilter: (newFilter: string) => void,
  setPage: (newPage: number) => void,
  navigate: (path: string, options?: { replace?: boolean }) => void,
  locationSearch: string
) => {
  const queryParams = new URLSearchParams(locationSearch)
  if (newFilter === '') {
    queryParams.delete('filter')
  } else {
    queryParams.set('filter', newFilter)
  }
  queryParams.set('page', '1')
  setFilter(newFilter)
  setPage(1)
  navigate(`?${queryParams.toString()}`, { replace: true })
}

/**
 * Updates the sort query parameter in the URL, navigates to the new URL,
 * and sets the current sort in the state.
 *
 * @param {string} newSort - The new sort value to set.
 * @param {(newSort: string) => void} setSort - The function to update the sort state.
 * @param {(path: string, options?: { replace?: boolean }) => void} navigate - The navigate function from react-router-dom.
 * @param {string} locationSearch - The current location search string (query parameters).
 */
export const changeSort = (
  newSort: string,
  setSort: (newSort: string) => void,
  setPage: (newPage: number) => void,
  navigate: (path: string, options?: { replace?: boolean }) => void,
  locationSearch: string
) => {
  const queryParams = new URLSearchParams(locationSearch)
  if (newSort === '') {
    queryParams.delete('sort')
  } else {
    queryParams.set('sort', newSort)
  }
  queryParams.set('page', '1')
  setSort(newSort)
  setPage(1)
  navigate(`?${queryParams.toString()}`, { replace: true })
}
