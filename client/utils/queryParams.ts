import { URLSearchParams } from 'url'
import { NavigateFunction } from 'react-router-dom'

export const changePage = (
  newPage: number,
  setPage: (newPage: number) => void,
  navigate: NavigateFunction,
  locationSearch: string
) => {
  const queryParams = new URLSearchParams(locationSearch)
  queryParams.set('page', `${newPage}`)
  navigate(`?${queryParams.toString()}`, { replace: true })
  setPage(newPage)
  window.scrollTo({ top: 0 })
}

export const changeFilter = (
  newFilter: string,
  setFilter: (newFilter: string) => void,
  navigate: NavigateFunction,
  locationSearch: string
) => {
  const queryParams = new URLSearchParams(locationSearch)
  if (newFilter === '') {
    queryParams.delete('filter')
  } else {
    queryParams.set('filter', newFilter)
  }
  navigate(`?${queryParams.toString()}`, { replace: true })
  setFilter(newFilter)
}
