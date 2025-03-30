import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { textStyles } from "../stylesheets/textStyles";
import React from 'react';

interface ButtonProps {
    title: string;
    variant: 'purple' | 'purple2' | 'white' | 'gray' | 'gray2' | 'whiteOutline'| 'whiteOutlineBig' | 'whiteBig';
    onPress: () => void;
}

const Buttons: React.FC<ButtonProps> = ({title, variant, onPress}) => {
    return (
        <View>
           <TouchableOpacity
            style={[styles.container,
            variant === 'purple' ? styles.purpleContainer : null,
            variant === 'purple2' ? styles.purple2Container : null,
            variant === 'white' ? styles.whiteContainer : null,
            variant == 'gray' ? styles.grayContainer : null,
            variant == 'gray2' ? styles.gray2Container : null,
            variant === 'whiteBig' ? styles.whiteContainerBig : null,
            variant === 'whiteOutline' ? styles.outlineContainer : null,
            variant === 'whiteOutlineBig' ? styles.outlineContainerBig : null, ]}
            onPress={onPress}
            >
                <Text
                style={[ textStyles.subheading,
                    variant === 'purple' ? {color: 'white'} : null,
                    variant === 'purple2' ? {color: 'white', fontSize: 18} : null,
                    variant === 'white' ? {color: '#413F6F'} : null,
                    variant == 'gray' ? {color: '#413F6F'} : null,
                    variant === 'gray2' ? {color: '#413F6F', fontSize: 16} : null,
                    variant === 'whiteBig' ? {color: '#413F6F', fontSize: 25} : null,
                    variant === 'whiteOutline' ? {color: 'white'} : null,
                    variant === 'whiteOutlineBig' ? {color: 'white', fontSize: 25} : null, ]}>
                    {title }
                </Text>
           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 40,
    },
    purpleContainer: {
        backgroundColor:'#413F6F',
        height: 40,
        paddingHorizontal: 20,
    },
    purple2Container: {
        backgroundColor:'#413F6F',
        width: 120,
        height: 40,
        paddingHorizontal: 20,
    },
    whiteContainer: {
        backgroundColor:'#FFFFFF',
    },
    grayContainer: {
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 20,
    },
    gray2Container: {
        backgroundColor: '#D9D9D9',
        width: 80,
        height: 30,
        paddingHorizontal: 20,
    },
    outlineContainer: {
        backgroundColor:'transparent',
        borderColor: 'white',
        borderWidth: 4,
    },
    whiteContainerBig: {
        backgroundColor:'#FFFFFF',
        width: 200,
        height: 60,
        justifyContent: 'center',
    },
    outlineContainerBig: {
        backgroundColor:'transparent',
        borderColor: 'white',
        borderWidth: 4,
        width: 200,
        height: 60,
        justifyContent: 'center',
        marginBottom: 20,
    },
})

export default Buttons;