import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

import MyDrawer from "./components/MyDrawer";


const LinearGradient = require("expo-linear-gradient").LinearGradient;


const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(96,91,91)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(45,44,44)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
        text: 'rgb(255,255,255)'
    },
};

const config = {
    dependencies: {
        "linear-gradient": LinearGradient
    }
};


export default function App() {
    return (

        <NativeBaseProvider config={config}>
            <NavigationContainer theme={MyTheme}>
                    <MyDrawer/>
            </NavigationContainer>
        </NativeBaseProvider>

    );
}

