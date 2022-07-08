import React, {useEffect, useState} from "react";
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
    Icon,
    View,
    ScrollView,
    Input,
    Pressable,
    Modal,
    FormControl,
    Slide,
    IconButton,
    Divider,
    Spinner,
    useToast,
    AlertDialog
} from "native-base";

import {AntDesign, Entypo, Feather, Ionicons, MaterialIcons} from '@expo/vector-icons';

import StarRating from 'react-native-star-rating-widget';
import {StyleSheet} from "react-native";
import {SvgEmployeeAvatar, SvgCommonAvatar} from "../components/Svg";
import {API} from "../api";
import {useIsFocused} from "@react-navigation/native";


function OrgFeedback(props) {

    let institutionId = props.route.params.institutionId;

    const [rating, setRating] = useState(0);
    const [commentRating, setCommentRating] = useState(4);
    const [selectedType, setSelectedType] = useState("comments");
    const [isOpenRight, setIsOpenRight] = useState(false);
    const [isOpenCommentRight, setIsOpenCommentRight] = useState(false);
    const [institutionInfo, setInstitutionInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [employeesList, setEmployeesList] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [showModal, setShowModal] = useState(false);

    const isFocused = useIsFocused()


    useEffect(() => {


        const fetchData = async () => {
            try {
                setIsLoading(true)
                const resInstitutionInfo = await API.getCurrentInstitution(institutionId);
                const resEmployees = await API.getCurrentEmployees(institutionId);
                const resComments = await API.getCurrentInstitutionComments();


                setIsLoading(false)


                setInstitutionInfo(resInstitutionInfo);
                setEmployeesList(resEmployees);

                let filteredComments = resComments.filter(c => +c.organizationId == +institutionId)
                setComments(filteredComments);


            } catch (e) {
                alert("Error");
                console.log(e);
            }


        }


        fetchData();


    }, [isFocused])


    const getImage = () => {
        switch (institutionId) {
            case "1":
                return require('../assets/photo2.png');
            case "2":
                return require('../assets/photo1.png');
            case "3":
                return require('../assets/photo3.png');
            case "4":
                return require('../assets/photo4.png');
            case "5":
                return require('../assets/photo5.png');
            case "6":
                return require('../assets/photo6.png');
            default:
                return require('../assets/instNoImage.png');
        }
    }

    const toast = useToast();


    const handleCommentOnPress = async () => {

        try {
            let values = {
                rating: rating,
                content: commentContent,
                organizationId: institutionId,
                user: "99"
            }

            setCommentContent("");
            setRating(0);


            let updatedRating;
            if (+institutionInfo.rating === 0) {
                updatedRating = +values.rating
            } else {

                let commentRatingNums = [...comments.map(e => Math.round(+e.rating)), +values.rating];

                let sum = commentRatingNums.reduce((a, b) => a + b, 0);

                updatedRating = sum / commentRatingNums.length;
            }

            let updateData = {rating: updatedRating}


            toast.show({
                render: () => {
                    return <Box bg="#000000BE" px="2" py="1" rounded="sm" mb={5}>
                        <Text color="#fff"> Коментарій відпралвено! Дякую :)</Text>
                    </Box>;
                },
                duration: 1700
            });

            let resData = await API.addInstitutionComment(values)

            await API.updateInstitutionRating(institutionId, updateData)

            setComments([...comments, resData])

        } catch (e) {
            console.log(e);
            alert(e);
        }


    }

    const [isOpen, setIsOpen] = React.useState(false);


    const cancelRef = React.useRef(null);

    const handleOnDelete = async () => {
        try {

            toast.show({
                render: () => {
                    return <Box bg="#000000BE" px="2" py="1" rounded="sm" mb={5}>
                        <Text color="#fff"> Установу видалено!</Text>
                    </Box>;
                },
                duration: 1700
            });

            props.navigation.navigate("Welcome")

            await API.deleteInstitution(institutionId)


        } catch (e) {
            alert(e)
            console.log(e)
        }
    }

    const onClickModalHandler = () => {
        setShowModal(false);
        toast.show({
            render: () => {
                return <Box bg="#000000BE" px="2" py="1" rounded="sm" mb={5}>
                    <Text color="#fff">Скаргу надіслано, дякуємо, що звернули увагу :)</Text>
                </Box>;
            },
            duration: 1700
        });
    }


    return (
        <>
            {
                isLoading ? <Center position="absolute" top="50%" left="46%"><Spinner size="lg"/></Center> :
                    <ScrollView>
                        <View flex={1} p={25}>
                            <View flexDirection="row" justifyContent="space-between" alignItems="center">
                                <Text fontSize={16} lineHeight={21} fontWeight={400} style={{
                                    textShadowColor: 'rgba(0, 0, 0, 0.2)',
                                    textShadowOffset: {width: -1, height: 1},
                                    textShadowRadius: 10,
                                }}

                                      width="90%"
                                >{institutionInfo.name}</Text>

                                <IconButton size="sm" variant="ghost" _icon={{
                                    as: Entypo,
                                    name: "dots-three-horizontal",
                                    size: 8,
                                    color: "#888",

                                }} onPress={() => setIsOpenRight(!isOpenRight)}
                                            _pressed={{
                                                bg: "rgba(108,108,108,0.13)",
                                                rounded: 100
                                            }}
                                            p={2}
                                />

                            </View>

                            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen}
                                         onClose={() => setIsOpen(false)}>
                                <AlertDialog.Content>
                                    <AlertDialog.CloseButton/>
                                    <AlertDialog.Header>Видалити установу</AlertDialog.Header>
                                    <AlertDialog.Body>
                                        Це призведе до видалення всіх даних, пов’язаних з установою. Видалені дані не
                                        можна буде відновити.
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button.Group space={2}>
                                            <Button variant="unstyled" colorScheme="coolGray"
                                                    onPress={() => setIsOpen(false)} ref={cancelRef}>
                                                Назад
                                            </Button>
                                            <Button colorScheme="danger" onPress={handleOnDelete}>
                                                Видалити
                                            </Button>
                                        </Button.Group>
                                    </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>

                            <Box rounded="lg" overflow="hidden" mt={5} borderColor="coolGray.800"
                                 style={styles.elevation}>
                                <AspectRatio w="100%" ratio={4 / 3}>
                                    <Image bgColor="white" source={
                                        getImage()
                                    } alt="image" w="100%" h="100%"/>


                                </AspectRatio>
                            </Box>

                            <Input variant="underlined" placeholder="Залиште свій відгук тут..." size={16}
                                   InputRightElement={
                                       <IconButton size="sm" variant="ghost" _icon={{
                                           as: Ionicons,
                                           name: "send",
                                           size: 8,
                                           color: "#777",

                                       }} onPress={handleCommentOnPress}
                                                   _pressed={{
                                                       bg: "rgba(108,108,108,0.13)",
                                                       rounded: 100
                                                   }}
                                                   p={2}
                                       />
                                   }
                                   mt={7}
                                   value={commentContent}
                                   onChangeText={(e) => setCommentContent(e)}
                            />
                            <View flexDirection="row" justifyContent="center" mt={5}>
                                <StarRating
                                    rating={rating}
                                    onChange={setRating}
                                    enableSwiping={false}
                                />
                            </View>

                            <Box flexDirection="row" justifyContent="space-between" mt={9}
                                 borderBottomWidth={1}
                                 borderBottomColor="#888"
                            >

                                <Pressable onPress={() => setSelectedType("comments")}>
                                    <Box borderBottomWidth={selectedType === "comments" ? 1 : 0}
                                         borderBottomColor="#888">
                                        <Text fontSize={16} color="#888"
                                              bold={selectedType === "comments"}>Відгуки</Text>
                                    </Box>
                                </Pressable>
                                <Pressable onPress={() => setSelectedType("employee")}>
                                    <Box borderBottomWidth={selectedType === "employee" ? 1 : 0}
                                         borderBottomColor="#888">
                                        <Text fontSize={16} color="#888"
                                              bold={selectedType === "employee"}> Робітники</Text>
                                    </Box>
                                </Pressable>
                            </Box>
                            <View mt={5}>
                                {
                                    selectedType === "comments" && (

                                        comments.map(c => {
                                            return (
                                                <Box bgColor="#919FA7B2" p={3} flexDirection="row" mt={5} borderRadius={18}
                                                     alignItems="center" key={c.id}>
                                                    <Box borderRadius={50} bg="#fff" overflow="hidden" mr={3}
                                                    >
                                                        <SvgCommonAvatar/>
                                                    </Box>
                                                    <Box w="75%" pr={5}>
                                                        <Text pl={3}>{`${c.user === "99" ? "You" : c.user}`}</Text>
                                                        <Text pl={3} fontSize={10}
                                                              pb={3}>{`${new Date(c.createdAt)}`.substring(0, 24)}</Text>
                                                        <StarRating scale={1} rating={c.rating} enableHalfStar={false}
                                                                    enableSwiping={false}
                                                                    onChange={setCommentRating}/>
                                                        <Text pl={3}
                                                              fontSize={14}>{`${c.content}`}</Text>
                                                    </Box>
                                                    <Center position="absolute" top="-8" right="0" px="1" py="0"
                                                            flexDirection="row">

                                                        <IconButton size="sm" variant="ghost" _icon={{
                                                            as: Entypo,
                                                            name: "dots-three-horizontal",
                                                            size: 7,
                                                            color: "rgba(95,103,110,0.7)",

                                                        }} onPress={() => setIsOpenCommentRight(!isOpenCommentRight)}
                                                                    _pressed={{
                                                                        bg: "rgba(108,108,108,0.13)",
                                                                        rounded: 100
                                                                    }}
                                                                    p={2}
                                                        />

                                                    </Center>
                                                    <Slide in={isOpenCommentRight} placement="right" duration={100} pt={690}
                                                           pr={5}>
                                                        <Box style={{
                                                            elevation: 9,
                                                            shadowColor: '#000000'
                                                        }} _text={{
                                                            color: "white"
                                                        }} bg="#dbdbdb" rounded="sm"
                                                             p={2}

                                                             position="relative"
                                                             top={0}
                                                             right={0}
                                                        >

                                                            <Button bg="#dbdbdb"
                                                                    startIcon={<MaterialIcons name="delete" size={24}
                                                                                              color="#888"/>}
                                                                    justifyContent="flex-start" _text={{
                                                                color: "black"
                                                            }} _pressed={{
                                                                bg: "rgba(182,182,182,0.51)"
                                                            }}
                                                                    pr={10}
                                                                    onPress={() => {
                                                                        setIsOpenRight(false)
                                                                    }}
                                                            >
                                                                Видалити
                                                            </Button>

                                                            <Divider my={1} bg={"#888"}/>

                                                            <Button bg="#dbdbdb"
                                                                    startIcon={<AntDesign name="exclamationcircleo"
                                                                                          size={24} color="#888"/>}
                                                                    justifyContent="flex-start" _text={{
                                                                color: "black"
                                                            }}
                                                                    pr={10}
                                                                    _pressed={{
                                                                        bg: "rgba(182,182,182,0.51)"
                                                                    }}

                                                                    onPress={() => {
                                                                        setShowModal(true)
                                                                        setIsOpenCommentRight(!isOpenCommentRight)
                                                                    }}
                                                            >
                                                                Скарга
                                                            </Button>

                                                        </Box>
                                                    </Slide>

                                                </Box>
                                            )
                                        })
                                    )
                                }

                                {
                                    selectedType === "employee" && (
                                        employeesList.map(empl => {
                                            return (
                                                <Box bgColor="#919FA7B2" p={3} mt={5} borderRadius={18} key={empl.id}>
                                                    <Box flexDirection="row"
                                                         alignItems="center" pb={5}>
                                                        <Box borderRadius={50} bg="#fff" overflow="hidden" p={2} mr={3}>
                                                            <Box>
                                                                <SvgEmployeeAvatar/>
                                                            </Box>
                                                        </Box>
                                                        <Box w="75%" pr={5}>
                                                            <Text pl={3}
                                                                  fontSize={16}>{`${empl.lastName} ${empl.firstName} ${empl.midName}`}</Text>
                                                            <StarRating rating={empl.rating}
                                                                        enableSwiping={false}
                                                                        onChange={setCommentRating}/>
                                                            <Text pl={3}
                                                                  fontSize={14}>{`${empl.position}`}</Text>
                                                        </Box>
                                                    </Box>
                                                    <Button bg="#2D2C2C" _pressed={
                                                        {
                                                            bg: "rgb(93,93,93)"
                                                        }
                                                    }
                                                            onPress={() => props.navigation.navigate('EmplFeedback', {
                                                                empId: empl.id,
                                                                instId: props.route.params.institutionId
                                                            })}
                                                    >
                                                        Написати відгук
                                                    </Button>

                                                </Box>
                                            )
                                        })
                                    )
                                }
                            </View>
                            <Slide in={isOpenRight} placement="right" duration={100} pt={240} pr={5}>
                                <Box style={{
                                    elevation: 9,
                                    shadowColor: '#000000'
                                }} _text={{
                                    color: "white"
                                }} bg="#dbdbdb" rounded="sm"
                                     p={2}
                                >

                                    <Button bg="#dbdbdb"
                                            startIcon={<MaterialIcons name="delete" size={24} color="#888"/>}
                                            justifyContent="flex-start" _text={{
                                        color: "black"
                                    }} _pressed={{
                                        bg: "rgba(182,182,182,0.51)"
                                    }}
                                            pr={10}

                                            onPress={() => {
                                                setIsOpenRight(!isOpenRight)
                                                setIsOpen(!isOpen)
                                            }}
                                    >
                                        Видалити
                                    </Button>

                                    <Divider my={1} bg={"#888"}/>

                                    <Button bg="#dbdbdb" startIcon={<Feather name="edit" size={24} color="#888"/>}
                                            justifyContent="flex-start" _text={{
                                        color: "black"
                                    }}
                                            pr={10}
                                            _pressed={{
                                                bg: "rgba(182,182,182,0.51)"
                                            }}

                                            onPress={() => {
                                                props.navigation.navigate('EditInst', {
                                                    institutionId: props.route.params.institutionId,
                                                })
                                                setIsOpenRight(!isOpenRight)

                                            }}

                                    >
                                        Редагувати
                                    </Button>

                                </Box>
                            </Slide>

                            <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
                                _dark: {
                                    bg: "coolGray.800"
                                },
                                bg: "warmGray.50"
                            }}>
                                <Modal.Content maxWidth="350" maxH="212">
                                    <Modal.CloseButton/>
                                    <Modal.Header>Скарга</Modal.Header>
                                    <Modal.Body>
                                        Після відправлення модератор перегляне ваше звернення
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button.Group space={2}>
                                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                                setShowModal(false);
                                            }}>
                                                Назад
                                            </Button>
                                            <Button onPress={onClickModalHandler}>
                                                Відправити
                                            </Button>
                                        </Button.Group>
                                    </Modal.Footer>
                                </Modal.Content>
                            </Modal>

                        </View>

                    </ScrollView>
            }
        </>

    );
}


const styles = StyleSheet.create({
    elevation: {
        borderRadius: 15,
        elevation: 9,
        shadowColor: '#000000',
    },

});

export default OrgFeedback;