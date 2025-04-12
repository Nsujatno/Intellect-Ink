import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, Image, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { textStyles } from "../stylesheets/textStyles";
import { toggleAnimation } from "../animations/toggleAnimation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";

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

    const router = useRouter();

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
                <View style={styles.bodyBackground}>
                    <View style={styles.body}>
                        {achievements.length > 0 && (
                            <ScrollView>
                                {achievements.map((achievement) => (
                                <View key={achievement.id} style={styles.achievementBox}>
                                    <Image source={achievement.icon} style={styles.achievementIcon} />
                                    <View style={styles.achievementText}>
                                        <Text style={[textStyles.heading2purple, styles.centeredText]}>{achievement.title}</Text>
                                        <Text style={[textStyles.bodytext3, styles.centeredText]}>{achievement.description}</Text>
                                    </View>
                                </View>
                                ))}
                                <TouchableOpacity
                                    style={styles.viewMoreButton} 
                                    onPress={() => router.push("/achievements")}>
                                    <Text style={styles.viewMoreText}>View More</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )}

                        {leaderboards.length > 0 && (
                            <ScrollView>
                                {leaderboards.map((entry, index) => (
                                    <View key={entry.id} style={styles.leaderboardBox}>
                                        <Text style={styles.rankNumber}>{index + 1}.</Text>
                                        <Image source={entry.icon} style={styles.leaderboardIcon} />
                                        <Text style={[textStyles.bodytext4, styles.centeredText]}>{entry.title}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                        </View>

                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={[styles.categoryBox,
                            variant == 'purple' ? styles.purpleContainer : null,
                            variant == 'white' ? styles.whiteContainer : null,
                            variant == 'whiteOutline' ? styles.outlineContainer: null,
                        ]}
                        onPress={() => {
                            if (category === "Go to today's quiz") {
                              router.push('/quiz');
                            } else {
                              router.push({ pathname: '/search', params: { query: category } });
                            }
                          }}
                        >
                            <Text style={textStyles.subheadingWhite}>{category}</Text>
                            <MaterialIcons name={'keyboard-arrow-right'}color='white' size={30}/>
                        </TouchableOpacity>
                    ))}

                    <View/>
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
    },
    purpleContainer: {
        backgroundColor: '#413F6F',
        height: 200,
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
    bodyBackground: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 0,
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 0,
        marginHorizontal: '4%', 
    },
    achievementIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginRight: 10,
    },
    centeredText: {
        textAlign: 'center',
    },
    achievementText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -40,
    },
    leaderboardBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#F5F5F5',
        marginBottom: 10,
        borderRadius: 0,
        marginHorizontal: '4%', 
    },
    rankNumber: {
        color: '#413F6F',
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
    viewMoreButton: {
        backgroundColor: '#413F6F',
        padding: 15,
        borderRadius: 0,
        alignItems: 'center',
        marginTop: 10,
    },
    viewMoreText: {
        color: 'white',
        fontWeight: 'bold',
    }
})

export default dropDownButton;