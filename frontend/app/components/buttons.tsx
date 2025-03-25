import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { textStyles } from "../stylesheets/textStyles";
import React from 'react';

interface ButtonProps {
    title: string;
    variant: 'purple' | 'white' | 'whiteOutline'| 'whiteOutlineBig' | 'whiteBig';
    onPress: () => void;
}

const Buttons: React.FC<ButtonProps> = ({title, variant, onPress}) => {
    return (
        <View>
           <TouchableOpacity
            style={[styles.container,
            variant === 'purple' ? styles.purpleContainer : null,
            variant === 'white' ? styles.whiteContainer : null,
            variant === 'whiteBig' ? styles.whiteContainerBig : null,
            variant === 'whiteOutline' ? styles.outlineContainer : null,
            variant === 'whiteOutlineBig' ? styles.outlineContainerBig : null, ]}
            onPress={onPress}
            >
                <Text
                style={[ textStyles.subheading,
                    variant === 'purple' ? {color: 'white'} : null,
                    variant === 'white' ? {color: '#413F6F'} : null,
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
        height: 45,
        paddingHorizontal: 20,
    },
    whiteContainer: {
        backgroundColor:'#FFFFFF',
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