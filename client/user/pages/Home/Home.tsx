import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div className="background-div">
      <div className="welcome-card">
        <div className="inner-welcome-card">
          <img
            src="/images/home-tea.svg"
            alt="Boba Buddies Logo"
            className="home-logo"
          />
          <div className="text-container">
            <img src="/images/home-title.svg" alt="Boba Buddies Logo" />
            <p>
              Dive into our colorful world of delicious flavors, hand-shaken to
              perfection. Join the fun, and become a boba buddy today!
            </p>
            <button onClick={() => goTo('shop')} className="home-button">
              Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
