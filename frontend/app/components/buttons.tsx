import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { textStyles } from "../stylesheets/textStyles";
import React from 'react';

interface ButtonProps {
    title: string;
    variant: 'purple' | 'purple2' | 'purple3' | 'purple4' | 'white' | 'gray' | 'gray2' | 'small' | 'whiteOutline'| 'whiteOutlineBig' | 'whiteBig';
    onPress: () => void;
}

const Buttons: React.FC<ButtonProps> = ({title, variant, onPress}) => {
    return (
        <View>
           <TouchableOpacity
            style={[styles.container,
            variant === 'purple' ? styles.purpleContainer : null,
            variant === 'purple2' ? styles.purple2Container : null,
            variant === 'purple3' ? styles.purple3Container : null,
            variant === 'purple4' ? styles.purple4Container : null,
            variant === 'white' ? styles.whiteContainer : null,
            variant == 'gray' ? styles.grayContainer : null,
            variant == 'gray2' ? styles.gray2Container : null,
            variant == 'small' ? styles.smallContainer : null,
            variant === 'whiteBig' ? styles.whiteContainerBig : null,
            variant === 'whiteOutline' ? styles.outlineContainer : null,
            variant === 'whiteOutlineBig' ? styles.outlineContainerBig : null, ]}
            onPress={onPress}
            >
                <Text
                style={[ textStyles.subheading,
                    variant === 'purple' ? {color: 'white'} : null,
                    variant === 'purple2' ? {color: 'white', fontSize: 16} : null,
                    variant === 'purple3' ? {color: 'white', fontSize: 16} : null,
                    variant === 'purple4' ? {color: 'white', fontSize: 16} : null,
                    variant === 'white' ? {color: '#413F6F'} : null,
                    variant == 'gray' ? {color: '#413F6F'} : null,
                    variant === 'gray2' ? {color: '#413F6F', fontSize: 16} : null,
                    variant == 'small' ? {color: '#413F6F', fontSize: 14} : null,
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
        width: 95,
        height: 34,
        paddingHorizontal: 20,
    },
    purple3Container: {
        backgroundColor:'#413F6F',
        width: 135,
        height: 30,
        paddingHorizontal: 20,
    },
    purple4Container: {
        backgroundColor:'#413F6F',
        width: 110,
        height: 35,
        paddingHorizontal: 20,
    },
    whiteContainer: {
        backgroundColor:'#FFFFFF',
    },
    lightContainer: {
        backgroundColor: '#D9D9D9',
        fontWeight: 'bold',
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
        fontWeight: 'bold',
    },
    smallContainer: {
        backgroundColor: '#D9D9D9',
        width: 80,
        height: 30,
        paddingHorizontal: 10,
        justifyContent: 'center',
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