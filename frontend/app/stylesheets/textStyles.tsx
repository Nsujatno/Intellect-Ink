import { StyleSheet } from 'react-native';

export const textStyles = StyleSheet.create ({
    logo: {
        fontFamily: 'Titan One',
        fontSize: 50,
        marginVertical: 5,
        color: 'white',
        textAlign: 'center',
    },
    pageHeader: {
        fontFamily: 'Lato Bold',
        fontSize: 35,
        marginVertical: 10,
        color: '#413F6F',
        fontWeight: 700,
        textAlign: 'center',
    },
    heading1: {
        fontFamily: 'Lato Bold Italic',
        fontSize: 35,
        marginVertical: 5,
        color: 'white',
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    heading2: {
        fontFamily: 'Lato Regular',
        fontSize: 25,
        marginVertical: 5,
        color: 'white',
        textAlign: 'left',
    },
    subheading: {
        fontFamily: 'Lato Regular',
        fontSize: 20,
        marginVertical: 5,
        color: '#504F4F',
    },
    link: {
        fontFamily: 'Lato Bold Italic',
        fontSize: 20,
        marginVertical: 5,
        color: '#615796',
        textAlign: 'left',
        textDecorationLine:'underline',
    },
    bodytext: {
        fontFamily: 'Literata Regular',
        fontSize: 18,
        marginVertical: 5,
        color: 'white',
    },
});