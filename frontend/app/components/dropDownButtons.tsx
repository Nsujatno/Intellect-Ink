import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, Image, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { textStyles } from "../stylesheets/textStyles";
import { toggleAnimation } from "../animations/toggleAnimation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

interface Categories {
    id: string;
    title: string;
}

interface ButtonProps {
    title: string;
    variant: 'purple' | 'white' | 'whiteOutline';
    gradientColors?: readonly [string, string, ...string[]];
    categories?: string[];
    achievements?: Achievement[];
    leaderboards?: Leaderboard[];
}

const dropDownButton: React.FC<ButtonProps> = ({ title, variant, achievements = [], leaderboards = [], categories = [], gradientColors=['#413F6F', '#413F6F']}) => {
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
            {gradientColors ? (
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    // style={styles.gradientHeader}
            >
            <TouchableOpacity onPress={() => toggleListItem()}>
                <View style={styles.titleContainer}>
                    <Text
                        style={textStyles.subheadingWhite}
                    >{title}</Text>
                    <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
                        <MaterialIcons name={'keyboard-arrow-right'}color='white' size={30}/>
                    </Animated.View>
                </View>
            </TouchableOpacity>
            </LinearGradient>):
            (
            <TouchableOpacity onPress={() => toggleListItem()}>
                <View style={styles.titleContainer}>
                    <Text
                        style={textStyles.subheadingWhite}
                    >{title}</Text>
                    <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
                        <MaterialIcons name={'keyboard-arrow-right'} color='white' size={30}/>
                    </Animated.View>
                </View>
            </TouchableOpacity>
            )}

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

                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={[styles.categoryBox,
                            variant == 'purple' ? styles.purpleContainer : null,
                            variant == 'white' ? styles.whiteContainer : null,
                            variant == 'whiteOutline' ? styles.outlineContainer: null,
                        ]}>
                            <Text style={textStyles.subheadingWhite}>{category}</Text>
                            <MaterialIcons name={'keyboard-arrow-right'}color='white' size={30}/>
                        </TouchableOpacity>
                    ))}

                    <View style={styles.spacing} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginBottom: '3%',
        overflow: 'hidden',
        //borderRadius: 5,
    },
    purpleContainer: {
        backgroundColor: '#413F6F',
    },
    whiteContainer: {
        backgroundColor: '#888FB8',
    },
    outlineContainer: {
        backgroundColor: '#8FB5E3',
    },
    body: {
        paddingVertical: '0%',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 50,
    },
    achievementBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: '4%', 
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
        marginHorizontal: '4%', 
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
    },
    categoryBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#888FB8',
        borderColor: 'white',
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 20,
    },
})

export default dropDownButton;