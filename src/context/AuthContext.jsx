import {createContext, useState, useContext, useEffect} from 'react';
import {useLoginMutation, useRegisterAdminMutation} from "../api/authApi.js";
import {useDispatch} from "react-redux";
import {clearCredentials, setCredentials, selectCredentials} from "../reducers/authSlice.js";
import { useSelector } from 'react-redux';


const AuthContext = createContext(undefined);

export const DOCTOR_ROLE = "doctorRole"
export const PATIENT_ROLE = "doctorRole"

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



    const login = async ({username, password}) => {
        setError(null);
        try {
            const response = await loginApi({ username, password }).unwrap();

            dispatch(setCredentials({ 
                username,
                password,
                userId: response.userId, 
                role: response.isAdmin ? DOCTOR_ROLE : PATIENT_ROLE,
            }));

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
        setError(null);
    };

    const register = async (formData) => {
        setError(null);
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
                case 409:
                    setError("Такой пользователь уже существует");
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
            role: credentials.role,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
