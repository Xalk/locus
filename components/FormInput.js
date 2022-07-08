import React from 'react';
import {Box, FormControl, Input, Text, WarningOutlineIcon} from "native-base";

const FormInput = ({label, placeholder = '', error, ...props}) => {

    console.log(error)
    return (
        <Box>
            <FormControl isInvalid={error}>
                <Text fontSize={18}>{label}</Text>
                <Input variant="underlined" {...props} placeholder={placeholder} fontSize={16} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                    {error}
                </FormControl.ErrorMessage>
            </FormControl>
        </Box>
    );
};

export default FormInput;