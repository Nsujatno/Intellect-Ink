import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { textStyles } from "../stylesheets/textStyles";

type NotificationProps = {
    message: string;
    onClose: () => void;
    showProgress?: boolean;
    currentProgress?: number;
    goal?: number;
};

const { width, height } = Dimensions.get('window');

export default function Notification({
    message,
    onClose,
    showProgress = true,
    currentProgress = 0,
    goal = 30,
}: NotificationProps) {
    // const progressPercentage = Math.min((currentProgress / goal) * 100, 100);

    return (
        <View style={styles.container}>
            <Text style={[styles.message]}>
                It's time to complete your daily reading goal!
            </Text>
            <Text style={[styles.message2]}>
                Earn 20% amount of progress!
            </Text>

            {showProgress && (
                <>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${currentProgress}%` }
                                ]}
                            />
                        </View>
                        {/* <Text style={textStyles.subheading}>
                        {currentProgress} / {goal} minutes ({Math.round(currentProgress)}%)
                    </Text> */}
                        <Text style={styles.progressText}>
                            {Math.round(currentProgress)}% to next level
                        </Text>
                    </View>

                    <Text style={styles.dailyGoalText}>
                        You set your daily reading goal to: {goal} minutes
                    </Text>
                </>
            )}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/images/OctopusLogo.png')}
                    style={styles.image}
                />
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={textStyles.subheading2}>Got it!</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: width * 0.9,
        height: width * 1.1,
        bottom: height * 0.15,
        alignSelf: 'center',
        backgroundColor: '#D9D9D9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 15,
        padding: width * 0.05,
        zIndex: 100,
        justifyContent: 'space-between',
    },
    message: {
        color: '#321383',
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 27.5,
        fontWeight: 'bold',
    },
    message2: {
        color: '#5363B5',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    progressContainer: {
        marginVertical: 15,
    },
    progressBar: {
        height: 18,
        backgroundColor: '#97A2DA',
        borderRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '4F3F7F',
    },
    progressText: {
        color: '#413F6F',
        // textAlign: 'center',
        marginTop: 5,
    },
    dailyGoalText: {
        color: '#5363B5',
        textAlign: 'center',
        // marginVertical: 10,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 22,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#413F6F', // temporary color
        borderRadius: 15,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: width * 0.45,
        height: width * 0.50 * 0.63,
        resizeMode: 'contain',
        marginTop: 5,
    },
})