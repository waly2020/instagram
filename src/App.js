import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExport from './aws-exports';
import { useDispatch } from 'react-redux';
import { login } from './setup/redux/authSlices';
import { fetchUserAttributes} from 'aws-amplify/auth';
Amplify.configure(awsExport);

const App = ({ signOut, user }) => {
  const dispatcher = useDispatch();
  fetchUserAttributes().then(userAttributes =>{
    dispatcher(login({userId : user.userId,...userAttributes}));
  }).catch(err =>{
    console.log("User logOut");
  })
  return (
    <>
    <button onClick={signOut}>log out</button>
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </>
  );
};

export default withAuthenticator(App);
