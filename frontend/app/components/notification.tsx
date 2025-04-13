import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { textStyles } from "../stylesheets/textStyles";

type NotificationProps = {
    message: string;
    onClose: () => void;
    showProgress?: boolean;
    currentProgress?: number;
    goal?: number;
};

export default function Notification({
    message,
    onClose,
    showProgress = false,
    currentProgress = 0,
    goal = 30,
}: NotificationProps) {
    const progressPercentage = Math.min((currentProgress / goal) * 100, 100);

    return (
        <View style={styles.container}>
            <Text style={[textStyles.subheading, styles.message]}>{message}</Text>

            {showProgress && (
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progressPercentage}%` }
                            ]}
                        />
                    </View>
                    <Text style={textStyles.subheading}>
                        {currentProgress} / {goal} minutes ({Math.round(progressPercentage)}%)
                    </Text>
                </View>
            )}

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={textStyles.subheading}>Got it!</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#413F6F',
        borderRadius: 15,
        padding: 20,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    message: {
        color: 'white',
        marginBottom: 10,
    },
    progressContainer: {
        marginVertical: 10,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#E#E2EA',
        borderRadius: 5,
        marginBottom: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#736F96',
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#736F96',
        borderRadius: 15,
    },
})