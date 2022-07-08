import React from "react";
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
    NativeBaseProvider,
    Button,
    Icon, useClipboard
} from "native-base";

import {StyleSheet} from "react-native";

import {AntDesign, FontAwesome} from '@expo/vector-icons';


const InstCard = (props) => {


    const getImage = () => {
        switch (props.id) {
            case "1":
                return require('../assets/map1.png');
            case "2":
                return require('../assets/loc1.jpg');
            case "3":
                return require('../assets/map2.png');
            case "4":
                return require('../assets/map3.png');
            case "5":
                return require('../assets/map4.png');
            case "6":
                return require('../assets/map5.png');
            default:
                return require('../assets/mapNoImage.png');
        }
    }

    return <Box alignItems="center" mt={7} elevation={3}>
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}
             style={styles.elevation}
        >
            <Box>
                <AspectRatio w="100%">
                    <Image resizeMode={"cover"} w="100%" height="100%" source={
                        getImage()
                    } alt="image"/>
                </AspectRatio>
                <Center bg="warmGray.500" _dark={{
                    bg: "violet.400"
                }} _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs"
                }} position="absolute" bottom="0" px="1.5" py="1.5" flexDirection="row">
                    <AntDesign name="star" size={24} color="#F5D020"/>
                    <Text bold color="#fff"
                          px={1.5}>{props.rating === 0 ? "Немає рейтингу" : Math.round((+props.rating + Number.EPSILON) * 100) / 100}</Text>
                </Center>
            </Box>
            <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md" ml="-1" flexWrap="nowrap" overflow="scroll">
                        {props.name}
                    </Heading>
                    <Text selectable fontSize="xs" _light={{
                        color: "violet.500"
                    }} _dark={{
                        color: "violet.400"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                        {props.location}
                    </Text>
                    <Text>{props.address}</Text>
                </Stack>
                <HStack alignItems="center" space={4} justifyContent="center">
                    <HStack>
                        <Button
                            onPress={props.onPress}
                            endIcon={<FontAwesome name="comment-o" size={24} color="#fff"/>}
                            colorScheme="rgb(45, 44, 44)"
                            _text={{
                                color: "#ffffff",
                            }}
                            _pressed={
                                {
                                    bg: "rgb(93,93,93)"
                                }
                            }
                        >
                            Написати відгук
                        </Button>
                    </HStack>
                </HStack>
            </Stack>
        </Box>
    </Box>;
};


const styles = StyleSheet.create({
    elevation: {
        borderRadius: 15,
        elevation: 9,
        shadowColor: '#000000',
    },
});


export default InstCard;