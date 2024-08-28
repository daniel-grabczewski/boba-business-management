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
    <div style={{ background: '#FFC5C7' }}>
      <div
        className="flex items-center justify-center"
        style={{
          backgroundImage: `url('${backgroundImage1}'), url('${backgroundImage2}')`,
          backgroundPosition: 'bottom left, top right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '88vh, 80vh',
          height: '95vh',
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ marginTop: '-50px' }}
        >
          <div className=" flex flex-row items-center justify-center mx-auto">
            {/* Welcome Card */}
            <div
              style={{ width: '38vh', marginLeft: '30vh' }}
              className="w-1/2"
            >
              <img
                src={homePageTeaImage}
                alt="Boba Buddies Logo"
                className="max-w-full h-auto pr-10"
              />
            </div>

            <div className="flex flex-col text-white text-xl p-10 w-1/2">
              <img
                src={homePageTitleImage}
                alt="Boba Buddies Logo"
                className="max-w-full h-auto"
                style={{ width: '47vh' }}
              />
              <p className="text-2xl w-3/4 mt-4">
                Dive into our colorful world of delicious flavors, hand-shaken
                to perfection. Join the fun, and become a boba buddy today!
              </p>
              <button
                onClick={() => goTo('/shop')}
                className="w-1/3 border border-white text-rose-300 bg-white px-6 py-2 rounded-2xl hover:bg-grape hover:text-white hover:border-grape transition-all duration-300 mt-8 "
                style={{ borderWidth: '3px' }}
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
