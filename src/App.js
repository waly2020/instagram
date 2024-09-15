import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExport from './aws-exports';
import { useDispatch } from 'react-redux';
import { login } from './setup/redux/authSlices';
import { fetchUserAttributes} from 'aws-amplify/auth';
import RoutesApp from './Routes/Routes';
Amplify.configure(awsExport);

const App = ({ signOut, user }) => {
  const dispatcher = useDispatch();
  fetchUserAttributes().then(userAttributes =>{
    dispatcher(login({userId : user.userId,...userAttributes}));
  }).catch(err =>{
    console.log("User logOut");
  })
  return (
    <RoutesApp/>
  );
};

export default withAuthenticator(App);
