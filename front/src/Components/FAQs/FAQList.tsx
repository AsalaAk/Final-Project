import React from 'react';
import FAQs from './FAQs';

const FAQList: React.FC = () => {

    const faqs: { question: string; answer: string }[] = [
        { question: 'מי אנחנו?', answer: 'React is a JavaScript library for building user interfaces.' },
        { question: 'What is JSX?', answer: 'JSX is a syntax extension for JavaScript that looks like XML or HTML.' },
        { question: 'What are hooks in React?', answer: 'Hooks are functions that let you use state and lifecycle methods in functional components.' },
    ];

    return (
        <div className="faq-list">
            {faqs.map((faq, index) => (
                <FAQs key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    );
};

export default FAQList;
