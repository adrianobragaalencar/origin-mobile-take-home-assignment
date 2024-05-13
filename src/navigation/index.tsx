import React from 'react';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import SignIn from '@auth/screens/SignIn';
import SignUp from '@auth/screens/SignUp';
import Transactions from '@transactions/screens/Transactions';
import TransactionDetails from '@transactions/screens/TransactionDetails';
import { Transaction } from '@transactions/models';

export type Routes = {
  signIn: undefined;
  signUp: undefined;
  transactions: undefined;
  details: { transation: Transaction };
}

export type RouteParamList = StackNavigationProp<Routes>;

type RouteMap = {
  name: keyof Routes;
  screen: React.ComponentType<{}>;
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

let isAuthenticated = !true;

export const MainStack = () => {
  const stack = isAuthenticated ? transactionStack : authStack;
  return (
    <Navigator screenOptions={{
      title: ''
    }}>
      {stack.map(({name, screen}) => (
        <Screen key={name} name={name} component={screen} />
      ))}
    </Navigator>
  );
};