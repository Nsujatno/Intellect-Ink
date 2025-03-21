import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { CartesianChart, StackedBar } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import DropDownButtons from "../components/dropDownButtons";
import { textStyles } from "../stylesheets/textStyles";

export default function Stats() {
  const router = useRouter();

  const [loading, setLoading] = useState(true); // State for loading status
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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch time spent on each category from AsyncStorage
        const booksTime = parseInt((await AsyncStorage.getItem("books")) || "0", 10);
        const poemsTime = parseInt((await AsyncStorage.getItem("poems")) || "0", 10);
        const politicsTime = parseInt((await AsyncStorage.getItem("politics")) || "0", 10);
        const researchTime = parseInt((await AsyncStorage.getItem("research")) || "0", 10);

        // Update state with the fetched times
        setTimeSpentData({
          books: booksTime / 60000, // Convert ms to minutes
          poems: poemsTime / 60000,
          politics: politicsTime / 60000,
          research: researchTime / 60000,
        });

        // Update chart data (mock example: adding time to specific days)
        setChartData((prevData) =>
          prevData.map((data, index) => {
            return {
              ...data,
              books: (booksTime / 60000) / 7, // Divide by 7 days for weekly averages
              poems: (poemsTime / 60000) / 7,
              politics: (politicsTime / 60000) / 7,
              research: (researchTime / 60000) / 7,
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
    return <Text>Loading statistics...</Text>; // Display loading message
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
            domainPadding={{ left: 50, right: 50, top: 30 }}
            domain={{ y: [0, 100] }} // Adjust based on your max data
            axisOptions={{
              formatXLabel: (value) => value,
              formatYLabel: (value) => `${value} min`,
              lineColor: "#000",
              labelColor: "#000",
            }}
          >
            {({ points, chartBounds }) => {
              return (
                <StackedBar
                  chartBounds={chartBounds}
                  points={[
                    points.books,
                    points.poems,
                    points.politics,
                    points.research,
                  ]}
                  colors={["#4E86E9", "#0A0B78", "#5A5CF6", "#3335CF"]}
                  barOptions={({ isBottom, isTop }) => {
                    return {
                      roundedCorners: isTop
                        ? { topLeft: 10, topRight: 10 }
                        : isBottom
                        ? { bottomLeft: 10, bottomRight: 10 }
                        : undefined,
                    };
                  }}
                />
              );
            }}
          </CartesianChart>
        </View>

        {/* Time Spent Per Category */}
        <Text style={[textStyles.heading1, {marginTop: 130, alignSelf: 'center'}]}>Time Spent</Text>
        <Text style={textStyles.subheading2}>Per Category</Text>
        <View style={styles.timeSpentContainer}>
          <Image
              source={require('../../assets/images/stats_box1.png')}
              style={styles.statsBoxPlacement1}
          />
          {/* View Todays Data */}
          <View style={styles.todaysDataContainer}>
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
         <Text style={[textStyles.heading1, {marginTop: -25, marginBottom: 30, alignSelf: 'center'}]}>Statistics</Text>
        <View style={styles.overallStatsContainer}>
          <Image
            source={require('../../assets/images/stats_box1.png')}
            style={styles.statsBoxPlacement2}
          />
          <View style={[styles.miniBoxContainer]}>
            <View style={[styles.miniBoxWrapper]}>
              <Image
                source={require('../../assets/images/stats_mini_box.png')}
                style={styles.statsMiniBox}/>
                <Text style={[textStyles.bodytext3, {marginTop: -60}]}>Day Streak</Text>
              <Image
                source={require('../../assets/images/stats_mini_box.png')}
                style={styles.statsMiniBox}/>
                <Text style={[textStyles.bodytext3, {marginTop: -60}]}>Level </Text>
            </View>
            <Image
              source={require('../../assets/images/stats_mini_box.png')}
              style={styles.statsMiniBox}/>
              <Text style={[textStyles.bodytext3, {marginTop: 60, right: 70}]}>Place</Text>
          </View>
        </View>


        {/* Achievement & Leaderboard Buttons */}
        <View style={{flexDirection: 'column', marginTop: 130, width: 300, height: 60}}>
        <DropDownButtons
            title=' Achievements '
            variant='purple'
            options={[
              { value: 'achievement1', label: 'First Achievement'}
            ]}
        />
        <DropDownButtons
            title=' Leaderboard '
            variant='purple'
            options={[
              { value: 'achievement1', label: 'First Achievement'}
            ]}
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
    width: 340,
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
    justifyContent: "space-evenly",
    width: '60%',
    top: -20,
  },
  miniBoxWrapper: {
    flexDirection: "column",
    alignItems: "center",
  },
  statsMiniBox: {
    width: 140,
    height: 120,
    resizeMode: "contain",
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
    width: '55%',
    top: -7,
    paddingVertical: 0.5,
  },
});


