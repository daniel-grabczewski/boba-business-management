import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { backgroundImage1, backgroundImage2 } from '../../../data/miscImages'
import { homePageTeaImage } from '../../../data/miscImages'
import { homePageTitleImage } from '../../../data/miscImages'
import { baseURL } from '../../../../baseUrl'

const Home = () => {
  const navigate = useNavigate()

  function goTo(link: string) {
    navigate(`${baseURL}${link}`)
  }

  // Scroll to top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="fixed bg-home-rose min-w-screen min-h-screen relative">
        {/* Background images */}
        <div className="inset-0 z-0">
          <div
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-no-repeat overflow-show "
            style={{
              backgroundImage: `url('${backgroundImage2}')`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImage1}')`,
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen max-w-screen-lg mx-auto p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row items-center justify-center mx-auto space-y-6 md:space-y-0 md:space-x-8">
            {/* Boba Image */}
            <div className="w-2/3 md:w-1/3 lg:w-1/4">
              <img
                src={homePageTeaImage}
                alt="Boba Buddies Drink"
                className="w-full h-auto"
              />
            </div>

            {/* Text and Button */}
            <div className="flex flex-col text-white text-lg md:text-xl lg:text-2xl w-full md:w-1/2 lg:w-1/2 items-center md:items-start text-center md:text-left space-y-4">
              <img
                src={homePageTitleImage}
                alt="Boba Buddies Logo"
                className="w-3/4 md:w-full h-auto"
              />
              <p className="text-lg md:text-xl lg:text-2xl">
                Dive into our colorful world of delicious flavors, hand-shaken
                to perfection. Join the fun, and become a boba buddy today!
              </p>
              <button
                onClick={() => goTo('/shop')}
                className="w-2/3 md:w-1/3 border-4 border-white text-rose-300 bg-white px-6 py-2 rounded-2xl hover:bg-grape hover:text-white hover:border-grape transition-all duration-300"
              >
                Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
