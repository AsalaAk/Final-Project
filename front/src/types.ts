// in this file you deifne the types. so in context you write variables and assign them types. and they can be types from this file. that's the difference between this file and the context file.

export type MenuBarItems = {
    displayStr: string;
    hrefStr: string;
};

export type FAQItemProps = {
    question: string;
    answer: string;
};

export type FormItems = {
    fname: string,
    lname: string,
    phone: string,
    email: string,
    gender: string,
    cardDescription: string,
    ezor: string,
    password: string,
    // degreefile: File | null,
    sogeTipul: string
};


export type CardItems = {
    id: number; // Add this to ensure id is properly defined
    fname: string,
    lname: string,
    gender: string,
    cardDescription: string,
    ezor: string,
};