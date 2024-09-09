import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faUser,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import NavToggleSwitch from '../../../UI/NavToggleSwitch'
import { baseURL } from '../../../../baseUrl'
import { getDisplayCartItems } from '../../../services/cart'
import { useQuery } from 'react-query'

const Nav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isShopperView, setIsShopperView] = useState<boolean | null>(null)
  const [amountInCart, setAmountInCart] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (location.pathname.startsWith(`${baseURL}/admin`)) {
      setIsShopperView(false)
    } else {
      setIsShopperView(true)
    }
  }, [location.pathname])

  const { data } = useQuery('getDisplayCartItems', async () =>
    getDisplayCartItems()
  )

  useEffect(() => {
    if (data) {
      const total = data.reduce((total, item) => total + item.quantity, 0)
      setAmountInCart(total)
    }
  }, [data])

  const goTo = (link: string) => {
    navigate(`${baseURL}${link}`)
    setMenuOpen(false)
  }

  const adminColor = '#ffa835'
  const shopperColor = '#5b59fd'

  const adminNavigateTo = '/admin'
  const shopperNavigateTo = '/'

  return (
    <nav className="flex justify-between items-center h-20 w-full bg-gray-900 px-4 md:px-8 relative">
      <div className="flex items-center">
        <NavToggleSwitch
          isShopperView={isShopperView}
          handleIsShopperView={setIsShopperView}
          scale={2}
          adminNavigateTo={adminNavigateTo}
          shopperNavigateTo={shopperNavigateTo}
          goTo={goTo}
        />
        <div
          className="ml-4"
          style={{
            height: '60px',
            width: '6px',
            backgroundColor: isShopperView ? shopperColor : adminColor,
            borderRadius: '5px',
          }}
        ></div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        <div
          className={`hidden md:flex items-center space-x-8 text-white text-xl`}
        >
          {isShopperView ? (
            <>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/')}
              >
                Home
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/shop')}
              >
                Shop
              </button>
              <div className="relative">
                <button
                  className="hover:text-purple-700 transition-colors duration-300"
                  onClick={() => goTo('/cart')}
                >
                  Cart
                  {amountInCart > 0 && (
                    <span className="absolute top-0 bg-red-500 text-white text-xs rounded-full py-0.5 px-2">
                      {amountInCart}
                    </span>
                  )}
                </button>
              </div>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/contact')}
              >
                Contact
              </button>
              <div className="flex space-x-4">
                <button
                  className="hover:text-purple-700 transition-colors duration-300"
                  onClick={() => goTo('/profile')}
                >
                  <FontAwesomeIcon icon={faUser} className="text-2xl" />
                </button>
                <button
                  className="hover:text-purple-700 transition-colors duration-300"
                  onClick={() => goTo('/wishlist')}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin')}
              >
                Dashboard
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/inbox')}
              >
                Inbox
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/orders')}
              >
                Orders
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/reviews')}
              >
                Reviews
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/products-summary')}
              >
                Products
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/add-product')}
              >
                Add Product
              </button>
            </>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 md:hidden z-50">
          {isShopperView ? (
            <>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/')}
              >
                Home
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/shop')}
              >
                Shop
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/cart')}
              >
                Cart
                {amountInCart > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full py-0.5 px-2 ml-2">
                    {amountInCart}
                  </span>
                )}
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/contact')}
              >
                Contact
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/profile')}
              >
                Profile
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/wishlist')}
              >
                Wishlist
              </button>
            </>
          ) : (
            <>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin')}
              >
                Dashboard
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/inbox')}
              >
                Inbox
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/orders')}
              >
                Orders
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/reviews')}
              >
                Reviews
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/products-summary')}
              >
                Products
              </button>
              <button
                className="hover:text-purple-700 transition-colors duration-300"
                onClick={() => goTo('/admin/add-product')}
              >
                Add Product
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Nav
