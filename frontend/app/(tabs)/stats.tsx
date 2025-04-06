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
    book: 0,
    poem: 0,
    news: 0,
    // not implemented yet
    // politics: 0,
    // research: 0,
  });

  const [chartData, setChartData] = useState([
    { day: "Sun", book: 0, poem: 0, news: 0 },
    { day: "M", book: 0, poem: 0, news: 0 },
    { day: "T", book: 0, poem: 0, news: 0 },
    { day: "W", book: 0, poem: 0, news: 0 },
    { day: "Th", book: 0, poem: 0, news: 0 },
    { day: "F", book: 0, poem: 0, news: 0 },
    { day: "S", book: 0, poem: 0, news: 0 },
  ]);

  // convert milliseconds
  const formatTime = (milliseconds: number) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // formatting - shows hours and minutes
    // if (hours > 0 && minutes > 0) {
    //   return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
    // } else if (hours > 0) {
    //   return `${hours} hour${hours !== 1 ? 's' : ''}`;
    // } else {
    //   return `${minutes} min${minutes !== 1 ? 's' : ''}`;
    // }
    if (hours === 0) {
      return `${minutes}m`;
    }

    return `${hours}h ${minutes}m`;
  };

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
        // fetch time spent on each category from AsyncStorage
        const booksTime = parseInt((await AsyncStorage.getItem("book")) || "0", 10);
        const poemsTime = parseInt((await AsyncStorage.getItem("poem")) || "0", 10);
        const newsTime = parseInt((await AsyncStorage.getItem("news")) || "0", 10)
        // const politicsTime = parseInt((await AsyncStorage.getItem("politics")) || "0", 10);
        // const researchTime = parseInt((await AsyncStorage.getItem("research")) || "0", 10);

        setTimeSpentData({
          book: booksTime,
          poem: poemsTime,
          news: newsTime,
          // politics: politicsTime / 60000,
          // research: researchTime / 60000,
        });

        // adding time to specific days
        setChartData((prevData) => {
          const newData = [...prevData];
          // add today's time to today's day
          const todayIndex = new Date().getDay(); // 0-6
          newData[todayIndex].book += booksTime / 60000;
          newData[todayIndex].poem += poemsTime / 60000;
          newData[todayIndex].news += newsTime / 60000;
          return newData;
        });
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
            yKeys={["book", "poem", "news"]}
            domainPadding={{ left: 30, right: 30, top: 20, bottom: 30 }}
            domain={{ y: [0, 240] }} // 4 hours in minutes
            axisOptions={{
              axisLineColor: '#000',
              axisLabelColor: '#000',
              tickLabelColor: '#000',
              labelPosition: 'outset',
              formatXLabel: (value) => value,
              formatYLabel: (value) => {
                const hours = Math.floor(value / 60);
                const mins = value % 60;
                
                // Show only minutes if hours is 0
                if (hours === 0) {
                  return `${mins}m`;
                }
                return `${hours}h ${mins}m`;
              },
              axisSide: { x: 'bottom', y: 'left' },
              tickCount: { x: 7, y: 5 },
              lineColor: '#000',
              labelColor: '#000',
              labelOffset: { x: 0, y: 0 },
              style: {
                axis: { stroke: '#000', strokeWidth: 1 },
                ticks: { stroke: '#000', size: 5 },
                tickLabels: { fill: '#000', fontSize: 10 },
                grid: { stroke: '#e0e0e0', strokeWidth: 0.5 },
              },
            }}
          >
            {({ points, chartBounds }) => (
              <StackedBar
                chartBounds={chartBounds}
                points={[points.book, points.poem, points.news]}
                colors={["#4E86E9", "#0A0B78", "#5A5CF6"]} // #3335CF #93AAFD
                barOptions={({ isBottom, isTop }) => ({
                  roundedCorners: isTop
                    ? { topLeft: 10, topRight: 10 }
                    : isBottom
                })}
              />
            )}
          </CartesianChart>
        </View>

        {/* Time Spent Per Category */}
        <Text style={[textStyles.heading1, { marginTop: 60, alignSelf: 'center' }]}>Time Spent</Text>
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
                {formatTime(timeSpentData.book)}
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>Poems</Text>
              <Text style={textStyles.bodytext2}>
                {formatTime(timeSpentData.poem)}
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>News</Text>
              <Text style={textStyles.bodytext2}>
                {formatTime(timeSpentData.news)}
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>Politics</Text>
              <Text style={textStyles.bodytext2}>
                {/* {formatTime(timeSpentData.politics)} */}
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>Research</Text>
              <Text style={textStyles.bodytext2}>
                {/* {formatTime(timeSpentData.research)} */}
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
        <View style={{ flexDirection: 'column', marginTop: 130, width: 300, height: 150 }}>
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
  imagebg: {
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
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 340,
    height: 350,
    marginTop: 70,
    marginBottom: 20,
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
    flexDirection: "column",
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
    position: "absolute",
    top: 5,
    left: 50,
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