import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import NavToggleSwitch from '../../../UI/NavToggleSwitch'

const Nav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isShopperView, setIsShopperView] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the current path starts with '/admin'
    if (location.pathname.startsWith('/admin')) {
      setIsShopperView(false)
    } else {
      setIsShopperView(true)
    }
  }, [location.pathname])

  const goTo = (link: string) => {
    navigate(link)
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
      {isShopperView ? (
        <div className="flex space-x-6 text-white">
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
          </button>
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => goTo('/contact')}
          >
            Contact
          </button>
          <div className="flex space-x-6 text-white">
            <div className="group relative">
              <button
                className="hover:text-purple-700 transition-colors duration-300 flex items-center"
                onClick={() => goTo('/profile')}
              >
                <img
                  src="/images/user.svg"
                  alt="Profile Icon"
                  className="h-5 w-5"
                />
              </button>
              <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                Profile
              </span>
            </div>

            <div className="group relative">
              <button onClick={() => goTo('/wishlist')}>
                <FontAwesomeIcon icon={faHeart} className="text-xl" />
              </button>
              <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
                Wishlist
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-6 text-white">
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
        </div>
      )}
    </nav>
  )
}

export default Nav
