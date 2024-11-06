import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
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
  const [responsiveView, setResponsiveView] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    setIsShopperView(!location.pathname.startsWith(`${baseURL}/admin`))
  }, [location.pathname])

  const { data } = useQuery('getDisplayCartItems', getDisplayCartItems)

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

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth
      setScale(width < 390 ? 1.8 : 2)
    }

    const handleResize = () => {
      const width = window.innerWidth

      setResponsiveView(width < 1300)
      setIsSmallScreen(width <= 380)
    }

    updateScale()
    handleResize()
    window.addEventListener('resize', updateScale)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', updateScale)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav className="flex justify-between items-center h-20 w-full bg-nav-grey px-4 md:px-8 relative">
      {/* Logo & Toggle */}
      <div className="flex items-center">
        <NavToggleSwitch
          isShopperView={isShopperView}
          handleIsShopperView={setIsShopperView}
          scale={scale}
          adminNavigateTo="/admin"
          shopperNavigateTo="/"
          goTo={goTo}
        />
        {!isSmallScreen && (
          <div
            className="ml-4"
            style={{
              height: `${30 * scale}px`,
              width: `${3 * scale}px`,
              backgroundColor: isShopperView ? '#5b59fd' : '#ffa835',
              borderRadius: `${5 * scale}px`,
            }}
          ></div>
        )}
      </div>

      {/* Mobile and Desktop Menu */}
      {isShopperView && (
        <>
          {/* Mobile Menu Icon */}
          <button
            className="text-white text-2xl lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>

          {/* Mobile Menu */}
          {menuOpen && responsiveView && (
            <div className="absolute top-20 right-0 w-1/3 bg-nav-grey text-white flex flex-col items-center space-y-4 py-4 z-50">
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/')}
              >
                Home
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/shop')}
              >
                Shop
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/cart')}
              >
                Cart{' '}
                {amountInCart > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full py-0.5 px-2 ml-2">
                    {amountInCart}
                  </span>
                )}
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/contact')}
              >
                Contact
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/profile')}
              >
                Profile
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/wishlist')}
              >
                Wishlist
              </button>
            </div>
          )}

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-14 text-white text-xl">
            <button className="hover:text-purple-700" onClick={() => goTo('/')}>
              Home
            </button>
            <button
              className="hover:text-purple-700"
              onClick={() => goTo('/shop')}
            >
              Shop
            </button>
            <button
              className="relative hover:text-purple-700"
              onClick={() => goTo('/cart')}
            >
              Cart{' '}
              {amountInCart > 0 && (
                <span className="absolute top-0 bg-red-500 text-white text-xs rounded-full py-0.5 px-2">
                  {amountInCart}
                </span>
              )}
            </button>
            <button
              className="hover:text-purple-700"
              onClick={() => goTo('/contact')}
            >
              Contact
            </button>
            {/* Profile and Wishlist Icons */}
            <div className="flex items-center space-x-6 pr-6">
              <div className="group relative">
                <button
                  className="hover:text-purple-700 transition-colors duration-300"
                  onClick={() => {
                    goTo('/profile')
                    window.scrollTo(0, 0)
                  }}
                >
                  <FontAwesomeIcon icon={faUser} className="text-2xl" />
                </button>
                <span className="absolute left-0 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                  Profile
                </span>
              </div>
              <div className="group relative">
                <button
                  className="hover:text-purple-700 transition-colors duration-300 flex items-center"
                  onClick={() => {
                    goTo('/wishlist')
                    window.scrollTo(0, 0)
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-2xl" />
                </button>
                <span className="absolute left-0 transform translate-x-0 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                  Wishlist
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {!isShopperView && (
        <>
          {/* Mobile Menu Icon (Admin View) */}
          <button
            className="text-white text-2xl xl:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>

          {/* Mobile Menu (Admin View) */}
          {menuOpen && responsiveView && (
            <div className="absolute top-20 right-0 w-1/3 bg-nav-grey text-white flex flex-col items-center space-y-4 py-4 z-50">
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/admin')}
              >
                Dashboard
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/admin/inbox')}
              >
                Inbox
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/admin/orders')}
              >
                Orders
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/admin/reviews')}
              >
                Reviews
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/admin/products-summary')}
              >
                Products
              </button>
              <button
                className="hover:text-purple-700"
                onClick={() => goTo('/admin/add-product')}
              >
                Add Product
              </button>
            </div>
          )}

          {/* Desktop Menu (Admin View) */}
          <div className="hidden xl:flex items-center space-x-8 text-white text-xl">
            <button
              className="hover:text-purple-700"
              onClick={() => goTo('/admin')}
            >
              Dashboard
            </button>
            <button
              className="hover:text-purple-700"
              onClick={() => goTo('/admin/inbox')}
            >
              Inbox
            </button>
            <button
              className="hover:text-purple-700"
              onClick={() => goTo('/admin/orders')}
            >
              Orders
            </button>
            <button
              className="hover:text-purple-700"
              onClick={() => goTo('/admin/reviews')}
            >
              Reviews
            </button>
            <button
              className="hover:text-purple-700"
              onClick={() => goTo('/admin/products-summary')}
            >
              Products
            </button>
            <button
              className="hover:text-purple-700"
              onClick={() => goTo('/admin/add-product')}
            >
              Add Product
            </button>
          </div>
        </>
      )}
    </nav>
  )
}

export default Nav
