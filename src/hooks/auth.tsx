import { api } from "@services/api";
import { createContext, useState, ReactNode, useContext } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    driver_license: string;
    avatar: string;
};

interface AuthState {
    token: string;
    user: User;
};

interface SignInCredentials {
    email: string;
    password: string;
};

interface AuthContextData {
    user: User;
    signIn: (credentials: SignInCredentials) => Promise<void>
};

interface AuthProviderProps {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<AuthState>({} as AuthState);

    async function signIn({ email, password }: SignInCredentials) {
        
        try {
            const response = await api.post('/sessions', {
                email,
                password,
            });   

            const { token, user } = response.data;
            setData({ token, user });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        } catch (error) {
            console.log(error);
        };
    };

    return (
        <AuthContext.Provider 
            value={{
                 user: data.user,
                 signIn
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

function useAuth(){
    const context = useContext(AuthContext);
    return context;
};

export {
    AuthProvider,
    useAuth
}