interface ShopPaginationControlsProps {
  page: number
  totalPages: number
  changePage: (newPage: number) => void
}

const ShopPaginationControls = ({
  page,
  totalPages,
  changePage,
}: ShopPaginationControlsProps) => {
  return (
    <div className="pagination-container">
      <button
        className={`pagination-button prev-button ${
          page === 1 ? 'disabled' : ''
        }`}
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className="page-indicator">{page}</div>
      <button
        className={`pagination-button next-button ${
          page === totalPages ? 'disabled' : ''
        }`}
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default ShopPaginationControls
