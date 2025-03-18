import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { textStyles } from "../stylesheets/textStyles";
import React from 'react';

interface ButtonProps {
    title: string;
    variant: 'purple' | 'white' | 'whiteOutline';
    onPress: () => void;
}

const Buttons: React.FC<ButtonProps> = ({title, variant, onPress}) => {
    return (
        <View>
           <TouchableOpacity
            style={[styles.container,
            variant === 'purple' ? styles.purpleContainer : null,
            variant === 'white' ? styles.whiteContainer : null,
            variant === 'whiteOutline' ? styles.outlineContainer : null, ]}
            onPress={onPress}
            >
                <Text
                style={[ textStyles.subheading,
                    variant === 'purple' ? {color: 'white'} : null,
                    variant === 'white' ? {color: '#413F6F'} : null,
                    variant === 'whiteOutline' ? {color: 'white'} : null, ]}>
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
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 40,
    },
    purpleContainer: {
        backgroundColor:'#413F6F',
    },
    whiteContainer: {
        backgroundColor:'#FFFFFF',
    },
    outlineContainer: {
        backgroundColor:'transparent',
        borderColor: 'white',
        borderWidth: 4,
    },
})

export default Buttons;