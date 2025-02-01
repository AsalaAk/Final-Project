import './Login.css';
import React, { useState, useContext } from "react";
import { MyContext } from "../../state/MyContext"; // Import the context
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setIsLoggedIn, setToken, setLoggedInUserId } = useContext(MyContext); // Access the context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:3001/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Login Response:", data); // Debugging

            if (response.ok) {
                // Store token and user ID in localStorage
                localStorage.setItem("userToken", data.token);
                localStorage.setItem("userId", String(data.id));

                // Update React context
                setIsLoggedIn(true);
                setToken(data.token);
                setLoggedInUserId(data.id);

                setMessage("Login successful!");

                // Redirect user to their profile
                navigate(`/profile/${data.id}`);
            } else {
                setMessage(data.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("An error occurred.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
