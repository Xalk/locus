import React from 'react';
import { TouchableOpacity, View} from "react-native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {AntDesign, Entypo, Feather} from "@expo/vector-icons";
import AddInstitution from "../pages/AddInstitution";
import {SvgLogo} from "./Svg";
import Home from "../pages/Home";

import {AlertDialog, Image, Text, Button} from "native-base";


const CustomDrawer = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                        backgroundColor: '#f6f6f6',
                        marginBottom: 20,
                    }}>
                    <Image
                        source={require('./../assets/ava.png')}
                        style={{width: 80, height: 80, borderRadius: 30}} alt="ava"
                    />
                    <View style={{padding:10}}>
                        <Text flexWrap="wrap" w="150">Василина Василівна Василенко</Text>
                        <Text fontSize={12}>vavava@gmail.com</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 50,
                    backgroundColor: '#f6f6f6',
                    padding: 20,
                }}
                onPress={() => setIsOpen(!isOpen)}

            >
                <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <AntDesign name="exclamationcircleo" size={24} color="black"/>
                    <Text style={{marginLeft: 30}}>About</Text>
                </View>
            </TouchableOpacity>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Про нас</AlertDialog.Header>
                    <AlertDialog.Body alignSelf="flex-end">
                        У сучасному світі все більше стає різних установ у яких наймають різних працівників,
                        які не завжди ставляться до своєї роботи належним чином. Люди завжди зацікавлені в
                        якісній роботі працівників різних установ, завжди придивляються де все можна зробити
                        якнайшвидше, скрізь шукають через знайомих різних людей, які б змогли їм все це
                        зробити. Наша команда поставила перед собою мету зібрати воєдино всі необхідні
                        функції для контролю якості обслуговування робітників державних установ, щоб для
                        кожна людина змогла оцінити роботу працівників та тим самим покращити роботу на
                        цих установах, і щоб це все не займало багато часу.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                               OK
                            </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </View>
    );
};


const Drawer = createDrawerNavigator();


function MyDrawer() {

    return (
        <Drawer.Navigator
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#F5F5F5',
                },
                headerTintColor: "#fff",
                drawerInactiveTintColor: "#888888",
            }}
        >
            <Drawer.Screen name="Locus" component={Home}
                           options={({navigation}) => ({
                               headerRight: () => (
                                   <SvgLogo style={{marginRight: 30}}/>
                               ),
                               drawerIcon: ({focused, size}) => (
                                   <Entypo name="home" size={24} color="black"/>
                               ),
                               drawerLabel: 'Home'
                           })}
            />

            <Drawer.Screen
                name="Add Institution"
                component={AddInstitution}
                options={
                    {
                        drawerIcon: ({focused, size}) => (
                            <Entypo name="plus" size={24} color="black"/>
                        ),
                        drawerLabel: 'Add'

                    }
                }


            />
            <Drawer.Screen
                name="Settings"
                component={Home}
                options={
                    {
                        drawerIcon: ({focused, size}) => (
                            <Feather name="settings" size={24} color="black"/>
                        )
                    }
                }
            />


            <Drawer.Screen
                name="Log Out"
                component={Home}
                options={
                    {
                        drawerIcon: ({focused, size}) => (
                            <Feather name="log-out" size={24} color="black"/>
                        )
                    }
                }
            />

        </Drawer.Navigator>
    );
}


export default MyDrawer;