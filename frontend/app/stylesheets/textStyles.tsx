import { StyleSheet } from 'react-native';

export const textStyles = StyleSheet.create ({
    logo: {
        fontFamily: 'Titan One',
        fontSize: 45,
        marginVertical: 5,
        color: 'white',
        textAlign: 'center',
    },
    pageHeader: {
        fontFamily: 'Lato Bold',
        fontSize: 35,
        marginVertical: 5,
        color: '#413F6F',
        fontWeight: 700,
        textAlign: 'center',
    },
    heading1: {
        fontFamily: 'Lato Bold',
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
    heading2purple: {
        fontFamily: 'Lato Bold',
        fontSize: 22,
        color: '#413F6F',
        textAlign: 'left',
    },
    subheading: {
        fontFamily: 'Lato Regular',
        fontSize: 20,
        marginVertical: 5,
        color: '#504F4F',
    },
    subheadingWhite: {
        fontFamily: 'Lato Regular',
        fontSize: 20,
        marginVertical: 5,
        color: 'white',
    },
    subheading2: {
        fontFamily: 'Lato Italic',
        fontSize: 24,
        marginVertical: 5,
        color: '#FFFFFF',
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
        color: '#504F4F',
    },
    bodytext2: {
        fontFamily: 'Literata Medium Italic',
        fontSize: 20,
        marginVertical: 5,
        color: '#FFFFFF',
    },
    bodytext3: {
        fontFamily: 'Literata Semi Bold',
        fontSize: 16,
        marginVertical: 5,
        color: '#413F6F',
    }
});

export default textStyles;