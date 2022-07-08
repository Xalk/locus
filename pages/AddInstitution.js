import React, {useState, useEffect} from 'react';
import {Button, ScrollView, Text, View} from "native-base";
import AddInstitutionForm from "../components/AddInstitutionForm";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomScreenHeader from "../components/CustomScreenHeader";
import AddEmployee from "./AddEmployee";
import {API} from "../api";

export const AddInstitution = (props) => {




    return (
        <ScrollView>
            <View>
                <AddInstitutionForm onPressNavigate={() => props.navigation.navigate('Add employee')}
                                    employees={props.employees}
                                    isEdit={props.isEdit}
                                    navigation={props.navigation}
                                    institutionInfo={props.institutionInfo}
                    />
            </View>
        </ScrollView>
    );
};

const Stack = createNativeStackNavigator();

export default function AddInstitutionNavigationWrapper({props, isEdit=false}) {



    // console.log("AddInstitutionNavigationWrapper", props)
    console.log("AddInstitutionNavigationWrapperisEdit", isEdit)

    let institutionId = isEdit && props.route.params.institutionId;

    const [institutionInfo, setInstitutionInfo] = useState({});


    useEffect(() => {


        const fetchData = async () => {
            try {

                const resInstitutionInfo = await API.getCurrentInstitution(institutionId);

                setInstitutionInfo(resInstitutionInfo);



            } catch (e) {
                alert("Error");
                console.log(e);
            }


        }


        isEdit && fetchData();


    }, [])





    const [employees, setEmployees] = useState([])

    return (
        <Stack.Navigator screenOptions={{
            headerShown: !isEdit
        }}

        >


            <Stack.Screen name="Add institution" options={
                {
                    header: (props) =>
                        (
                            <CustomScreenHeader props={props} goTo={"Locus"}/>
                        ),

                }

            }>
                {props => <AddInstitution {...props} employees={employees} institutionInfo={institutionInfo} isEdit={isEdit} />}
            </Stack.Screen>


            <Stack.Screen name="Add employee" options={
                {
                    header: (props) =>
                        (
                            <CustomScreenHeader props={props} goTo={"Add institution"}/>
                        ),

                }

            }>
                {props => <AddEmployee {...props} employees={employees} setEmployees={setEmployees}/>}
            </Stack.Screen>



        </Stack.Navigator>

    );
}


