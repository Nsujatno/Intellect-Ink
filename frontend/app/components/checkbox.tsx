import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { textStyles } from "../stylesheets/textStyles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

interface CheckBoxProps {
    options: { value: string; label: string }[];
    checkedValues: string[];
    onChange: (values: string[])=> void;
    style?: object;
}

const CheckBox: React.FC<CheckBoxProps> = ({options, checkedValues, onChange, style}) => {
    let updatedCheckedValues = [...checkedValues];
    
    return (
        <View style={styles.checkBoxContainer}>
            {options.map((option)=> {
                let active = updatedCheckedValues.includes(option.value);
                return (
                    <TouchableOpacity
                        key={option.value}
                        style={active ? [styles.checkBox, styles.activeCheckBox] : styles.checkBox}
                        onPress={() => {
                            if (active) {
                                updatedCheckedValues = updatedCheckedValues.filter((checkedValue) => checkedValue !== option.value);
                                return onChange(updatedCheckedValues);
                            }
                        updatedCheckedValues.push(option.value);
                        onChange(updatedCheckedValues);
                    }}>
                        <MaterialIcons name={active ? "check-box" : "check-box-outline-blank" } color={'#413F6F'} size={24}/>
                        <Text style={[textStyles.bodytext, {marginLeft:10}]}>{option.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create ({
    checkBoxContainer: {
        
    },
    checkBox: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#FFFFFF',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,

    },
    activeCheckBox: {
        backgroundColor: "#D9D9D9"
    },
})

export default CheckBox;