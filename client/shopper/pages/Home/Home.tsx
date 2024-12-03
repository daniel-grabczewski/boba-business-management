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
    <div className="bg-home-rose min-w-screen relative">
      <div className="relative h-[100vh] overflow-y-auto overflow-x-hidden">
        {/* Background Images */}
        <div className="absolute bottom-0 left-0 w-full bg-no-repeat"
          style={{
            width: window.innerWidth > 768 ? '50vw' : '80vh',
            height: window.innerWidth > 768 ? '40vh' : '30vh',
            backgroundImage: `url(${backgroundImage1})`,
            backgroundSize: 'contain',
            backgroundPosition: 'bottom left',
            backgroundRepeat: 'no-repeat',
          }}
          >  
          </div>
        <div
          className="absolute top-0 right-0 bg-no-repeat"
          style={{
            width: window.innerWidth > 768 ? '45vw' : '60vw',
            height: window.innerWidth > 768 ? '30vh' : '30vh',
            backgroundImage: `url(${backgroundImage2})`,
            backgroundSize: 'contain',
            backgroundPosition: 'top right',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Main Content */}
        <div className="relative max-w-screen-lg mx-auto p-10 w-full flex items-center justify-center h-full">
          <div
            className="flex flex-col sm:flex-row items-center justify-center w-full" style={{marginTop : '-10vh'}}
          >
            {/* Boba Image */}
            <div className="hidden sm:flex col items-center justify-center" style={{marginTop : '-3vh'}}>
              <img
                src={homePageTeaImage}
                alt="Boba Buddies Drink"
                className="w-[70%] sm:w-[70%] md:w-[60%] h-auto"
              />
            </div>

            {/* Text and Button Section */}
            <div className="flex flex-col items-start text-white text-lg md:text-xl lg:text-2xl w-full md:w-1/2 lg:w-1/2 space-y-4">
              <img
                src={homePageTitleImage}
                alt="Boba Buddies Logo"
                className="w-3/4 xs:w-1/2 sm:w-2/3 md:w-3/4 h-auto"
              />
              <p className="text-lg w-full md:text-lg lg:text-xl text-left">
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
    </div>
  )
}

export default Home
