import React, {useEffect, useState} from 'react';


import {Box, Button, Input, Select, Stack, Text, View} from "native-base";
import {MaterialIcons, FontAwesome} from '@expo/vector-icons';


import {Formik} from 'formik';
import FormInput from "./FormInput";
import * as Yup from "yup"

const AddEmployeeForm = ({setEmployees, employees}) => {

    const institutionData = {firstName: '', lastName: '', midName: '', position: ''}

    const validationSchema = Yup.object({
        firstName: Yup.string().trim().min(4, "Min 2 symbols").required("First Name is required!"),
        lastName: Yup.string().trim().min(4, "Min 2 symbols").required("Last Name is required!"),
        midName: Yup.string().trim().min(4, "Min 2 symbols").required("Middle Name is required!"),
        position: Yup.string().trim().required("Position is required!"),

    })


    return (
        <Formik
            initialValues={institutionData}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
                console.log(values)
                setEmployees([...employees, values])
                formikActions.resetForm();
            }}

        >
            {({handleChange, handleBlur, touched, handleSubmit, values, errors}) => (
                <View>
                    <Stack space={5} w="75%" maxW="400px" mx="auto" mt={10}>
                        <FormInput label="Прізвище:"
                                   onChangeText={handleChange('lastName')}
                                   value={values.lastName}
                                   placeholder="Іваненко"
                                   error={errors.lastName}
                                   onBlur={handleBlur("lastName")}
                        />
                        <FormInput label="Ім'я:"
                                   onChangeText={handleChange('firstName')}
                                   value={values.firstName}
                                   placeholder="Іван"
                                   error={errors.firstName}
                                   onBlur={handleBlur("firstName")}

                        />

                        <FormInput label="По батькові:"
                                   onChangeText={handleChange('midName')}
                                   value={values.midName}
                                   placeholder="Іванович"
                                   error={errors.midName}
                                   onBlur={handleBlur("midName")}

                        />
                        <FormInput label="Посада:"
                                   onChangeText={handleChange('position')}
                                   value={values.position}
                                   placeholder="Комендант"
                                   error={errors.position}
                                   onBlur={handleBlur("position")}

                        />

                        <Button onPress={handleSubmit} colorScheme="rgb(45, 44, 44)"
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


export default AddEmployeeForm;