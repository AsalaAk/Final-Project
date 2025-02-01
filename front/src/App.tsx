import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Login from './Components/Login/Login';
import { TopBar } from './Components/TopBar/TopBar';
import MenuBar from './Components/MenuBar/MenuBar';
import { arrForMenuBarItems } from './MenuBarArr';
import Home from './Pages/Home/Home';
import ContactUs from './Components/ContactUs/ContactUs';
import Register from './Pages/Register/Register';
import FAQs from './Components/FAQs/FAQs';
import FAQList from './Components/FAQs/FAQList';
import { MyContext, MyContextProvider } from './state/MyContext';
import UserCardsComp from './Components/UserCardsComp/UserCardsComp';
import Professionals from './Pages/Professionals/Professionals';
import Profile from './Pages/Profile/Profile';
import PersonInfoPage from './PersonInfoPage/PersonInfoPage';
import { useContext } from 'react';



function App() {
  const { isLoggedIn } = useContext(MyContext); // Check if the user is logged in

  return (
    <MyContextProvider>
      <BrowserRouter>
        <div>
          <TopBar />
          <MenuBar theArr={arrForMenuBarItems} />
        </div>
        <div className='routesParent'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/professionals' element={<Professionals />} />
            <Route path='/faqList' element={<FAQList />} />
            <Route path='/faqs' element={<FAQs question={''} answer={''} />} />
            <Route path='/usercardscomp' element={<UserCardsComp cards={[]} />} />
            <Route path="/personinfopage/:id" element={<PersonInfoPage />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </div>

      </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
