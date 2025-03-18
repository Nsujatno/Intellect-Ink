import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { CartesianChart, StackedBar } from "victory-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Buttons from "../components/buttons";
import { textStyles } from "../stylesheets/textStyles";
import axios from "axios";

export default function Stats() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true); // State for loading status
  const [todayData, setTodayData] = useState(null); // State for today's statistics data
  const [chartData, setChartData] = useState([ // State for default values for each category
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
        /* const formattedData = timeSpent.map((dayData, index) => ({
          day: chartData[index].day, // Days of the week
          books: dayData.books,
          poems: dayData.poems,
          politics: dayData.politics,
          research: dayData.research,
        }));

        setChartData(formattedData);

        Getting today's data
        const daysOfTheWeek = ["Sun", "M", "T", "W", "Th", "F", "S"];
        const currentDay = daysOfTheWeek[new Date().getDay()];
        const currentDayData = formattedData.find((day) => day.day === currentDay);

        Update state with today's data, defaulting to zeros if no data is found
        setTodayData(currentDayData || { books: 0, poems: 0, politics: 0, research: 0 });
        */

      } catch (error) {
        // console.error("Error fetching data:", error)
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Show while statistic graph is loading
  if (loading) return <Text>Loading statistics...</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/profilebg.png')}
          style={styles.imagebg}/>
      </View>

      <View style={styles.textContainer}>
        <Text style={textStyles.pageHeader}>Statistics</Text>

        {/* Statistics Bar Graph */}
        <View style={styles.chartContainer}>
          <CartesianChart
            data={chartData}
            xKey="day"
            yKeys={["books", "poems", "politics", "research"]}
            domainPadding={{ left: 50, right: 50, top: 30 }}
            domain={{ y: [0, 400] }}
            axisOptions={{
              // tickValuesX: ["Sun", "M", "T", "W", "Th", "F", "S"], // Days on x-axis
              // tickValuesY: [0, 100, 200, 300, 400], // Labels on y-axis
              formatXLabel: (value) => value,
              formatYLabel: (value) => `${value}`,
              lineColor: "#000",
              labelColor: "#000",
            }}
          >
            {({ points, chartBounds }) => {
              return (
              <StackedBar
                chartBounds={chartBounds}
                points={[points.books, points.poems, points.politics, points.research]}
                colors={["#4E86E9", "#0A0B78", "#5A5CF6", "#3335CF"]} // Categories and corresponding colors
                barOptions={( { isBottom, isTop }) => {
                  return {
                    roundedCorners: isTop ? { topLeft: 10, topRight: 10, }
                    : isBottom ? { bottomRight: 10, bottomLeft: 10,
                      } : undefined,
                  };
                }}
              />
              );
            }}
          </CartesianChart>
        </View>


        {/* Statistics Category Time Spent Box */}
        <Text style={[textStyles.heading1, {marginTop: 130, alignSelf: 'center'}]}>Time Spent</Text>
        <Text style={textStyles.heading2}>Per Category</Text>
        <View style={styles.timeSpentContainer}>
          <Image
              source={require('../../assets/images/stats_box1.png')}
              style={styles.statsBoxPlacement1}
          />
          {/* View Todays Data */}
          <View style={styles.todaysDataContainer}>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryName}>Books</Text>
              {/* <Text style={styles.categoryTime}>{todayData?.books ?? 0}</Text> */}
            </View>
          <View style={styles.categoryRow}>
              <Text style={styles.categoryName}>Poems</Text>
              {/* <Text style={styles.categoryTime}>{todayData?.poems ?? 0}</Text> */}
          </View>
          <View style={styles.categoryRow}>
              <Text style={styles.categoryName}>Politics</Text>
              {/* <Text style={styles.categoryTime}>{todayData?.politics ?? 0}</Text> */}
          </View>
          <View style={styles.categoryRow}>
              <Text style={styles.categoryName}>Research</Text>
              {/* <Text style={styles.categoryTime}>{todayData?.research ?? 0}</Text> */}
          </View>
        </View>


        {/* Statistics Overall Box */}
        <Text style={[textStyles.heading1, {marginTop: -25, marginBottom: 30, alignSelf: 'center'}]}>Statistics</Text>
        <View style={styles.overallStatsContainer}>
          <Image
            source={require('../../assets/images/stats_box1.png')}
            style={styles.statsBoxPlacement2}
          />
        </View>


        {/* Achievement & Leaderboard Buttons */}
        <View style={{flexDirection: 'column', marginTop: 130, width: 300, height: 60}}>
        <Buttons
            title=' Achievements '
            variant='purple'
            onPress={() => router.push('/home')}
        />
        <Buttons
            title=' Leaderboard '
            variant='purple'
            onPress={() => router.push('/home')}
        />
        </View>
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
    width: '80%',
    paddingVertical: 8,
  },
  categoryName: { // Adjust fonts to textstyles
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  categoryTime: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },
});
