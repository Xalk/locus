import React from 'react';
import {IconButton, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";

const CustomScreenHeader = ({props, goTo, isBack=false}) => {

    console.log(goTo)
    console.log(isBack)

    return (
        <View style={{
            height: 50,
            backgroundColor: "rgb(45, 44, 44)",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft:5
        }}>

            <IconButton size="sm" variant="ghost" _icon={{
                as: AntDesign,
                name: "arrowleft",
                size: 7,
                color: "#fff",

            }} onPress={()=>isBack ? props.navigation.goBack() :props.navigation.navigate(goTo)}
                        _pressed={{
                            bg: "#888"
                        }}
            />
        </View>
    );
};

export default CustomScreenHeader;