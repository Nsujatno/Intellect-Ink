import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";

export default function Quiz() {
  const router = useRouter();
  const [percent, setPercent] = useState(0);
  const [selected, setSelected] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const testQuestions = [
    { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Rome'], answer: 'Paris' },
    { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
    { question: 'What is our team name?', options: ['IntellectInk', 'CometClaim', 'WanderLust', 'Abis'], answer: 'IntellectInk'},
  ];

  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0); //keeps track of score
  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === testQuestions[questionIndex].answer) {
      setScore(score + 1);
    }
    if (selectedOption != '') {
      setQuestionIndex(questionIndex+1)
      setSelectedOption('')
    } else {
      setSelected(true)
    }
  }

  useEffect(() => { //displays percentage on progress bar
    if (questionIndex>=0)
      {const newPercent = ((questionIndex / testQuestions.length) * 100);
      setPercent(newPercent);}
  }, [questionIndex]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/discussion_bg.png')}
          style={styles.imagebg}/>
      </View>
        
      <View style={styles.textContainer}>
        <Text style={[textStyles.pageHeader, {alignSelf: 'flex-start', marginHorizontal: 30,}]}>Quiz</Text>
        <View style={styles.lvlContainer}>
          <View style={styles.lvlBar}>
            <View style={[styles.lvlFill, {width: `${percent}%`}]}></View>
          </View>
          <View style={styles.lvlText}>
            <Text style={[textStyles.pageHeader, {fontSize: 17}]}>{Math.round(percent)}%</Text>
          </View>
        </View>
        { questionIndex === -1 && (
          <View style={styles.topicContainer}>
            <Text style={[textStyles.heading2purple, {fontSize: 29, color: '#03045E'}]}>Quiz Title</Text>
            <Text style={[textStyles.subheading2, {fontSize: 24, color: '#646EA3'}]}>Description</Text>
            <Buttons
              title='Start'
              variant='purple'
              onPress={()=>setQuestionIndex(questionIndex+1)}
            />
          </View>
        )}
        {questionIndex !== -1 && questionIndex !== testQuestions.length && (
          <View style={styles.questionContainer}>
            <Text style={[textStyles.heading2purple, {fontSize: 25, color: '#03045E'}]}>Question {questionIndex+1}</Text>
            <Text style={[textStyles.subheading2, {fontSize: 20, color: '#646EA3'}]}>{testQuestions[questionIndex].question}</Text>

            {testQuestions[questionIndex].options.map((option, index) => (
              <TouchableOpacity key={index} onPress={() => {setSelectedOption(option); setSelected(false)}} style={styles.optionContainer}>
                <View style={[{width: 20, height: 20, borderRadius: 20, marginRight: 20},{backgroundColor: selectedOption === option ? '#413F6F' : '#E2E2E2'}]}></View>
                <Text style={textStyles.subheading}>{option}</Text>
              </TouchableOpacity>
            ))}
            {selected && <Text style={[textStyles.subheading2, {fontSize: 20, color: '#646EA3', marginTop: 30, alignSelf: 'center'}]}>You must select an answer</Text>}
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '100%', position: 'absolute', bottom: 5, alignSelf: 'center'}}>
              {/* <Buttons
                title='Back'
                variant='purple'
                onPress={()=>setQuestionIndex(questionIndex-1)}
              /> */}
              <Buttons
                title='Next'
                variant='purple'
                onPress={()=>handleAnswer(selectedOption)}
              />
            </View>
          </View>
        )}
        {questionIndex === testQuestions.length && (
          <View style={styles.topicContainer}>
          <Text style={[textStyles.heading2purple, {fontSize: 29, color: '#03045E'}]}>Quiz Completed</Text>
          <Text style={[textStyles.subheading2, {fontSize: 24, color: '#646EA3'}]}>Your Score: {score}/{questionIndex}</Text>
          <Buttons
            title='Go to home'
            variant='purple'
            onPress={()=>(router.push('/home'))}
          />
        </View>
        )}
      </View> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imagebg: {
      resizeMode: 'cover',
      width: '100%',
      height: 680,
      aspectRatio: 0.6317,
    },
    imageContainer: {
      width: '100%',
      position: 'absolute',
      marginTop: 350,
    },
    textContainer: {
      marginTop: 70,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topicContainer: {
      marginTop: '30%',
      backgroundColor: 'white',
      width: '80%',
      height: 250,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15,
      padding: 10,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    questionContainer: {
      marginTop: '15%',
      backgroundColor: 'white',
      width: '85%',
      height: 500,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: 15,
      padding: 20,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    lvlContainer: {
        borderRadius: 30,
        width: 370,
        height: 50,
        marginVertical: 15,
        alignItems: "center",
        flexDirection: "row",
    },
    lvlBar: {
        backgroundColor: "transparent",
        borderColor: "white",
        borderWidth: 4,
        borderRadius: 15,
        width: 370,
        height: 50,
        marginVertical: 15,
    },
    lvlFill: {
        backgroundColor: "white",
        borderRadius: 0,
        height: 42,
    },
    lvlText: {
        position: "absolute",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 18,
    },
});