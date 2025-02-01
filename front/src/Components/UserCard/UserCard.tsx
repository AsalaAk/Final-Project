import React, { useContext } from 'react';
import './UserCard.css';
import { CardItems } from '../../types';

type CardItemsProps = {
    person: CardItems
}

const UserCard: React.FC<CardItemsProps> = ({ person }) => {
    return (
        <div className="userCardDiv">
            <h3>
                {person.fname} {person.lname}
            </h3>
            <p>
                <strong>מין:</strong> {person.gender}
            </p>
            <p>
                <strong>איזור:</strong> {person.ezor}
            </p>
            <p>
                <strong>תיאור:</strong> {person.cardDescription}
            </p>

        </div>
    );
};

export default UserCard;
