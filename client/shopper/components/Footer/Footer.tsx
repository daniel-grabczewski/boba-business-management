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
    <footer className="flex justify-between items-center bg-[#9B99FF] px-4 md:px-12 lg:px-16 py-4 min-h-[80px] max-h-[80px]">
      {isShopperView === null ? (
        <div></div>
      ) : isShopperView ? (
        <div className="flex flex-wrap justify-center md:justify-end text-white gap-4 md:gap-8 lg:gap-16 w-full">
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/')
              window.scrollTo(0, 0)
            }}
          >
            Home
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/shop')
              window.scrollTo(0, 0)
            }}
          >
            Shop
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/cart')
              window.scrollTo(0, 0)
            }}
          >
            Cart
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/contact')
              window.scrollTo(0, 0)
            }}
          >
            Contact
          </button>
          <div className="flex space-x-4 md:space-x-6">
            <div className="group relative">
              <button
                className="hover:text-gray-600 transition-colors duration-300 flex items-center text-sm md:text-base"
                onClick={() => {
                  goTo('/profile')
                  window.scrollTo(0, 0)
                }}
              >
                <FontAwesomeIcon icon={faUser} className="text-lg md:text-xl" />
              </button>
              <span className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                Profile
              </span>
            </div>

            <div className="group relative">
              <button
                className="hover:text-gray-600 transition-colors duration-300 flex items-center text-sm md:text-base"
                onClick={() => {
                  goTo('/wishlist')
                  window.scrollTo(0, 0)
                }}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-lg md:text-xl"
                />
              </button>
              <span className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                Wishlist
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 lg:space-x-8 text-white gap-2 md:gap-4 w-full">
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/admin')
              window.scrollTo(0, 0)
            }}
          >
            Dashboard
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/admin/inbox')
              window.scrollTo(0, 0)
            }}
          >
            Inbox
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/admin/orders')
              window.scrollTo(0, 0)
            }}
          >
            Orders
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/admin/reviews')
              window.scrollTo(0, 0)
            }}
          >
            Reviews
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
            onClick={() => {
              goTo('/admin/products-summary')
              window.scrollTo(0, 0)
            }}
          >
            Products
          </button>
          <button
            className="hover:text-gray-600 transition-colors duration-300 text-sm md:text-base"
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
