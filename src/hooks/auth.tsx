import { api } from "@services/api";
import { createContext, useState, ReactNode, useContext } from "react";
import { database } from '../database'
import { User as ModelUser } from '../database/model/User'

interface User {
    id: string;
    user_id: string;
    name: string;
    email: string;
    driver_license: string;
    avatar: string;
    token: string;
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
    const [data, setData] = useState<User>({} as User);

    async function signIn({ email, password }: SignInCredentials) {
        
        try {
            const response = await api.post('/sessions', {
                email,
                password,
            });   

            const { token, user } = response.data;
            setData({ ...user, token })

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userCollection = database.get<ModelUser>('users')
            await database.write(async () => {
                await userCollection.create((newUser) => {
                    newUser.user_id = user.id,
                        newUser.name = user.name,
                        newUser.email = user.email,
                        newUser.driver_license = user.driver_license,
                        newUser.avatar = user.avatar,
                        newUser.token = token
                })
            });

        } catch (error) {
            throw new Error(error);
        };
    };

    return (
        <AuthContext.Provider 
            value={{
                 user: data,
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