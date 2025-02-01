import React, { useState, useContext, useEffect } from 'react';
import Filter from '../../Components/Filter/Filter';
import UserCardsComp from '../../Components/UserCardsComp/UserCardsComp';
import { MyContext } from '../../state/MyContext';
import './Professionals.css';

export const Professionals: React.FC = () => {
    const { personCardsArr } = useContext(MyContext);
    const [filteredCards, setFilteredCards] = useState(personCardsArr);

    useEffect(() => {
        // Initialize filteredCards with all users
        setFilteredCards(personCardsArr);
    }, [personCardsArr]);

    const handleApplyFilter = (filters: { ezor: string; gender: string }) => {
        const filtered = personCardsArr.filter((person) => {
            return (
                (filters.ezor ? person.ezor === filters.ezor : true) &&
                (filters.gender ? person.gender === filters.gender : true)
            );
        });
        setFilteredCards(filtered);
    };

    return (
        <div className="professionals-page">
            <Filter onApplyFilter={handleApplyFilter} />
            <UserCardsComp cards={filteredCards} />
        </div>
    );
};

export default Professionals;
