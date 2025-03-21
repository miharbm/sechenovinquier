import {createContext, useState, useContext, useEffect} from 'react';
import {useLoginMutation, useRegisterAdminMutation} from "../api/authApi.js";
import {useDispatch} from "react-redux";
import {clearCredentials, setCredentials, selectCredentials} from "../reducers/authSlice.js";
import { useSelector } from 'react-redux';


const STORAGE_KEY = "authCredentials";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const credentials = useSelector(selectCredentials);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [loginApi, {
        isLoading: isLoadingLogin,
    }] = useLoginMutation();

    const [registerApi, {
        isLoading: isLoadingRegister,
    }] = useRegisterAdminMutation();


    useEffect(() => {
        setIsAuthenticated(Boolean(credentials.username && credentials.password && credentials.userId));
    }, [credentials]);

    useEffect(() => {
        setIsLoading(isLoadingRegister || isLoadingLogin)
    }, [isLoadingLogin, isLoadingRegister])

    useEffect(() => {
        const savedCredentials = localStorage.getItem(STORAGE_KEY);
        if (savedCredentials) {
            try {
                const parsedCredentials = JSON.parse(savedCredentials);
                dispatch(setCredentials(parsedCredentials));
            } catch (error) {
                console.error("Ошибка при парсинге данных из localStorage:", error);
            }
        }
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        if (credentials.username && credentials.password && credentials.userId) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [credentials]);


    const login = async ({username, password}) => {

        try {
            const response = await loginApi({ username, password }).unwrap();

            dispatch(setCredentials({ username, password, userId: response.userId }));

            setError(null);
        } catch (error) {
            switch (error.status) {
                case 400:
                    setError("Ошибка авторизации. Неверный логин или пароль");
                    break;
                case "FETCH_ERROR":
                    setError("Ошибка сети. Нет подключения");
                    break;
                default:
                    setError(JSON.stringify(error));
            }
            console.error("Ошибка входа:", error);
        }
    };

    const logout = () => {
        dispatch(clearCredentials());
        localStorage.removeItem(STORAGE_KEY);
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
            switch (error.status) {
                case 400:
                    setError("Ошибка регистрации");
                    break;
                case "FETCH_ERROR":
                    setError("Ошибка сети. Нет подключения");
                    break;
                default:
                    setError(JSON.stringify(error));
            }

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
            username: credentials.username,
            doctorId: credentials.userId,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
