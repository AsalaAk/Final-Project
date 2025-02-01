import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { CardItems, FormItems } from "../types";


// ---------------- PART 1 ----------------
interface cntxVals {

    isLoggedIn: boolean;
    token: string | null;
    loggedInUserId: number | null;
    userInfo: {
        fname: string;
        lname: string;
        email: string;
        gender: string;
        ezor: string;
        cardDescription: string;
        phone: string;
    } | null;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    setToken: (token: string | null) => void;
    setLoggedInUserId: (id: number | null) => void;
    setUserInfo: (userInfo: any) => void;


    registeringPerson: FormItems; //the type Person we already created in types.ts
    setRegisteringPerson: Dispatch<SetStateAction<FormItems>>;

    personCardsArr: CardItems[];

}

// ---------------- PART 2 ----------------

export const MyContext = createContext<cntxVals>(
    {
        isLoggedIn: false,
        token: null,
        loggedInUserId: null,
        userInfo: null,
        setIsLoggedIn: () => { },
        setToken: () => { },
        setLoggedInUserId: () => { },
        setUserInfo: () => { },

        registeringPerson: {
            fname: "NA",
            lname: "NA",
            phone: "NA",
            email: "NA",
            gender: "NA",
            cardDescription: "NA",
            ezor: "NA",
            password: "NA",
            sogeTipul: "NA",
        },
        setRegisteringPerson: () => { },

        personCardsArr: [],
    },
);

// ---------------- PART 3 ----------------

export const MyContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);

    const [registeringPerson, setRegisteringPerson] = useState<FormItems>(
        {
            fname: "NOTHING",
            lname: "NOTHING",
            phone: "NOTHING",
            email: "NOTHING",
            gender: "NOTHING",
            cardDescription: "NOTHING",
            ezor: "NOTHING",
            password: "NOTHING",
            sogeTipul: "NOTHING",
        }
    );
    const [personCardsArr, setPersonCardsdArr] = useState<CardItems[]>([]);


    // Check if the user is already logged in based on token stored in localStorage
    // useEffect(() => {
    //     const token = localStorage.getItem('userToken');
    //     if (token) {
    //         setIsLoggedIn(true);  // If token exists, set user as logged in
    //     }
    // }, []);
    useEffect(() => {
        const storedToken = localStorage.getItem("userToken");
        const storedId = localStorage.getItem("userId");

        if (storedToken && storedId) {
            setIsLoggedIn(true);
            setToken(storedToken);
            setLoggedInUserId(parseInt(storedId, 10));
        }
    }, []);



    // fetch for person card data. this may need some upgrading, come back to it later
    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const response = await fetch("http://localhost:3001/users/persons");
                if (response.ok) {
                    const data = await response.json();
                    setPersonCardsdArr(data);
                } else {
                    console.error("Failed to fetch users");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchPersons();
    }, []);




    // return אחרי שיצרנו את הזכרון האמיתי שיחזיק את הדאטה, אנחנו עושים  
    let theVals = { isLoggedIn, setIsLoggedIn, token, setToken, loggedInUserId, setLoggedInUserId, userInfo, setUserInfo, registeringPerson, setRegisteringPerson, personCardsArr }
    return (
        <MyContext.Provider value={theVals}>
            {children}
        </MyContext.Provider>
    )
}

