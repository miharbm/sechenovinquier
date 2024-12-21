import {createContext, useState, useContext, useEffect} from 'react';
import {useLoginMutation, useRegisterAdminMutation} from "../api/authApi.js";
import {useDispatch} from "react-redux";
import {clearCredentials, setCredentials, selectCredentials} from "../reducers/authSlice.js";
import { useSelector } from 'react-redux';


const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const credentials = useSelector(selectCredentials);

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
    }] = useRegisterAdminMutation();


    useEffect(() => {
        setIsAuthenticated(credentials.username && credentials.password && credentials.userId);
    }, [credentials]);

    useEffect(() => {
        setIsLoading(isLoadingRegister || isLoadingLogin)
    }, [isLoadingLogin, isLoadingRegister])

    useEffect(() => {
        const savedCredentials = localStorage.getItem('authCredentials');
        if (savedCredentials) {
            try {
                const parsedCredentials = JSON.parse(savedCredentials);
                dispatch(setCredentials(parsedCredentials));
            } catch (error) {
                console.error("Ошибка при парсинге данных из localStorage:", error);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (credentials.username && credentials.password && credentials.userId) {
            localStorage.setItem('authCredentials', JSON.stringify(credentials));
        } else {
            localStorage.removeItem('authCredentials');
        }
    }, [credentials]);




    const login = async ({username, password}) => {

        try {
            const response = await loginApi({ username, password }).unwrap();

            dispatch(setCredentials({ username, password, userId: response.userId }));

            setError(null);
        } catch (error) {
            setError(error);
            console.error("Ошибка входа:", error);
        }
    };

    const logout = () => {
        dispatch(clearCredentials());
        setError(null);
    };

    const register = async (formData) => {

        try {
            await registerApi(formData).unwrap();
            await login({
                username: formData.username,
                password: formData.password,
            });
        } catch (error) {
            setError(error);
            console.error("Ошибка регистрации:", error);
        }
    }


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login,
            logout,
            register,
            error,
            isLoading,
            username: credentials.username
        }}>
            {children}
        </AuthContext.Provider>
    );
};
