import React from 'react';
import {Box, Button, Center, IconButton, Image, ScrollView, Stack, Text, View} from "native-base";
import AddEmployeeForm from "../components/AddEmployeeForm";
import {MaterialIcons} from "@expo/vector-icons";
import {SvgEmployeeAvatar} from "../components/Svg";

const AddEmployee = ({props, setEmployees, employees}) => {

    console.log(props)
    return (
        <ScrollView>
            <View>
                <AddEmployeeForm employees={employees} setEmployees={setEmployees}/>
                <Stack w="75%" maxW="400px" mx="auto" mt={10} pb={5}>
                    {
                        employees.map((e, i) => {
                            return (
                                <Box key={`${e.lastName}${i}`} bgColor="#919FA7" p={3} flexDirection="row" mt={5} borderRadius={18} alignItems="center">
                                    <Box borderRadius={50} bg="#fff" overflow="hidden" p={2} mr={3}>
                                        <SvgEmployeeAvatar/>
                                    </Box>
                                    <Box w="75%" pr={5}>
                                        <Text bold fontSize={16}>{`${e.lastName} ${e.firstName} ${e.midName}`}</Text>
                                        <Text>{e.position}</Text>
                                    </Box>
                                    <Center position="absolute" top="1" right="1" px="1.5" py="1.5" flexDirection="row">

                                        <IconButton size="sm" variant="ghost" _icon={{
                                            as: MaterialIcons,
                                            name: "highlight-remove",
                                            size: 8,
                                            color: "#FD6F71",

                                        }} onPress={() => {
                                            let filteredEmployees = employees.filter((emp, ind) => ind !== i);
                                            setEmployees(filteredEmployees)
                                        }}
                                                    _pressed={{
                                                        bg: "rgba(225,144,158,0.42)"
                                                    }}
                                                    p={0}
                                        />

                                    </Center>
                                </Box>
                            )
                        })
                    }
                </Stack>
            </View>
        </ScrollView>
    );
};

export default AddEmployee;