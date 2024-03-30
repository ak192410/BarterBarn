import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import NewItem from './Pages/NewItem';
import LoginSignup from './Pages/LoginSignup';
{/*
import {
  BrowserRouter as Router,
  Routes,
  Route,
  UseRoutes
} from 'react-router-dom';
*/}

function App() {
  return (
    <div className="App">
      <Navbar/> 
{/*
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/Product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/NewItem' element={<NewItem/>}/>
        <Route path='/Login' element={<LoginSignup/>}/>
      </Routes>
  */}
    </div>
  );
}

export default App;
