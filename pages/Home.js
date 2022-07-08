import React, {useEffect, useRef, useState} from 'react';

import {Box, Button, Center, Icon, IconButton, Input, Slider, Spinner, Text, View} from "native-base";
import {ScrollView, TVParallaxProperties} from "react-native";


import {Entypo, FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {SvgFilterIcon} from "../components/Svg";
import InstCard from "../components/InstCard";
import OrgFeedback from "./OrgFeedback";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomScreenHeader from "../components/CustomScreenHeader";
import EmplFeedback from "./EmplFeedback";
import {API} from "../api";
import {useIsFocused} from "@react-navigation/native";

import RBSheet from "react-native-raw-bottom-sheet";

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import AddInstitutionNavigationWrapper from "./AddInstitution";
import AddEmployee from "./AddEmployee";

function Home(props) {

    const [institution, setInstitution] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isFocused = useIsFocused()
    console.log("isFocused",isFocused)

    useEffect(() => {

        // setIsLoading(true)

        API.getInstitutions().then((data) => {
            setInstitution(data);
            setIsLoading(false)
        })

    }, [isFocused])

    const refRBSheet = useRef();

    const [onValuesChangeFinish, setOnValuesChangeFinish] = useState([0, 5]);
    const [onValuesChangeFinishDistance, setonValuesChangeFinishDistance] = useState([0, 20]);

    const resetFilterHandler = () => {
        setOnValuesChangeFinish([0, 5])
        setonValuesChangeFinishDistance([0, 20])
    }

    return (


        <>
            {
                isLoading ? <Center position="absolute" top="50%" left="46%"><Spinner size="lg"/></Center> :
                    <ScrollView>


                        <View style={{
                            flex: 1,
                            padding: 25
                        }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: 1,
                                    padding: 7
                                }}
                            >
                                <IconButton size="sm" variant="ghost" _icon={{
                                    as: FontAwesome,
                                    name: "sliders",
                                    size: 7,
                                    color: "#000",

                                }} onPress={() => refRBSheet.current.open()}
                                            _pressed={{
                                                bg: "rgba(108,108,108,0.13)",
                                                rounded: 100
                                            }}
                                            p={2}
                                />
                                <IconButton size="sm" variant="ghost" _icon={{
                                    as: MaterialIcons ,
                                    name: "gps-fixed",
                                    size: 7,
                                    color: "#000",

                                }} onPress={() => console.log("gps-fixed")}
                                            _pressed={{
                                                bg: "rgba(108,108,108,0.13)",
                                                rounded: 100
                                            }}
                                            p={2}
                                />
                            </View>

                            {
                                institution
                                    .filter(el => (onValuesChangeFinish[0] <= +el.rating && +el.rating <= onValuesChangeFinish[1]) && (onValuesChangeFinishDistance[0] <= +el.distance && +el.distance <= onValuesChangeFinishDistance[1]))
                                    .map((inst) => {
                                        return (
                                            <InstCard key={inst.id}
                                                      onPress={() => props.navigation.navigate('OrgFeedback', {
                                                          institutionId: inst.id,
                                                      })}
                                                      {...inst}

                                            />
                                        )
                                    })
                            }


                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#000"
                                }}
                            >

                                <RBSheet
                                    ref={refRBSheet}
                                    closeOnDragDown={false}
                                    closeOnPressMask={true}
                                    closeOnPressBack={true}
                                    customStyles={{
                                        wrapper: {
                                            backgroundColor: "rgba(0,0,0,0.24)"
                                        },
                                        draggableIcon: {
                                            backgroundColor: "#000"
                                        }
                                    }}
                                    animationType="slide"
                                    height={380}
                                >
                                    <View w="75%" maxW="400px" mx="auto" mt={5} pb={5}>

                                        <Box>


                                            <Text fontSize={16}>Рейтинг:</Text>
                                            <MultiSlider
                                                values={[onValuesChangeFinish[0], onValuesChangeFinish[1]]}

                                                onValuesChangeFinish={(v) => setOnValuesChangeFinish(v)}
                                                min={0}
                                                max={5}
                                                step={0.5}

                                                snapped

                                                selectedStyle={{
                                                    backgroundColor: "#000"
                                                }}
                                                markerStyle={{
                                                    backgroundColor: "#000"
                                                }}
                                            />

                                            <Box alignItems="center" flexDirection="row" justifyContent="space-between">
                                                <Box alignItems="center" flexDirection="row">
                                                    <Text fontSize={16} pr={2}>Від:</Text>
                                                    <Box borderColor="#4848483C" borderWidth={1} p={2} w="10"
                                                         rounded={7}
                                                         justifyContent="center">
                                                        <Text fontSize={14}
                                                              color="#4848483C">{onValuesChangeFinish[0]}</Text>
                                                    </Box>
                                                </Box>
                                                <Box alignItems="center" flexDirection="row">
                                                    <Text fontSize={16} pr={2}>До:</Text>
                                                    <Box borderColor="#4848483C" borderWidth={1} p={2} w="10"
                                                         rounded={7}
                                                         justifyContent="center">
                                                        <Text fontSize={14}
                                                              color="#4848483C">{onValuesChangeFinish[1]}</Text>
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>


                                        <Box mt={8}>


                                            <Text fontSize={16}>Відстань:</Text>
                                            <MultiSlider
                                                values={[onValuesChangeFinishDistance[0], onValuesChangeFinishDistance[1]]}

                                                onValuesChangeFinish={(v) => setonValuesChangeFinishDistance(v)}
                                                min={0}
                                                max={20}
                                                step={0.5}


                                                selectedStyle={{
                                                    backgroundColor: "#000"
                                                }}
                                                markerStyle={{
                                                    backgroundColor: "#000"
                                                }}
                                            />

                                            <Box alignItems="center" flexDirection="row" justifyContent="space-between">
                                                <Box alignItems="center" flexDirection="row">
                                                    <Text fontSize={16} pr={2}>Від:</Text>
                                                    <Box borderColor="#4848483C" borderWidth={1} p={2} w="10"
                                                         rounded={7}
                                                         justifyContent="center">
                                                        <Text fontSize={14}
                                                              color="#4848483C">{onValuesChangeFinishDistance[0]}</Text>

                                                    </Box>
                                                    <Text fontSize={16} pl={2}>км</Text>
                                                </Box>
                                                <Box alignItems="center" flexDirection="row">
                                                    <Text fontSize={16} pr={2}>До:</Text>
                                                    <Box borderColor="#4848483C" borderWidth={1} p={2} w="10"
                                                         rounded={7}
                                                         justifyContent="center">
                                                        <Text fontSize={14}
                                                              color="#4848483C">{onValuesChangeFinishDistance[1]}</Text>
                                                    </Box>
                                                    <Text fontSize={16} pl={2}>км</Text>
                                                </Box>

                                            </Box>
                                        </Box>

                                        <Button
                                            mt={10}
                                            rounded={0}
                                            bgColor="#000"
                                            _pressed={{
                                                bg: "rgba(45,44,44,0.34)"
                                            }}
                                        >
                                            <Text bold color="#fff" onPress={resetFilterHandler}>
                                                Скинути
                                                всі
                                                фільтри
                                            </Text>
                                        </Button>
                                    </View>


                                </RBSheet>
                            </View>

                        </View>
                    </ScrollView>
            }
        </>
    );
}

const Stack = createNativeStackNavigator();

export default function HomeNavigationWrapper(props) {





    return (
        <Stack.Navigator screenOptions={{
            headerShown: true,
        }}

        >
            <Stack.Screen name="Welcome" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="OrgFeedback" component={OrgFeedback}
                          options={
                              {
                                  header: (props) =>
                                      (
                                          <CustomScreenHeader props={props} goTo={"Welcome"}/>
                                      ),
                              }
                          }
            />
            <Stack.Screen name="EmplFeedback" component={EmplFeedback}
                          options={
                              {
                                  header: (props) =>
                                      (
                                          <CustomScreenHeader props={props} goTo={"OrgFeedback"} isBack={true}/>
                                      ),
                              }
                          }
            />


            <Stack.Screen name="EditInst" options={
                {
                    header: (props) =>
                        (
                            <CustomScreenHeader props={props} goTo={"OrgFeedback"} isBack={true}/>
                        ),

                }

            }>
                {props => <AddInstitutionNavigationWrapper props ={props} isEdit={true}/>}
            </Stack.Screen>


        </Stack.Navigator>

    );
}
