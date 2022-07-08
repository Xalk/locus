import React, {useEffect, useState} from 'react';


import {Box, Button, Input, Select, Stack, Text, useToast, View} from "native-base";
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';


import {Formik} from 'formik';
import FormInput from "./FormInput";
import * as Yup from "yup"
import {API} from "../api";

const AddInstitutionForm = ({onPressNavigate, employees, isEdit, institutionInfo, navigation}) => {

    const toast = useToast();





    const validationSchema = Yup.object({
        name: Yup.string().trim().min(4, "Min 4 symbols").required("Name is required!"),
        region: Yup.string().trim().required("Region is required!"),
        location: Yup.string().trim().required("Location is required!"),
        address: Yup.string().trim().required("Address is required!"),
    })


    const onSubmitHandle = async (values, formikActions) => {

        try {

            if (!isEdit) {
                console.log(values)
                const res = await API.addInstitutions(values)
                formikActions.resetForm();

                const instId = res.id

                for (let i = 0; i < employees.length; i++) {
                    const item = employees[i];
                    await API.addEmployee(item, instId);
                }

                toast.show({
                    render: () => {
                        return <Box bg="#000000BE" px="2" py="1" rounded="sm" mb={5}>
                            <Text color="#fff"> Установу створено :)</Text>
                        </Box>;
                    },
                    duration: 1700
                });

                navigation.goBack();
            } else {

                const res = await API.updateInstitutions(institutionInfo.id, values)


                navigation.goBack();
            }


        } catch (e) {
            alert("Error");
            console.log(e);
        }


    }


    const institutionData = {
        name: '',
        region: '',
        location: '',
        address: '',
        rating: 0,
        distance: 0.1 * (Math.floor(Math.random() * (20 - 0 + 0.1) / 0.1)) + 0
    }

    const institutionDataToUpdate = {
        name: institutionInfo.name,
        region: institutionInfo.region,
        location: institutionInfo.location,
        address: institutionInfo.address,
        rating: institutionInfo.rating,
        distance: institutionInfo.distance
    }


    return (
        <Formik
            initialValues={isEdit ? institutionDataToUpdate : institutionData}
            validationSchema={validationSchema}

            enableReinitialize={true}

            // onSubmitHandle(values, formikActions)
            onSubmit={(values, formikActions) => onSubmitHandle(values, formikActions)}

        >
            {({handleChange, handleBlur, touched, handleSubmit, values, errors}) => (
                <View>
                    <Stack space={5} w="75%" maxW="400px" mx="auto" mt={10}>
                        <FormInput label="Назва:"
                                   onChangeText={handleChange('name')}
                                   value={values.name}
                                   placeholder="Гуртожиток №4 ХНУРЕ"
                                   error={errors.name}
                                   onBlur={handleBlur("name")}
                        />
                        <FormInput label="Область:"
                                   onChangeText={handleChange('region')}
                                   value={values.region}
                                   placeholder="Харківська область"
                                   error={errors.region}
                                   onBlur={handleBlur("region")}

                        />

                        <FormInput label="Населений пункт:"
                                   onChangeText={handleChange('location')}
                                   value={values.location}
                                   placeholder="Харків або 50.001619, 36.26430"
                                   error={errors.location}
                                   onBlur={handleBlur("location")}

                        />
                        <FormInput label="Адреса:"
                                   onChangeText={handleChange('address')}
                                   value={values.address}
                                   placeholder="вул. Целіноградська, 36"
                                   error={errors.address}
                                   onBlur={handleBlur("address")}

                        />
                        {
                            !isEdit && <Button colorScheme="rgb(45, 44, 44)"
                                               endIcon={<MaterialIcons name="person-add-alt-1" size={24}
                                                                       color="white"/>}
                                               onPress={onPressNavigate}
                                               mt={5}
                                               mb={2}
                                               _pressed={{
                                                   bg: "rgba(45,44,44,0.34)"
                                               }}
                            >
                                Додати робітника
                            </Button>
                        }
                        <Button onPress={handleSubmit} bgColor="tertiary.500"
                                endIcon={<FontAwesome name="save" size={24} color="white"/>}
                                _pressed={{
                                    bg: "rgba(45,44,44,0.34)"
                                }}
                        >Зберегти</Button>
                    </Stack>

                </View>
            )}
        </Formik>
    );
};


export default AddInstitutionForm;