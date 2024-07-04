import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }


  return (
    <footer className="text-white py-2" style={{ background: '#9B99FF' }}>
      <div className="flex justify-end pr-12">
        <div className="space-x-4">
          <div className="flex space-x-6 text-white">
            <button
              className="hover:text-rose-200 transition-colors duration-300"
              onClick={() => goTo('/')}
            >
              Home
            </button>
            <button
              className="hover:text-rose-200 transition-colors duration-300"
              onClick={() => goTo('/shop')}
            >
              Shop
            </button>
            <button
              className="hover:text-rose-200 transition-colors duration-300"
              onClick={() => goTo('/contact')}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
