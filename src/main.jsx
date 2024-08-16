import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserContext from './context/UserContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

      <UserContext>
        <GoogleOAuthProvider clientId='978477691213-r9121h0kt0cr1vsgifmplolm9iv47lg3.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </UserContext>

)
