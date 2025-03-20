import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { textStyles } from "../stylesheets/textStyles";
import {toggleAnimation} from "../animations/toggleAnimation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CheckBox from "./checkbox";

interface ButtonProps {
    title: string;
    variant: 'purple' | 'white' | 'whiteOutline';
    options?: { value: string, label: string }[];
}

const dropDownButton: React.FC<ButtonProps> = ({ title, variant }) => {
    const [showContent, setShowContent] = useState(false);
    const animationController = useRef(new Animated.Value(0)).current;
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

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

    const handleCheckBoxChange = (values: string[]) => {
        setCheckedValues(values);
    }

    return (
        <View style={[styles.container,
            variant == 'purple' ? styles.purpleContainer : null,
            variant == 'white' ? styles.whiteContainer : null,
            variant == 'whiteOutline' ? styles.outlineContainer: null,
        ]}>
            <TouchableOpacity onPress={() => toggleListItem()}>
                <View style={styles.titleContainer}>
                    <Text
                        style={[
                            variant == 'purple' ? { color: '#FFFFFF' }: null,
                            variant == 'white' ? { color: '#413F6F' }: null,
                            variant == 'whiteOutline' ? { color: '#FFFFFF'}: null,
                        ]}
                    >{title}</Text>
                    <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
                        <MaterialIcons name={'keyboard-arrow-right'} size={30}/>
                    </Animated.View>
                </View>
            </TouchableOpacity>
            {showContent && (
                <View style={styles.body}>
                    <CheckBox
                        options={[
                            { value: 'option1', label: 'Option 1'},
                            { value: 'option2', label: 'Option 2'},
                            { value: 'option3', label: 'Option 3'},
                        ]}
                        checkedValues={checkedValues}
                        onChange={handleCheckBoxChange}
                    />
            </View>
            )}
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
    purpleContainer: {
        backgroundColor: '#413F6F',
    },
    whiteContainer: {
        backgroundColor: '#FFFFFF',
    },
    outlineContainer: {
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 4,
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