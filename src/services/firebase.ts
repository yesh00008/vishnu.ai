// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqhDloOfJAc-iiVSp27K6MU7FpBAtqCgY",
  authDomain: "studio-536841832-18886.firebaseapp.com",
  databaseURL: "https://studio-536841832-18886-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studio-536841832-18886",
  storageBucket: "studio-536841832-18886.firebasestorage.app",
  messagingSenderId: "45911094761",
  appId: "1:45911094761:web:200a221aeab19ed76e8778"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Google Sign In with Popup
export const signInWithGoogle = async () => {
  try {
    // Clear any existing auth state
    await signOut(auth).catch(() => {});
    
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    if (!user) {
      throw new Error("No user returned from Google Sign In");
    }
    
    // Store user data in database
    try {
      await set(ref(database, 'users/' + user.uid), {
        uid: user.uid,
        name: user.displayName || 'Anonymous',
        email: user.email || '',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
    } catch (dbError) {
      console.error("Database error (non-critical):", dbError);
      // Continue even if database save fails
    }
    
    return user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    
    // Provide more specific error messages
    if (error.code === 'auth/popup-blocked') {
      throw new Error("Popup was blocked. Please allow popups for this site.");
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error("Sign in was cancelled.");
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error("This domain is not authorized. Please contact support.");
    } else {
      throw new Error(error.message || "Failed to sign in with Google");
    }
  }
};

// Alternative: Google Sign In with Redirect (for mobile/popup issues)
export const signInWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error: any) {
    console.error("Error initiating Google redirect:", error);
    throw new Error(error.message || "Failed to initiate sign in");
  }
};

// Handle redirect result
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      // Store user data in database
      await set(ref(database, 'users/' + result.user.uid), {
        uid: result.user.uid,
        name: result.user.displayName || 'Anonymous',
        email: result.user.email || '',
        photoURL: result.user.photoURL || '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Error handling redirect:", error);
    return null;
  }
};

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get User Data
export const getUserData = async (uid: string) => {
  try {
    const snapshot = await get(ref(database, 'users/' + uid));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};
