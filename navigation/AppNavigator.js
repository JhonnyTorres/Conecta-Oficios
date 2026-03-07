import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../src/screens/SplashScreen';
import { RegisterScreen } from '../src/screens/auth/RegisterScreen';
import { LoginScreen } from '../src/screens/auth/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const profileStack = createNativeStackNavigator();

const TabNavigator = () => {
    const { user } = useAuth();
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={({ route })} => ({
            TabBarIcon: ({ color, size, focused }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                } else if (route.name === 'user') {
                    iconName = focused ? 'person' : 'person-outline';
                }
            }
        }) >

        </Tab.Navigator >    
    )
}

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}

const AppNavigator = () => {
    const [user, setUser] = useState(null);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authContextValue = {
        user,
        setUser,
        isloading,
        setIsLoading,
    };

    if (isloading) {
        return <SplashScreen />; //el null se reemplazara por el splash screen
    }
    return (
        <AuthContext.Provider value={authContextValue}>
            <Stack.Navigator initialRouteName="">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}