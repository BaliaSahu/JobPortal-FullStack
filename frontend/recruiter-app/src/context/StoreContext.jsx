import { createContext, useEffect, useState } from "react";
import { fetchRecruiterProfile } from "../service/RecruiterService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || "";
    });

    const fetchDetails = async (token) => {
        try {
            await fetchRecruiterProfile(token);
        } catch (err) {
            if (err?.status === 401) {
                toast.error("Session expired. Please login again");
                setToken("");
                navigate("/");
                return;
            }
        }
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            fetchDetails(token);
        } 
        else {
            localStorage.removeItem("token")
        }
    }, [token]);
    
    const contextValue = {
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
