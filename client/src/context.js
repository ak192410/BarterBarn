import { createContext, useContext } from 'react';
export const AuthTokenContext = createContext(null);
export const useAuthToken = () => useContext(AuthTokenContext);