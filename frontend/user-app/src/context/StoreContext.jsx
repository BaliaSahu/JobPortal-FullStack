import { createContext, useEffect, useState } from "react";
import { fetchUserDetails } from "../service/UserService";
import { toast } from "react-toastify";


export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") ? localStorage.getItem("token") : "";
    })
    const loadDetails = async () => {
        try {
            const res = await fetchUserDetails(token);
        } catch (err) {
            if (err.status === 401) {
                toast.error("Session expires Please Login again");
                setToken("")
                navigate("/")
                return;
            }
        }
    }
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            loadDetails();
        }
        else {
            localStorage.removeItem("token")
        }
    }, [token])

    const logOut = () => {
        setToken("");
    }

    const contextValue = { token, setToken, logOut }

    return <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
}