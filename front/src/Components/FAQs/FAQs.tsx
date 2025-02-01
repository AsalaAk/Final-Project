import React, { useState } from 'react';
import { FAQItemProps } from '../../types';
import './FAQs.css';


const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-item">
            <div className="question" onClick={toggleAnswer}>
                {question}
                <span className="toggle-icon">{isOpen ? '-' : '+'}</span>
            </div>
            <div
                className={`answer ${isOpen ? 'open' : ''}`}
                style={{
                    maxHeight: isOpen ? '200px' : '0',
                }}
            >
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default FAQItem;
