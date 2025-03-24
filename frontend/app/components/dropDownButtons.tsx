import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, Image, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { textStyles } from "../stylesheets/textStyles";
import { toggleAnimation } from "../animations/toggleAnimation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CheckBox from "./checkbox";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: any;
}

interface Leaderboard {
    id: string;
    title: string;
    icon: any;
}

interface ButtonProps {
    title: string;
    variant: 'purple' | 'white' | 'whiteOutline';
    options?: { value: string, label: string }[];
    achievements?: Achievement[];
    leaderboards?: Leaderboard[];
}

const dropDownButton: React.FC<ButtonProps> = ({ title, variant, achievements = [], leaderboards = [], options = []}) => {
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
                    {achievements.map((achievement) => (
                    <View key={achievement.id} style={styles.achievementBox}>
                        <Image source={achievement.icon} style={styles.achievementIcon} />
                        <View style={styles.achievementText}>
                            <Text style={textStyles.heading2purple}>{achievement.title}</Text>
                            <Text style={textStyles.bodytext3}>{achievement.description}</Text>
                        </View>
                    </View>
                    ))}

                    {leaderboards.map((entry, index) => (
                        <View key={entry.id} style={styles.leaderboardBox}>
                            <Text style={styles.rankNumber}>{index + 1}.</Text>
                            <Image source={entry.icon} style={styles.leaderboardIcon} />
                            <Text style={textStyles.bodytext4}>{entry.title}</Text>
                        </View>
                    ))}

                    <CheckBox
                        options={options}
                        checkedValues={checkedValues}
                        onChange={handleCheckBoxChange}
                    />
                    <View style={styles.spacing} />
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
    },
    achievementBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10.
    },
    achievementIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    achievementText: {
        flex: 1,
    },
    spacing: {
        height: 100,
    },
    leaderboardBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginBottom: 10,  
    },
    rankNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    leaderboardIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    }
})

export default dropDownButton;