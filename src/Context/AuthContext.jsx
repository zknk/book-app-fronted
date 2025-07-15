import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,signInWithPopup ,signOut,signInWithEmailAndPassword} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config"; // Adjust the import path as necessary

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const googleProvider = new GoogleAuthProvider;

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = async (email, password) => {
        return signInWithEmailAndPassword(auth,email, password);
    }

    const logoutUser = async () => {
        return signOut(auth);
    }
    const signWithGoogle = async () => {
        return  await signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            if(user){
                const {email, displayName, photoURL, uid} = user;

                const userData = {
                    email,username: displayName,
                    photoURL, uid
                }
            }
        });
        return unsubscribe;
    }, []);


    //sign in and sign out functions can be added here

    const value = {
        currentUser,
        registerUser,
        loginUser,
        signWithGoogle,
        logoutUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
