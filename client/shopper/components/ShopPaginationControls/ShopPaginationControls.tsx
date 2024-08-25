interface ShopPaginationControlsProps {
  page: number
  totalPages: number
  handleChangePage: (newPage: number) => void
  shownProducts: number
}

const ShopPaginationControls = ({
  page,
  totalPages,
  handleChangePage,
  shownProducts,
}: ShopPaginationControlsProps) => {
  return (
    <div className="flex mt-4 justify-center" style={{ marginTop: '40px' }}>
      <button
        className={`${
          page === 1 || shownProducts === 0
            ? 'bg-gray-300 cursor-default'
            : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold py-2 px-4 mt-2 rounded-full w-128`}
        disabled={page === 1 || shownProducts === 0}
        onClick={() => handleChangePage(page - 1)}
      >
        Prev Page
      </button>
      <div className="inline-block bg-gray-100 rounded-full px-3 py-2 text-l font-bold text-gray-700 mt-2 ml-2 mr-2 w-12 text-center">
        {page}
      </div>
      <button
        className={`${
          page === totalPages || shownProducts === 0
            ? 'bg-gray-300 cursor-default'
            : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold py-2 px-4 mt-2 rounded-full w-128`}
        disabled={page === totalPages || shownProducts === 0}
        onClick={() => handleChangePage(page + 1)}
      >
        Next Page
      </button>
    </div>
  )
}

export default ShopPaginationControls
