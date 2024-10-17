import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  backgroundImage1,
  backgroundImage2,
  homePageTeaImage,
  homePageTitleImage,
} from '../../../data/miscImages'
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
    <div className="bg-home-rose min-w-screen min-h-screen relative flex items-center justify-center">
      {/* Background Images */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage1})` }}
      />
      <div
        className="absolute top-0 right-0 bg-no-repeat"
        style={{
          width: window.innerWidth > 768 ? '50vw' : '80vw',
          height: window.innerWidth > 768 ? '40vh' : '50vh',
          backgroundImage: `url(${backgroundImage2})`,
          backgroundSize: 'contain',
          backgroundPosition: 'top right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Main Content */}
      <div className="relative max-w-screen-lg mx-auto p-6 md:p-10 w-full flex items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center w-full">
          {/* Boba Image */}
          <div className="hidden sm:flex col items-center justify-center">
            <img
              src={homePageTeaImage}
              alt="Boba Buddies Drink"
              className="w-[70%] sm:w-[70%] md:w-[80%] h-auto"
            />
          </div>

          {/* Text and Button Section */}
          <div className="flex flex-col items-start text-white text-lg md:text-xl lg:text-2xl w-full md:w-1/2 lg:w-1/2 space-y-4">
            <img
              src={homePageTitleImage}
              alt="Boba Buddies Logo"
              className="w-3/4 xs:w-1/2 sm:w-2/3 md:w-full h-auto"
            />
            <p className="text-lg w-full  md:text-xl lg:text-2xl text-left">
              Dive into our colorful world of delicious flavors, hand-shaken to
              perfection. Join the fun, and become a boba buddy today!
            </p>
            <button
              onClick={() => goTo('/shop')}
              className="w-1/3 text-rose-300 bg-white px-6 py-2 rounded-2xl hover:bg-purple-700 hover:text-white transition-all duration-300"
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
