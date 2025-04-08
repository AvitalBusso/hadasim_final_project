import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignUpSupplier from './components/SignUpSupplier'
import LoginOwner from './components/LoginOwner'
import LoginSupplier from './components/LoginSupplier'
import InitialPage from './components/InitialPage'
import HomePage from './components/HomePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InitialPage />}></Route>
          <Route path="/initialPage" element={<InitialPage />}></Route>
          <Route path="loginSupplier" element={<LoginSupplier />}></Route>
          <Route path="loginOwner" element={<LoginOwner />}></Route>
          <Route path="signUpSupplier" element={<SignUpSupplier />}></Route>
          <Route path="homePage/:role" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
