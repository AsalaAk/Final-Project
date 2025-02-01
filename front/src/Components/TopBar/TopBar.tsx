import { useContext } from 'react';
import './TopBar.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../../state/MyContext';
import { useNavigate } from 'react-router-dom';

export const TopBar = () => {
    const { isLoggedIn, setIsLoggedIn, loggedInUserId, setToken, setLoggedInUserId } = useContext(MyContext); // Get the login state from context
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("userToken"); // Remove token
        localStorage.removeItem("userId"); // Remove user ID
        setIsLoggedIn(false);
        setToken(null);
        setLoggedInUserId(null);
        navigate("/");
    };



    return (
        <div>
            <div className='TopBarContainer'>
                <div className='topBarDivFirstHalf'>
                    <div>
                        <Link to="/about">אודות</Link>
                    </div>
                    <div>&nbsp; | &nbsp;</div>
                    <div>
                        <Link to="/contactus">צור קשר</Link>
                    </div>
                </div>


                {/* <div>
                    {!isLoggedIn &&
                        <div className='topBarDivSecondHalf'>
                            <div>
                                <Link to="/register">הרשמה לאינדקס אנשי מקצוע</Link>
                            </div>

                            <div>&nbsp; | &nbsp;</div>

                            <div>
                                <Link to="/login">כניסת מטפלים רשומים</Link>
                            </div>
                        </div>
                    }
                    {isLoggedIn &&
                        <div>
                            <Link to="/logout" onClick={handleLogout}>יציאה</Link>
                        </div>
                    }
                </div> */}

                <div>
                    {isLoggedIn ? (
                        <div className='topBarDivSecondHalf'>
                            <div>
                                <span onClick={handleLogout}>יציאה</span>
                            </div>
                            <div>&nbsp; | &nbsp;</div>
                            <div>
                                <Link to={`/profile/${loggedInUserId}`}>איזור אישי</Link>
                            </div>
                        </div>
                    ) : (

                        <div className='topBarDivSecondHalf'>
                            <div>
                                <Link to="/register">הרשמה לאינדקס אנשי מקצוע</Link>
                            </div>
                            <div>&nbsp; | &nbsp;</div>
                            <div>
                                <Link to="/login">כניסת מטפלים רשומים</Link>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
};

export default TopBar;