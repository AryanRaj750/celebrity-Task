import { createContext, useState, useContext } from 'react';

export const userContext = createContext({
    user: { name: "Login", userType: "", loginStatus: false },
    login: () => { },
    logout: () => { }
})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({user: { name: "Login", userType: "", loginStatus: false } });

    function login(name, userType, loginStatus) {
        setUser({user: { name, userType, loginStatus } })
    }
    function logout() {
        setUser({user: { name: "Login", userType: "", loginStatus: false } })
    }
    return (<userContext.Provider value={{ user, login, logout}} >
        {children}
    </userContext.Provider>
    );
}
export function useUserContext (){
    const {user, login, logout } = useContext(userContext);

    return { user, login, logout }
}