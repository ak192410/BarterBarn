import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import NewItem from './Pages/NewItem';
import LoginSignup from './Pages/LoginSignup';
import ProductPage from './Pages/ProductPage'
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  UseRoutes,
  BrowserRouter
} from 'react-router-dom';


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  return (
    <div>
      <BrowserRouter>
      <Navbar/> 
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/Product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/NewItem' element={<NewItem/>}/>
        <Route path='/Login' element={<LoginSignup/>}/>
        {authToken && <Route path="/ProductPage/:productId" element={<ProductPage />} />}
        {!authToken && <Route path="/ProductPage/:productId" element={<LoginSignup />} />}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
