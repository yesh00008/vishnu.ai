# Firebase Console Setup Instructions

## Google Sign-In is currently failing because you need to configure Firebase Console

### Steps to Fix the Authentication:

#### 1. **Enable Google Sign-In Method**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project: `studio-536841832-18886`
   - Navigate to **Authentication** → **Sign-in method**
   - Click on **Google** in the providers list
   - Toggle **Enable**
   - Add your support email
   - Click **Save**

#### 2. **Add Authorized Domains**
   - In Firebase Console → **Authentication** → **Settings** tab
   - Scroll to **Authorized domains**
   - Add these domains:
     - `localhost` (for development)
     - Your production domain (e.g., `vishnu-ai.com`)
   - Click **Add domain**

#### 3. **Configure OAuth Consent Screen (Google Cloud Console)**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project
   - Navigate to **APIs & Services** → **OAuth consent screen**
   - Configure:
     - User Type: **External** (for public access)
     - App name: `Vishnu AI`
     - User support email: Your email
     - Authorized domains: Add your domains
     - Developer contact: Your email
   - Save and Continue

#### 4. **Test the Authentication**
   After completing the above steps:
   - Run `npm run dev`
   - Go to `http://localhost:5173/signin` or `/signup`
   - Click "Continue with Google"
   - Should open Google Sign-In popup successfully
   - After authentication, you'll be redirected to home page

---

## Current Implementation Features:

✅ **Firebase SDK Installed** - All Firebase dependencies configured  
✅ **Google Sign-In with Popup** - Primary authentication method  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Shows "Signing in..." during authentication  
✅ **Auto Redirect** - Navigates to home page after successful login  
✅ **Database Storage** - User data saved to Firebase Realtime Database  
✅ **Redirect Fallback** - Alternative auth method if popups are blocked  

---

## Troubleshooting:

### If you still get "Failed to sign in with Google":

1. **Check Browser Console** for specific error codes:
   - `auth/popup-blocked` → Allow popups in browser settings
   - `auth/unauthorized-domain` → Add domain to authorized list
   - `auth/configuration-not-found` → Enable Google provider in Firebase Console

2. **Clear Firebase Auth State**:
   ```bash
   # Open browser console and run:
   localStorage.clear();
   sessionStorage.clear();
   ```

3. **Verify Firebase Config** in `src/services/firebase.ts`:
   - API Key: `AIzaSyBqhDloOfJAc-iiVSp27K6MU7FpBAtqCgY`
   - Auth Domain: `studio-536841832-18886.firebaseapp.com`
   - Project ID: `studio-536841832-18886`

4. **Test with Different Browser**:
   - Try Chrome Incognito mode
   - Disable browser extensions that might block popups

---

## Next Steps After Authentication Works:

1. **Add User Profile Display** - Show logged-in user info in navbar
2. **Protected Routes** - Restrict certain pages to authenticated users only
3. **Sign Out Button** - Add logout functionality
4. **User Dashboard** - Create personalized user experience
5. **Email/Password Auth** - Implement traditional email/password login

---

## Development Server:

```bash
# Run the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Firebase Console Links:

- **Project Console**: https://console.firebase.google.com/project/studio-536841832-18886
- **Authentication**: https://console.firebase.google.com/project/studio-536841832-18886/authentication
- **Database**: https://console.firebase.google.com/project/studio-536841832-18886/database

---

**Note**: Make sure you're logged into Google with the account that has access to this Firebase project!
