import { Text, View, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, Image, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { textStyles } from "../stylesheets/textStyles";
import { toggleAnimation } from "../animations/toggleAnimation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    handleSearch?: (query: string, topic: string, category: string) => Promise<void>;
}

const dropDownButton: React.FC<ButtonProps> = ({ title, variant, achievements = [], leaderboards = [], categories = [], gradientColors = ['#413F6F', '#413F6F'], handleSearch = () => { } }) => {
    const [showContent, setShowContent] = useState(false);
    const animationController = useRef(new Animated.Value(0)).current;

    // const toggleListItem = () => {
    //     const config = {
    //         duration: 500,
    //         toValue: showContent ? 0 : 1,
    //         useNativeDriver: true
    //     };
    //     Animated.timing(animationController, config).start();
    //     LayoutAnimation.configureNext(toggleAnimation);
    //     setShowContent(!showContent);
    // };

    // const dropdownTextStyle = StyleSheet.flatten([
    //     textStyles.subheadingWhite,
    //     (title === 'Achievements' || title === 'Leaderboard') && { 
    //       fontSize: 25, 
    //       textAlign: 'center' 
    //     }
    //   ]);

    const toggleListItem = async () => {
        const config = {
            duration: 500,
            toValue: showContent ? 0 : 1,
            useNativeDriver: true
        };
        Animated.timing(animationController, config).start();
        LayoutAnimation.configureNext(toggleAnimation);
        setShowContent(!showContent);

        // save achievements to AsyncStorage when dropdown is opened
        if (!showContent && achievements.length > 0) {
            try {
                await AsyncStorage.setItem('userAchievements', JSON.stringify(achievements));
            } catch (e) {
                console.error("Error saving achievements", e);
            }
        }
    };


    const arrowTransform = animationController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const router = useRouter();

    return (
        <View style={[styles.container,
        variant == 'purple' ? styles.purpleContainer : null,
        variant == 'white' ? styles.whiteContainer : null,
        variant == 'whiteOutline' ? styles.outlineContainer : null,
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
                            <View style={{ flex: 1 }}>
                                <Text style={textStyles.subheadingWhite}>{title}</Text>
                            </View>
                            {/* <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
                        <MaterialIcons name={'keyboard-arrow-right'}color='white' size={30}/>
                    </Animated.View> */}
                            <Animated.View style={{ position: 'absolute', right: 20, transform: [{ rotateZ: arrowTransform }] }}>
                                <MaterialIcons name={'keyboard-arrow-right'} color='white' size={30} />
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>) :
                (
                    <TouchableOpacity onPress={() => toggleListItem()}>
                        <View style={styles.titleContainer}>
                            <Text
                                style={textStyles.subheadingWhite}
                            >{title}</Text>
                            <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
                                <MaterialIcons name={'keyboard-arrow-right'} color='white' size={30} />
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                )}

            {showContent && (
                <View style={styles.bodyBackground}>
                    <View style={styles.body}>
                        {achievements.length > 0 && (
                            <ScrollView style={{ marginVertical: 20 }}>
                                {achievements.map((achievement) => (
                                    <View key={achievement.id} style={styles.achievementBox}>
                                        <Image source={achievement.icon} style={styles.achievementIcon} />
                                        <View style={styles.achievementText}>
                                            <Text style={[styles.centeredText, { fontFamily: 'Lato Bold', marginVertical: 5, fontSize: 17, color: '#321383', }]}>{achievement.title}</Text>
                                            <Text style={[styles.centeredText, { fontFamily: 'Literata Semi Bold', fontSize: 12, marginVertical: 5, color: '#5363B5' }]}>{achievement.description}</Text>
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
                                        <Text style={[styles.rankNumber, { fontSize: 15, color: '#5363B5' }]}>{index + 1}.</Text>
                                        <Image source={entry.icon} style={styles.leaderboardIcon} />
                                        <Text style={[styles.centeredText, { fontSize: 14, color: '#321383', fontFamily: 'Lato Bold' }]}>
                                            {entry.title}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                    </View>

                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={[styles.categoryBox,
                        variant == 'purple' ? styles.purpleContainer : null,
                        variant == 'white' ? styles.whiteContainer : null,
                        variant == 'whiteOutline' ? styles.outlineContainer : null,
                        ]}
                            onPress={() => {
                                if (category === "Go to today's quiz") {
                                    router.push('/quiz');
                                } else {
                                    handleSearch("", title, category);
                                }
                            }}
                        >
                            <Text style={[textStyles.subheadingWhite]}>{category}</Text>
                            <MaterialIcons name={'keyboard-arrow-right'} color='white' size={30} />
                        </TouchableOpacity>
                    ))}

                    <View />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginBottom: '3%',
        overflow: 'hidden',
    },
    purpleContainer: {
        backgroundColor: '#413F6F',
        width: 350,
        alignSelf: 'center',
    },
    whiteContainer: {
        backgroundColor: '#888FB8',
    },
    outlineContainer: {
        backgroundColor: '#8FB5E3',
    },
    body: {
        padding: 0,
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
        // width: 400,
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
        marginBottom: 50,
        width: '93%',
        alignSelf: 'center',
    },
    viewMoreText: {
        color: 'white',
    }
})

export default dropDownButton;