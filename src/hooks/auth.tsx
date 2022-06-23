import { api } from "@services/api";
import { createContext, useState, ReactNode } from "react";

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
    signIn(credentials: SignInCredentials): Promise<void>;
};

interface AuthProviderProps {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<AuthState>({} as AuthState);
};

async function singIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', {
        email,
        password,
    });

    console.log(response.data);

}