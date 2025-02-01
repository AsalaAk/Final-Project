import { Link } from 'react-router-dom';
import { MenuBarItems } from '../../MenuBarArr';
import './MenuBar.css';

export const MenuBar = (props: { theArr: MenuBarItems[] }) => {
    return (
        <div className='menuBarDivParent'>
            <div><img src="logo192.png" alt="" /></div>
            <div className='menuBarLinks'>
                {props.theArr.map((curr) => {
                    return (
                        <div>
                            <Link to={curr.hrefStr}>{curr.displayStr}</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

export default MenuBar;
