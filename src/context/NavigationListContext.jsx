import {createContext, useContext} from "react";

export const NavigationListContext = createContext(undefined);

export const NavigationListProvider = ({ children, navigation }) => {
    return (
        <NavigationListContext.Provider value={navigation}>
            {children}
        </NavigationListContext.Provider>
    );
};

export const useNavigationList = () => useContext(NavigationListContext);