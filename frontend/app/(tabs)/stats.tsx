import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { CartesianChart, StackedBar } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import DropDownButtons from "../components/dropDownButtons";
import { textStyles } from "../stylesheets/textStyles";

export default function Stats() {

  const achievementsData = [
    {
      id: '1',
      title: 'Title',
      description: 'Description',
      icon: require('../../assets/images/stats_badge.png')
    },
    {
      id: '2',
      title: 'Title',
      description: 'Description',
      icon: require('../../assets/images/stats_badge.png')
    },
    {
      id: '3',
      title: 'Title',
      description: 'Description',
      icon: require('../../assets/images/stats_badge.png')
    },
  ]

  const leaderboardData = [
    {
      id: '1',
      title: 'Name',
      icon: require('../../assets/images/pfp.png')
    },
    {
      id: '2',
      title: 'Name',
      icon: require('../../assets/images/pfp.png')
    },
    {
      id: '3',
      title: 'Name',
      icon: require('../../assets/images/pfp.png')
    }
  ]

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [timeSpentData, setTimeSpentData] = useState({
    books: 0,
    poems: 0,
    politics: 0,
    research: 0,
  });

  const [chartData, setChartData] = useState([
    { day: "Sun", books: 0, poems: 0, politics: 0, research: 0 },
    { day: "M", books: 0, poems: 0, politics: 0, research: 0 },
    { day: "T", books: 0, poems: 0, politics: 0, research: 0 },
    { day: "W", books: 0, poems: 0, politics: 0, research: 0 },
    { day: "Th", books: 0, poems: 0, politics: 0, research: 0 },
    { day: "F", books: 0, poems: 0, politics: 0, research: 0 },
    { day: "S", books: 0, poems: 0, politics: 0, research: 0 },
  ]);

  // test data
  // const chartData = [
  //   { day: "Sun", books: 30, poems: 45, politics: 20, research: 10 },
  //   { day: "Mon", books: 25, poems: 30, politics: 15, research: 40 },
  //   { day: "Tue", books: 40, poems: 35, politics: 10, research: 25 },
  //   { day: "Wed", books: 50, poems: 20, politics: 30, research: 15 },
  //   { day: "Thu", books: 35, poems: 25, politics: 20, research: 30 },
  //   { day: "Fri", books: 45, poems: 40, politics: 25, research: 20 },
  //   { day: "Sat", books: 20, poems: 30, politics: 50, research: 35 },
  // ];


  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch time spent on each category from AsyncStorage
        const booksTime = parseInt((await AsyncStorage.getItem("books")) || "0", 10);
        const poemsTime = parseInt((await AsyncStorage.getItem("poems")) || "0", 10);
        const politicsTime = parseInt((await AsyncStorage.getItem("politics")) || "0", 10);
        const researchTime = parseInt((await AsyncStorage.getItem("research")) || "0", 10);

        setTimeSpentData({
          books: booksTime / 60000, // Convert ms to minutes
          poems: poemsTime / 60000,
          politics: politicsTime / 60000,
          research: researchTime / 60000,
        });

        // Update chart data (example: adding time to specific days)
        setChartData((prevData) =>
          prevData.map((data, index) => {
            return {
              ...data,
              books: booksTime ? booksTime / 60000 : 0, // per day
              poems: poemsTime ? poemsTime / 60000 : 0,
              politics: politicsTime ? politicsTime / 60000 : 0,
              research: researchTime ? researchTime / 60000 : 0,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Text>Loading statistics...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/profilebg.png")}
          style={styles.imagebg}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={textStyles.pageHeader}>Statistics</Text>

        {/* Bar Graph */}
        <View style={styles.chartContainer}>
          <CartesianChart
            data={chartData}
            xKey="day"
            yKeys={["books", "poems", "politics", "research"]}
            domainPadding={{ left: 50, right: 50, top: 20 }}
            domain={{
              y: [0, Math.max(...chartData.flatMap(({ books, poems, politics, research }) =>
                [books, poems, politics, research])) + 10],
            }}
            axisOptions={{
              style: {
                axis: { stroke: "#000", strokeWidth: 2 },
                ticks: { stroke: "#000", size: 5 },
                tickLabels: { fill: "#000", fontSize: 12 },
              },
              tickFormat: (tick) => tick,
            }}
          >
            {({ points, chartBounds }) => (
              <StackedBar
                chartBounds={chartBounds}
                points={[
                  points.books,
                  points.poems,
                  points.politics,
                  points.research,
                ]}
                colors={["#4E86E9", "#0A0B78", "#5A5CF6", "#3335CF"]}
              />
            )}
          </CartesianChart>


        </View>

        {/* Time Spent Per Category */}
        <Text style={[textStyles.heading1, { marginTop: 130, alignSelf: 'center' }]}>Time Spent</Text>
        <Text style={textStyles.subheading2}>Per Category</Text>
        <View style={styles.timeSpentContainer}>
          <Image
            source={require('../../assets/images/stats_box1.png')}
            style={styles.statsBoxPlacement1}
          />
          {/* View Todays Data */}
          <View style={styles.todaysDataContainer}>
            <Image
              source={require('../../assets/images/stats_colorCats.png')}
              style={styles.colorCatsContainer}
            />
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>Books</Text>
              <Text style={textStyles.bodytext2}>
                {timeSpentData.books.toFixed(2)} min
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>Poems</Text>
              <Text style={textStyles.bodytext2}>
                {timeSpentData.poems.toFixed(2)} min
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>Politics</Text>
              <Text style={textStyles.bodytext2}>
                {timeSpentData.politics.toFixed(2)} min
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>Research</Text>
              <Text style={textStyles.bodytext2}>
                {timeSpentData.research.toFixed(2)} min
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics Overall Box */}
        <Text style={[textStyles.heading1, { marginTop: -25, marginBottom: 30, alignSelf: 'center' }]}>Statistics</Text>
        <View style={styles.overallStatsContainer}>
          <Image
            source={require('../../assets/images/stats_box1.png')}
            style={styles.statsBoxPlacement2}
          />
          <View style={[styles.miniBoxContainer]}>
            <View style={styles.miniBoxWrapper}>
              <Image source={require('../../assets/images/stats_mini_box.png')} style={styles.statsMiniBox} />
              <Image source={require('../../assets/images/stats_streak.png')} style={styles.miniIcon} />
              <Text style={[textStyles.bodytext3, { marginTop: -60 }]}>Day Streak</Text>
            </View>

            <View style={styles.miniBoxWrapper}>
              <Image source={require('../../assets/images/stats_mini_box.png')} style={styles.statsMiniBox} />
              <Image source={require('../../assets/images/stats_rank.png')} style={styles.miniIcon} />
              <Text style={[textStyles.bodytext3, { marginTop: -60 }]}>Level #</Text>
            </View>

            <View style={styles.thirdBoxWrapper}>
              <Image source={require('../../assets/images/stats_mini_box.png')} style={styles.statsMiniBox} />
              <Image source={require('../../assets/images/stats_trophy.png')} style={styles.miniIcon} />
              <Text style={[textStyles.bodytext3, { marginTop: -60 }]}># Place</Text>
            </View>
          </View>
        </View>


        {/* Achievement & Leaderboard Buttons */}
        <View style={{ flexDirection: 'column', gap: 20, marginTop: 130, width: 300, height: 200 }}>
          <DropDownButtons
            title=' Achievements '
            variant='purple2'
            achievements={achievementsData}
          />
          <DropDownButtons
            title=' Leaderboard '
            variant='purple2'
            leaderboards={leaderboardData}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebg: { // Background Image
    resizeMode: 'cover',
    width: '100%',
    height: undefined,
    aspectRatio: 0.275,
  },
  imageContainer: {
    width: '100%',
    marginTop: 130,
  },
  textContainer: {
    marginTop: 50,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
  },
  chartContainer: { // Statistics Bar Graph
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 350,
    height: 300,
    top: 70,
  },
  timeSpentContainer: { // Statistics Category Time Spent Box
    alignItems: "center",
  },
  overallStatsContainer: { // Statistics Overall Box
    position: "relative",
    alignItems: "center",
    height: 180,
  },
  statsBoxPlacement1: {
    width: 300,
    height: 400,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -80,
  },
  statsBoxPlacement2: {
    width: 480,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  miniBoxContainer: {
    position: "absolute",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center",
    width: '65%', // adds spacing between two boxes first row
    top: -10,
  },
  miniBoxWrapper: {
    flexDirection: "column", // icon above text
    alignItems: "center",
    width: '50%', // two boxes first row
  },
  thirdBoxWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'flex-start', // under first box
    marginLeft: -150,
  },
  statsMiniBox: {
    width: 140,
    height: 120,
    resizeMode: "contain",
    marginBottom: 5,
  },
  miniIcon: {
    position: 'absolute',
    top: 35,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  colorCatsContainer: {
    position: 'absolute',
    top: 30,
    left: -20
  },
  todaysDataContainer: { // Data for Statistics Category Time Spent Box
    position: "absolute", // overlay image
    top: 25,
    left: 50, // adjust once color boxes & times are added
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '87%',
    top: -4,
    left: -5,
    paddingVertical: -3,
  },
});