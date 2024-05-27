import React, { useEffect, useState } from 'react';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import SignIn from '@auth/screens/SignIn';
import SignUp from '@auth/screens/SignUp';
import Transactions from '@transactions/screens/Transactions';
import TransactionDetails from '@transactions/screens/TransactionDetails';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type Routes = {
  signIn: undefined;
  signUp: undefined;
  transactions: undefined;
  details: { id: number; };
}

export type RouteParamList = StackNavigationProp<Routes>;

type RouteMap = {
  name: keyof Routes;
  screen: React.ComponentType;
  title?: string;
}

const authStack: RouteMap[] = [
  { 
    name: 'signIn',
    screen: SignIn,
    title: 'signin.bar.title',
  },
  { name: 'signUp',
    screen: SignUp,
    title: 'signup.bar.title',
  },
];

const transactionStack: RouteMap[] = [
  {
    name: 'transactions',
    screen: Transactions,
    title: 'transactions.bar.title',
  },
  { 
    name: 'details',
    screen: TransactionDetails,
    title: 'details.bar.title',
  },
];

const { Navigator, Screen } = createStackNavigator();

export const MainStack = () => {
  const [ user, setUser ] = useState<FirebaseAuthTypes.User | null>();
  const stack = user ? transactionStack : authStack;

  useEffect(() => {
    return auth().onAuthStateChanged(u => {
      console.log(`[MainStack] user ${u?.displayName} ${u?.email} ${u?.photoURL}`);
      setUser(u);
    });
  }, []);

  return (
    <Navigator screenOptions={{
      title: '',
      headerTintColor: 'black',
    }}>
      {stack.map(({name, screen}) => (
        <Screen key={name} name={name} component={screen} />
      ))}
    </Navigator>
  );
};