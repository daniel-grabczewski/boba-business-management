import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const { loginWithRedirect } = useAuth0()

  const handleLoginClick = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/redirect`,
      },
    })
  }

  return (
    <footer className="footer">
      <button className="footer-button" onClick={() => goTo('/')}>
        Home
      </button>
      <button className="footer-button" onClick={() => goTo('/shop')}>
        Shop
      </button>
      <button className="footer-button" onClick={() => goTo('/contact')}>
        Contact
      </button>
      <button className="footer-button" onClick={handleLoginClick}>
        Admin
      </button>
    </footer>
  )
}

export default Footer
