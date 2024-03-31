import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import NewItem from './Pages/NewItem';
import LoginSignup from './Pages/LoginSignup';
import { AuthTokenContext } from './context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  UseRoutes,
  BrowserRouter
} from 'react-router-dom';


function App() {
  const authToken = false
  return (
    <AuthTokenContext.Provider value={authToken}>
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
        </Routes>
        </BrowserRouter>
      </div>
    </AuthTokenContext.Provider>
  );
}

export default App;
