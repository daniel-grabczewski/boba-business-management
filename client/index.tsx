import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import AppLayout from './user/components/AppLayout/AppLayout'
import Cart from './user/pages/Cart/Cart'
import UnprotectedComponent from './UI/UnprotectedComponent'
import {
  ErrorPage,
  Home,
  Shop,
  ProductPage,
  ThankYou,
  Contact,
  Checkout,
  Profile,
  EditProfile,
  Wishlist,
} from './user/pages/index'
import {
  Reviews,
  Dashboard,
  Emails,
  ProductsSummary,
  IndividualProduct,
} from './admin/pages/'

import Redirect from './user/pages/Redirect/Redirect'
import AllOrders from './admin/pages/Orders/AllOrders'
import ProtectedComponent from './UI/ProtectedComponent'
import AddProduct from './admin/pages/AddProduct/AddProduct'


export const routes = createRoutesFromElements(
  <Route
    path={
      process.env.NODE_ENV === 'production'
        ? '/boba-business-management-demo/'
        : '/'
    }
    element={<AppLayout />}
    errorElement={<ErrorPage />}
  >
    <Route index element={<ProtectedComponent component={Home} />} />
    <Route path="cart" element={<ProtectedComponent component={Cart} />} />
    <Route path="shop" element={<ProtectedComponent component={Shop} />} />
    <Route
      path="redirect"
      element={<ProtectedComponent component={Redirect} />}
    />

    <Route
      path="shop/:id"
      element={<ProtectedComponent component={ProductPage} />}
    />
    <Route
      path="thankyou"
      element={<ProtectedComponent component={ThankYou} />}
    />
    <Route
      path="contact"
      element={<UnprotectedComponent component={Contact} />}
    />
    <Route
      path="checkout"
      element={<ProtectedComponent component={Checkout} />}
    />
    <Route
      path="profile"
      element={<ProtectedComponent component={Profile} />}
    />
    <Route
      path="edit"
      element={<ProtectedComponent component={EditProfile} />}
    />
    <Route
      path="wishlist"
      element={<ProtectedComponent component={Wishlist} />}
    />
    <Route
      path="admin/reviews"
      element={<ProtectedComponent component={Reviews} />}
    />
    <Route
      path="admin"
      element={<ProtectedComponent component={Dashboard} />}
    />

    <Route
      path="admin/orders"
      element={<ProtectedComponent component={AllOrders} />}
    />
    <Route
      path="admin/products-summary"
      element={<ProtectedComponent component={ProductsSummary} />}
    />
    <Route
      path="admin/edit/:id"
      element={<ProtectedComponent component={IndividualProduct} />}
    />

    <Route
      path="admin/add-product"
      element={<ProtectedComponent component={AddProduct} />}
    />

    <Route
      path="admin/inbox"
      element={<ProtectedComponent component={Emails} />}
    />
  </Route>
)

function AppProvider() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

document.addEventListener('DOMContentLoaded', () => {
  const queryClient = new QueryClient()
  createRoot(document.getElementById('app') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <AppProvider />
    </QueryClientProvider>
  )
})
