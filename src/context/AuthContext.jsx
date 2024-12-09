import {createContext, useState, useContext, useEffect} from 'react';
import {useLoginMutation, useRegisterMutation} from "../api/authApi.js";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const initialCredentials = {username: null, password: null, userId: null}
    const [credentials, setCredentials] = useState(initialCredentials);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log("isAuthenticated", isAuthenticated);
    console.log("credentials", credentials);


    const [loginApi, {
        isLoadingLogin,
    }] = useLoginMutation();

    const [registerApi, {
        isLoadingRegister,
    }] = useRegisterMutation();


    useEffect(() => {
        setIsAuthenticated(credentials.username && credentials.password && credentials.userId);
    }, [credentials]);

    useEffect(() => {
        setIsLoading(isLoadingRegister + isLoadingLogin)
    }, [isLoadingLogin, isLoadingRegister])



    const login = async ({username, password}) => {

        try {
            const response = await loginApi({ username, password }).unwrap();
            console.log(response)

            setCredentials({
                username,
                password,
                userId: response.userId,
            });

            setError(null);
        } catch (error) {
            setError(error);
            console.error("Ошибка входа:", error);
        }
    };

    const logout = () => {
        setCredentials(initialCredentials);
        setError(null);
    };

    const register = async (formData) => {

        try {
            await registerApi(formData).unwrap();
            console.log("taktaktak")
            await login({
                username: formData.username,
                password: formData.password,
            });
        } catch (error) {
            setError(error); // Установка ошибки
            console.error("Ошибка регистрации:", error);
        }
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register, error, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
