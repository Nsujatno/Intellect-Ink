import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { textStyles } from "../stylesheets/textStyles";
import Buttons from "../components/buttons";
import {toggleAnimation} from "../animations/toggleAnimation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ButtonProps {
    title: string;
    variant: 'purple' | 'white' | 'whiteOutline'; // fix setting variants correctly
    bodyText: ''; // create checkbox option
}

const dropDownButton: React.FC<ButtonProps> = ({ title, variant, bodyText }) => {
    const [showContent, setShowContent] = useState(false);
    const animationController = useRef(new Animated.Value(0)).current;
    const toggleListItem = () => {
        const config = {
            duration: 500,
            toValue: showContent ? 0 : 1,
            useNativeDriver: true
        };
        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(toggleAnimation);
        setShowContent(!showContent);
    };

    const arrowTransform = animationController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => toggleListItem()}>
                <View style={styles.titleContainer}>
                    <Text>{title}</Text>
                    <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
                        <MaterialIcons name={'keyboard-arrow-right'} size={30}/>
                    </Animated.View>
                </View>
            </TouchableOpacity>
            {showContent && <View style={styles.body}>
                <Text>{bodyText}</Text>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        padding: '2%',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: '2%',
        overflow: 'hidden',
    },
    body: {
        paddingHorizontal: '2%',
        paddingVertical: '3%',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default dropDownButton;