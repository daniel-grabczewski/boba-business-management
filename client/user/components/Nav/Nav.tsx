import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import '/public/nav.css'

const Nav = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const { loginWithRedirect } = useAuth0()

  const handleProfileClick = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/redirect`,
      },
    })
  }

  return (
    <nav className="nav">
      <div className="flex-container">
        <button onClick={() => goTo('/')} className="nav-button">
          Home
        </button>
        <button onClick={() => goTo('/shop')} className="nav-button">
          Shop
        </button>
        <button onClick={() => goTo('/cart')} className="nav-button">
          Cart
        </button>
      </div>

      <div className="icon-group">
        <div className="tooltip-container">
          <button onClick={handleProfileClick} className="user-button">
            <img src="/images/user.svg" alt="Profile Icon" className="icon" />
          </button>
          <span className="tooltip-text">Profile</span>
        </div>

        <div className="tooltip-container">
          <button onClick={() => goTo('/wishlist')} className="wishlist-button">
            <FontAwesomeIcon icon={faHeart} className="icon" />
          </button>
          <span className="tooltip-text">Wishlist</span>
        </div>
      </div>
    </nav>
  )
}

export default Nav
