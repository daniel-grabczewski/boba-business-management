import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import NavToggleSwitch from '../../../UI/NavToggleSwitch'
import { baseURL } from '../../../../baseUrl'
import { getDisplayCartItems } from '../../../services/cart'
import { useQuery } from 'react-query'

const Nav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isShopperView, setIsShopperView] = useState<boolean | null>(null)
  const [amountInCart, setAmountInCart] = useState(0)

  useEffect(() => {
    // Check if the current path starts with '/admin'
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
  }

  const adminColor = '#ffa835'
  const shopperColor = '#5b59fd'

  const adminNavigateTo = '/admin'
  const shopperNavigateTo = '/'

  return (
    <nav
      className=" flex justify-between items-center px-6 md:px-12 lg:px-16"
      style={{
        background: isShopperView ? '#292929' : '#292929',
        minHeight: '80px',
        maxHeight: '80px',
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <div
          style={{ background: '', height: '70px', width: '350px' }}
          className="p-2 flex flex-row justify-center"
        >
          <NavToggleSwitch
            isShopperView={isShopperView}
            handleIsShopperView={(isShopperView) =>
              setIsShopperView(isShopperView)
            }
            scale={2}
            adminNavigateTo={adminNavigateTo}
            shopperNavigateTo={shopperNavigateTo}
            goTo={goTo}
          />
        </div>
        <div
          style={{
            height: '60px',
            color: 'red',
            width: '6px',
            backgroundColor: isShopperView ? shopperColor : adminColor,
            marginLeft: '30px',
            borderRadius: '5px',
            marginRight: '40px',
          }}
        ></div>
      </div>
      {isShopperView === null ? (
        <div></div>
      ) : isShopperView ? (
        <div className="flex text-white text-xl" style={{ gap: '4rem' }}>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => {
              goTo('/')
              window.scrollTo(0, 0)
            }}
          >
            Home
          </button>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => {
              goTo('/shop')
              window.scrollTo(0, 0)
            }}
          >
            Shop
          </button>
          <div className="relative inline-block">
            <button
              className="hover:text-purple-700 transition-colors duration-300 relative"
              onClick={() => {
                goTo('/cart')
                window.scrollTo(0, 0)
              }}
            >
              Cart
              {/* Red bubble only shows when itemCount is greater than 0 */}
              {amountInCart > 0 && (
                <span
                  className="absolute top-0 bg-red-500 text-white text-xs rounded-full py-0.5"
                  style={{
                    marginLeft: '2px',
                    paddingLeft: '6px',
                    paddingRight: '6px',
                  }}
                >
                  {amountInCart}
                </span>
              )}
            </button>
          </div>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
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
                className="hover:text-purple-700 transition-colors duration-300 flex items-center"
                onClick={() => {
                  goTo('/profile')
                  window.scrollTo(0, 0)
                }}
              >
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
              </button>
              <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
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
              <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                Wishlist
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex space-x-6 text-white text-xl"
          style={{ gap: '2rem' }}
        >
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => {
              goTo('/admin')
              window.scrollTo(0, 0)
            }}
          >
            Dashboard
          </button>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/inbox')
              window.scrollTo(0, 0)
            }}
          >
            Inbox
          </button>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/orders')
              window.scrollTo(0, 0)
            }}
          >
            Orders
          </button>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/reviews')
              window.scrollTo(0, 0)
            }}
          >
            Reviews
          </button>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/products-summary')
              window.scrollTo(0, 0)
            }}
          >
            Products
          </button>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => {
              goTo('/admin/add-product')
              window.scrollTo(0, 0)
            }}
          >
            Add Product
          </button>
        </div>
      )}
    </nav>
  )
}

export default Nav
