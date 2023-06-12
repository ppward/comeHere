import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from 'firebase/auth';
import { Button } from 'react-native';

// Initialize Firebase
initializeApp({
    apiKey: "AIzaSyDKh2OlCH3rXcL_W5PokwjbazZvQunwljw",
    authDomain: "comehere-ab06a.firebaseapp.com",
    projectId: "comehere-ab06a",
    storageBucket: "comehere-ab06a.appspot.com",
    messagingSenderId: "721321240189",
    appId: "1:721321240189:web:8e3c101a06610a6bc47314",
});

WebBrowser.maybeCompleteAuthSession();

export default function AuthGoogle() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '470349536043-78amqp5f37oddj2pctmq2ps0kht3cihl.apps.googleusercontent.com',
    },
  );
  
  const auth = getAuth();

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { uid, email, displayName, accessToken } = user;
      console.log("uid :", uid)
      console.log("email :", email)
      console.log("displayName :", displayName)
      console.log("accessToken :", accessToken)
    }
  });
  
  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}