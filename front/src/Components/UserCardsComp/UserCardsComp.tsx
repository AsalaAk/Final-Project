import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCardsComp.css';
import UserCard from '../UserCard/UserCard';
import { CardItems } from '../../types';

// const UserCardsComp: React.FC = () => {
//     const { personCardsArr } = useContext(MyContext);
//     return (
//         <div className="user-cards-container">
//             {personCardsArr.map((user, index) => (
//                 <UserCard person={user} />
//             ))}
//         </div>
//     );
// };
//----------------------------------------------------------------
// type UserCardsCompProps = {
//     cards: CardItems[];
// };

// const UserCardsComp: React.FC<UserCardsCompProps> = ({ cards }) => {
//     return (
//         <div className="user-cards-container">
//             {cards.map((user, index) => (
//                 <UserCard key={index} person={user} />
//             ))}
//         </div>
//     );
// };
// export default UserCardsComp;
//----------------------------------------------------------------

type UserCardsCompProps = {
    cards: CardItems[];
};

const UserCardsComp: React.FC<UserCardsCompProps> = ({ cards }) => {
    const navigate = useNavigate();

    const handleCardClick = (id: number) => {
        navigate(`/personinfopage/${id}`);
    };

    return (
        <div className="user-cards-container">
            {cards.map((user, index) => (
                <div key={index} onClick={() => handleCardClick(user.id)}>
                    <UserCard person={user} />
                </div>
            ))}
        </div>
    );
};


export default UserCardsComp;