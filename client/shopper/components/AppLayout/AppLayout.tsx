import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { AdminNavBar } from '../../../admin/components/AdminNavBar/AdminNavBar'

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavBar />
      <Nav />
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default AppLayout
