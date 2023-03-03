import React from 'react';

export const authContext = {
    authKey: null,
    user: null,
    isAuthenticated: null
}

export const GlobalContext = React.createContext({
    authContext,
    updateContext: () => {}
});