import { Route, Routes } from 'react-router-dom'
import './App.css'
import ValidateFaces from './components/ValidateFaces'
import Home from './Pages/Home'
import ValidationFacePage from './Pages/ValidationFacePage'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ValidationFacePage />} />
        <Route path='/face' element={<ValidateFaces />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App