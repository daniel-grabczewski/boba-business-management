import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { baseURL } from '../../../../baseUrl'

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isShopperView, setIsShopperView] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the current path starts with '/admin'
    if (location.pathname.startsWith(`${baseURL}/admin`)) {
      setIsShopperView(false)
    } else {
      setIsShopperView(true)
    }
  }, [location.pathname])

  const goTo = (link: string) => {
    navigate(`${baseURL}${link}`)
  }

  return (
    <footer
      className=" flex justify-between items-center px-6 md:px-12 lg:px-16"
      style={{
        background: '#9B99FF',
        minHeight: '80px',
        maxHeight: '80px',
      }}
    >
      <div className="flex flex-row justify-between items-center"></div>
      {isShopperView === null ? (
        <div></div>
      ) : isShopperView ? (
        <div className="flex text-white" style={{ gap: '4rem' }}>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/')
              window.scrollTo(0, 0)
            }}
          >
            Home
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/shop')
              window.scrollTo(0, 0)
            }}
          >
            Shop
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/cart')
              window.scrollTo(0, 0)
            }}
          >
            Cart
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/contact')
              window.scrollTo(0, 0)
            }}
          >
            Contact
          </button>
          <div className="flex space-x-6 text-white">
            <div className="group relative">
              <button
                className="hover:text-gray-600 transition-colors duration-300 flex items-center"
                onClick={() => {
                  goTo('/profile')
                  window.scrollTo(0, 0)
                }}
              >
                <FontAwesomeIcon icon={faUser} className="text-xl" />
              </button>
              <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                Profile
              </span>
            </div>

            <div className="group relative">
              <button
                className="hover:text-gray-600 transition-colors duration-300 flex items-center"
                onClick={() => {
                  goTo('/wishlist')
                  window.scrollTo(0, 0)
                }}
              >
                <FontAwesomeIcon icon={faHeart} className="text-xl" />
              </button>
              <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                Wishlist
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-6 text-white" style={{ gap: '2rem' }}>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/admin')
              window.scrollTo(0, 0)
            }}
          >
            Dashboard
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/inbox')
              window.scrollTo(0, 0)
            }}
          >
            Inbox
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/orders')
              window.scrollTo(0, 0)
            }}
          >
            Orders
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/reviews')
              window.scrollTo(0, 0)
            }}
          >
            Reviews
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/products-summary')
              window.scrollTo(0, 0)
            }}
          >
            Products
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/add-product')
              window.scrollTo(0, 0)
            }}
          >
            Add Product
          </button>
        </div>
      )}
    </footer>
  )
}

export default Footer
