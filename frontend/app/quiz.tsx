import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { textStyles } from "./stylesheets/textStyles";
import Buttons from "./components/buttons";
import { ngrokPath, isExpoMode } from "./utils";

export default function Quiz() {
  const router = useRouter();
  const [percent, setPercent] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [selected, setSelected] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(-1); // Initial state -1 for Start screen
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0); // keeps track of score

  const shuffleOptions = (options: string[]) => {
    return options.sort(() => Math.random() - 0.5);
  };

  // Fetch question from backend
  const fetchQuestion = async () => {
    try {
      const response = await fetch(`${isExpoMode ? ngrokPath : "http://localhost:8000"}/api/quiz2/get-quiz`, {
      headers: { 'ngrok-skip-browser-warning': 'skip-browser-warning' }
    });
      const data = await response.json();
      console.log("Fetched Question Data:", data);
  
      // Format all questions and shuffle their options
      const formattedQuestions = data.map((q: any) => ({
        question: q.question,
        options: shuffleOptions([q.correct_answer, ...q.incorrect_answers]),
        answer: q.correct_answer,
      }));
  
      setQuizQuestions(formattedQuestions);
      setQuestionIndex(0); // Start at the first question
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };
  
  

  // Handle the user's answer
  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === quizQuestions[questionIndex].answer) {
      setScore(score + 1);
    }
    if (selectedOption !== '') {
      setQuestionIndex((prevIndex) => prevIndex + 1); // Increment question index
      setSelectedOption('');
    } else {
      setSelected(true);
    }
  };

  useEffect(() => { // Update percentage progress
    if (questionIndex >= 1) {
      const newPercent = ((questionIndex / quizQuestions.length) * 100);
      setPercent(newPercent);
    }
  }, [questionIndex]);

  useEffect(() => { // Calculate final score
    if (questionIndex === quizQuestions.length) {
      const newFinalScore = ((score / quizQuestions.length) * 100);
      setFinalScore(newFinalScore);
    }
  }, [questionIndex]);

  useEffect(() => {
    console.log("Question Index: ", questionIndex); // Log questionIndex to track its changes
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
            <Text style={[textStyles.heading2purple, {fontSize: 29, color: '#03045E'}]}>Daily Trivia</Text>
            <Text style={[textStyles.subheading2, {fontSize: 24, color: '#646EA3'}]}>Test your knowledge!</Text>
            <Buttons
              title='Start'
              variant='purple'
              onPress={() => {
                setQuestionIndex(0);  // Start the quiz from index 0
                fetchQuestion(); // Optionally, you can fetch the question here if you need dynamic questions
              }}
            />
          </View>
        )}
        {questionIndex !== -1 && questionIndex !== quizQuestions.length && (
          <View style={styles.questionContainer}>
            <Text style={[textStyles.heading2purple, {fontSize: 25, color: '#03045E'}]}>Question {questionIndex+1}</Text>
            <Text style={[textStyles.subheading2, {fontSize: 20, color: '#646EA3'}]}>{quizQuestions[questionIndex].question}</Text>

            {quizQuestions[questionIndex].options.map((option: string, index: string) => (
              <TouchableOpacity key={index} onPress={() => {setSelectedOption(option); setSelected(false)}} style={styles.optionContainer}>
                <View style={[{width: 20, height: 20, borderRadius: 20, marginRight: 20},{backgroundColor: selectedOption === option ? '#413F6F' : '#E2E2E2'}]}></View>
                <Text numberOfLines={1} style={textStyles.subheading}>{option}</Text>
              </TouchableOpacity>
            ))}
            {selected && <Text style={[textStyles.subheading2, {fontSize: 20, color: '#646EA3', marginTop: 20, alignSelf: 'center'}]}>You must select an answer</Text>}
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', bottom: 5, alignSelf: 'center'}}>
              <Buttons
                title='Skip'
                variant='gray2'
                onPress={()=>setQuestionIndex(questionIndex+1)}
              />
              <Buttons
                title='Next'
                variant='purple2'
                onPress={()=>handleAnswer(selectedOption)}
              />
            </View>
          </View>
        )}
        {questionIndex === 5 && (
          <View style={[styles.topicContainer, {height: 380, marginTop: '22%'}]}>
          <Text style={[textStyles.heading2purple, {fontSize: 29, color: '#03045E'}]}>Quiz Completed</Text>
          <Text style={[textStyles.subheading2, {fontSize: 24, color: '#646EA3'}]}>Your Score: {score}/{questionIndex}</Text>
          <View style={{position: 'relative'}}>
            <Image
            source={require('../assets/images/quizFinale.png')}
            style={styles.quizFinaleImg}/>
            
            { finalScore === 100 ? (
              <View style={{position: 'absolute', top: 9, left: 20, alignItems: 'center'}}>
                <Text style={[textStyles.heading2purple,{fontSize: 19}]}>Perfect</Text>
                <Text style={[textStyles.heading2purple,{fontSize: 19}]}>score!</Text>
              </View>
            ): finalScore > 50 ? (
              <View style={{position: 'absolute', top: 8, left: 28, alignItems: 'center'}}>
                <Text style={[textStyles.heading2purple,{fontSize: 19}]}>Good</Text>
                <Text style={[textStyles.heading2purple,{fontSize: 19}]}>job!</Text>
              </View>
            ) : (
              <View style={{position: 'absolute', top: 12, left: 10, alignItems: 'center'}}>
                <Text style={[textStyles.heading2purple,{fontSize: 16}]}>Better luck</Text>
                <Text style={[textStyles.heading2purple,{fontSize: 16}]}>next time!</Text>
              </View>  
            )
            }
          </View>
          
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
    quizFinaleImg: {
      height: 165,
      width: 200,
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