import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Center,
    Divider,
    IconButton,
    Input,
    ScrollView,
    Slide, Spinner,
    Stack,
    Text,
    useToast,
    View
} from "native-base";
import {SvgCommonAvatar, SvgEmployeeAvatar} from "../components/Svg";
import StarRating from "react-native-star-rating-widget";
import {AntDesign, Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {API} from "../api";

const EmplFeedback = (props) => {

    const {empId, instId} = props.route.params;


    const [commentRating, setCommentRating] = useState(4);
    const [rating, setRating] = useState(0);
    const [isOpenCommentRight, setIsOpenCommentRight] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [employeeInfo, setEmployeeInfo] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const resComments = await API.getCurrentEmployeeComments(instId, empId);
                const resEmployeeInfo = await API.getCurrentEmployeeInfo(instId, empId);
                setIsLoading(false)

                setComments(resComments);
                setEmployeeInfo(resEmployeeInfo)

            } catch (e) {
                alert("Error");
                console.log(e);
            }


        }


        fetchData();
    }, [])


    const [commentContent, setCommentContent] = useState("");
    const toast = useToast();

    const handleCommentOnPress = async () => {

        try {
            let values = {
                rating: rating,
                content: commentContent,
                user: "99"
            }

            setCommentContent("");
            setRating(0);



            let updatedRating;
            if (+employeeInfo.rating === 0) {
                updatedRating = +values.rating
            } else {
                updatedRating = Math.round((+values.rating + +employeeInfo.rating) / (comments.length))


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

            let resData = await API.addEmployeeComment(instId, empId, values)


            await API.updateEmployeeRating(instId, empId, updateData)

            setComments([...comments, resData])

        } catch (e) {
            console.log(e);
            alert(e);
        }


    }

    return (
        <>
            {
                isLoading ? <Center position="absolute" top="50%" left="46%"><Spinner size="lg"/></Center> : (
                    <ScrollView>
                        <Stack space={5} w="85%" maxW="400px" mx="auto" mt={5} mb={5}>
                            <Box bgColor="#919FA7B2" p={3} mt={5} borderRadius={18}>
                                <Box flexDirection="row"
                                     alignItems="center" pb={5}>
                                    <Box borderRadius={50} bg="#fff" overflow="hidden" p={2} mr={3}>
                                        <Box>
                                            <SvgEmployeeAvatar/>
                                        </Box>
                                    </Box>
                                    <Box w="75%" pr={5}>
                                        <Text pl={3}
                                              fontSize={16}>{`${employeeInfo.lastName} ${employeeInfo.firstName} ${employeeInfo.midName}`}</Text>
                                        <StarRating scale={1} rating={employeeInfo.rating} enableSwiping={false}
                                                    onChange={setCommentRating}/>
                                        <Text pl={3}
                                              fontSize={14}>{`${employeeInfo.position}`}</Text>
                                    </Box>
                                </Box>
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
                            <View flexDirection="row" justifyContent="center" mt={2}>
                                <StarRating
                                    rating={rating}
                                    onChange={setRating}
                                    enableSwiping={false}
                                />
                            </View>

                            <Text fontSize={18} mt={3}>
                                {comments.length === 0 ? "Немає коментарів :(" : "Всі коментарі:"}
                            </Text>

                            {
                                comments.map(c => {
                                    return (
                                        <Box bgColor="#919FA7B2" p={3} flexDirection="row" mt={1} borderRadius={18}
                                             alignItems="center" key={c.id}>
                                            <Box borderRadius={50} bg="#fff" overflow="hidden" p={0} mr={3}>
                                                <SvgCommonAvatar/>
                                            </Box>
                                            <Box w="75%" pr={5}>
                                                <Text bold pl={3}
                                                      fontSize={16}>{`${c.user === "99" ? "You" : c.user}`}</Text>
                                                <Text pl={3} fontSize={10}
                                                      pb={3}>{`${new Date(c.createdAt)}`.substring(0, 24)}</Text>
                                                <StarRating scale={1} rating={c.rating} enableHalfStar={false}
                                                            enableSwiping={false}
                                                            onChange={setCommentRating}/>
                                                <Text pl={3} pt={3}
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
                                        </Box>
                                    )
                                })
                            }


                        </Stack>
                        <Slide in={isOpenCommentRight} placement="right" duration={100} pt={590} pr={5}>
                            <Box style={{
                                elevation: 9,
                                shadowColor: '#000000'
                            }} _text={{
                                color: "white"
                            }} bg="#dbdbdb" rounded="sm"
                                 p={2}
                            >

                                <Button bg="#dbdbdb" startIcon={<MaterialIcons name="delete" size={24} color="#888"/>}
                                        justifyContent="flex-start" _text={{
                                    color: "black"
                                }} _pressed={{
                                    bg: "rgba(182,182,182,0.51)"
                                }}
                                        pr={10}
                                >
                                    Видалити
                                </Button>

                                <Divider my={1} bg={"#888"}/>

                                <Button bg="#dbdbdb"
                                        startIcon={<AntDesign name="exclamationcircleo" size={24} color="#888"/>}
                                        justifyContent="flex-start" _text={{
                                    color: "black"
                                }}
                                        pr={10}
                                        _pressed={{
                                            bg: "rgba(182,182,182,0.51)"
                                        }}
                                >
                                    Скарга
                                </Button>

                            </Box>
                        </Slide>
                    </ScrollView>
                )
            }
        </>

    );
};

export default EmplFeedback;