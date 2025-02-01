import { useContext, useState } from 'react';
import './Register.css';
import arrForEzoremItems from '../../ArraryFiles/EzoremArr';
import { MyContext } from '../../state/MyContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const { setRegisteringPerson, setIsLoggedIn, setToken, loggedInUserId, setLoggedInUserId } = useContext(MyContext);
    const navigate = useNavigate();

    const [registerFormData, setRegisterFormData] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        gender: "",
        cardDescription: "",
        ezor: "",
        password: "",
        sogeTipul: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fieldName: string) => {
        e.preventDefault();
        console.log(e.target.value);

        const value = e.target.type === "file" ? (e.target as HTMLInputElement).files?.[0] || null : e.target.value;
        setRegisterFormData({ ...registerFormData, [fieldName]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Set the context with the form data
            setRegisteringPerson(registerFormData);

            // Send data to the backend using fetch
            const response = await fetch("http://localhost:3001/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerFormData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration response:", data); // Debugging response from backend
                setSuccess("Registration successful!");

                // Save the token to localStorage or sessionStorage
                localStorage.setItem('userToken', data.token); // Assuming the token is returned in 'data.token'
                localStorage.setItem("userId", String(data.id));

                // Update the context to reflect the user is logged in
                setIsLoggedIn(true);

                setToken(data.token);
                setLoggedInUserId(data.id);

                // Redirect to the user's profile
                navigate(`profile/${loggedInUserId}`);

            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to register. Please try again.");
            }
        } catch (err) {
            setError("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='formParent'>
                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="fname">שם פרטי</label>
                        <input type="text" onChange={(e) => { handleInputChange(e, "fname") }} placeholder={"first name"} required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="lname">שם משפחה</label>
                        <input type="text" onChange={(e) => { handleInputChange(e, "lname") }} placeholder={"last name"} required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="phone">מס טלפון</label>
                        <input type="text" onChange={(e) => { handleInputChange(e, "phone") }} placeholder={"phone"} required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="email">אימייל</label>
                        <input type="text" onChange={(e) => { handleInputChange(e, "email") }} placeholder={"email"} required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="gender">מין</label>
                        <select onChange={(e) => { handleInputChange(e, "gender") }} required>
                            <option value="" disabled selected>בחר מין</option>
                            <option value="female">נקבה</option>
                            <option value="male">זכר</option>
                        </select>
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="ezor">איזור</label>
                        <select onChange={(e) => { handleInputChange(e, "ezor") }} required>
                            <option value="" disabled selected>בחר איזור</option>
                            {arrForEzoremItems.map((ezor, index) => (
                                <option key={index} value={ezor}>
                                    {ezor}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="sogeTipul">סוגי הטיפול</label>
                        <select onChange={(e) => { handleInputChange(e, "sogeTipul") }} required>
                            <option value="" disabled selected>בחר סוגי הטיפול</option>
                            <option value="CBT">CBT</option>
                            <option value="tipulPse5ology">טיפול פסיכולוגי</option>
                            <option value="ev7onem">אבחונים</option>
                        </select>
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="cardDescription">תיאור קצר</label>
                        <input type="text" onChange={(e) => { handleInputChange(e, "cardDescription") }} placeholder={"cardDescription"} required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="password">סיסמה</label>
                        <input type="password" onChange={(e) => { handleInputChange(e, "password") }} placeholder={"password"} required />
                    </div>

                    <input className='submitButton' type="submit" value="Submit" />

                    {/* Display success or error message */}
                    {success && <p className="successMessage">{success}</p>}
                    {error && <p className="errorMessage">{error}</p>}
                    {loading && <p>Loading...</p>} {/* You can replace this with a loading spinner */}
                </div>
            </form>
        </div>
    );
};

export default Register;
