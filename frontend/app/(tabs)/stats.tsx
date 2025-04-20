import { Text, View, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { VictoryStack, VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import DropDownButtons from "../components/dropDownButtons";
import { textStyles } from "../stylesheets/textStyles";

export default function Stats() {
  const achievementsData = [
    {
      title: "Joined Intellect Ink!",
      description: "Expanding your knowledge!",
      icon: require("../../assets/images/stats_badge.png"),
    },
  ];

  const leaderboardData = [
    {
      id: '1',
      title: 'Julie Smith',
      icon: require('../../assets/images/pfp.png')
    },
    {
      id: '2',
      title: 'Arnold Johnson',
      icon: require('../../assets/images/pfp.png')
    },
    {
      id: '3',
      title: 'Dakota Williams',
      icon: require('../../assets/images/pfp.png')
    }
  ];

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [timeSpentData, setTimeSpentData] = useState({
    book: 0,
    poem: 0,
    news: 0,
    article: 0,
    paper: 0,
  });
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());

  const [chartData, setChartData] = useState([
    { day: "Sun", book: 0, poem: 0, news: 0, article: 0, paper: 0 },
    { day: "M", book: 0, poem: 0, news: 0, article: 0, paper: 0 },
    { day: "T", book: 0, poem: 0, news: 0, article: 0, paper: 0 },
    { day: "W", book: 0, poem: 0, news: 0, article: 0, paper: 0 },
    { day: "Th", book: 0, poem: 0, news: 0, article: 0, paper: 0 },
    { day: "F", book: 0, poem: 0, news: 0, article: 0, paper: 0 },
    { day: "S", book: 0, poem: 0, news: 0, article: 0, paper: 0 }
  ]);

  // convert milliseconds
  const formatTime = (milliseconds: number) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) {
      return `${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // fetch time spent on each category from AsyncStorage
        const booksTime = parseInt((await AsyncStorage.getItem("book")) || "0", 10);
        const poemsTime = parseInt((await AsyncStorage.getItem("poem")) || "0", 10);
        const newsTime = parseInt((await AsyncStorage.getItem("news")) || "0", 10);
        const articleTime = parseInt((await AsyncStorage.getItem("article")) || "0", 10);
        const paperTime = parseInt((await AsyncStorage.getItem("paper")) || "0", 10);

        setTimeSpentData({
          book: booksTime,
          poem: poemsTime,
          news: newsTime,
          article: articleTime,
          paper: paperTime,
        });

        const existingStats = await AsyncStorage.getItem("weeklyStats");
        let weeklyStats = chartData;
        if (existingStats) {
          weeklyStats = JSON.parse(existingStats);
        }

        const todayIndex = new Date().getDay(); // 0 = Sunday
        const updatedStats = weeklyStats.map((entry, index) =>
          index === todayIndex
            ? {
              ...entry,
              book: booksTime / 60000,
              poem: poemsTime / 60000,
              news: newsTime / 60000,
              article: articleTime / 60000,
              paper: paperTime / 60000,
            }
            : entry
        );

        setChartData(updatedStats);
        await AsyncStorage.setItem("weeklyStats", JSON.stringify(updatedStats));
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
        <View style={{ height: 150, width: '100%', backgroundColor: '#8990B6' }}></View>
      </View>

      <View style={styles.textContainer}>
        <Text style={textStyles.pageHeader}>Statistics</Text>

        {/* stacked bar chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={[textStyles.heading2purple, { fontSize: 22, marginLeft: 33 }]}>{chartData[selectedDayIndex].day}</Text>
            <Text style={[textStyles.heading2purple, { fontSize: 22 }]}>
              {formatTime(
                (
                  (chartData[selectedDayIndex]?.book || 0) +
                  (chartData[selectedDayIndex]?.poem || 0) +
                  (chartData[selectedDayIndex]?.news || 0) +
                  (chartData[selectedDayIndex]?.article || 0) +
                  (chartData[selectedDayIndex]?.paper || 0)
                ) * 60000
              )}
            </Text>

          </View>
          <VictoryChart
            domainPadding={{ x: 25 }}
            height={300}
            width={320}
            padding={{ top: 35, bottom: 25, left: 40, right: 20 }}
            domain={{ y: [0, 480] }} // 8 hours
          >

            {/* Y Axis */}
            <VictoryAxis
              dependentAxis
              tickValues={[60, 240, 480]}
              tickFormat={(y) => `${Math.floor(y / 60)}h`}
              style={{
                axis: { stroke: "#e0e0e0" },
                ticks: { stroke: "#ccc", size: 4 },
                grid: { stroke: "#d3d3d3", strokeDasharray: "4" },
                tickLabels: { fill: "#333", fontSize: 10 },
              }}
            />

            {/* X Axis */}
            <VictoryAxis
              tickValues={chartData.map((d) => d.day)}
              style={{
                tickLabels: { fontSize: 12, fill: "#555" },
              }}
            />
            <VictoryStack colorScale={["#4E86E9", "#0A0B78", "#5A5CF6"]}>
              <VictoryBar
                data={chartData}
                x="day"
                y="book"
                barWidth={20}
                events={[{
                  target: "data",
                  eventHandlers: {
                    onPressIn: (event, props) => {
                      setSelectedDayIndex(props.index);
                    }
                  }
                }]}
              />
              <VictoryBar
                data={chartData}
                x="day"
                y="poem"
                barWidth={20}
                events={[{
                  target: "data",
                  eventHandlers: {
                    onPressIn: (event, props) => {
                      setSelectedDayIndex(props.index);
                    }
                  }
                }]}
              />
              <VictoryBar
                data={chartData}
                x="day"
                y="news"
                barWidth={20}
                events={[{
                  target: "data",
                  eventHandlers: {
                    onPressIn: (event, props) => {
                      setSelectedDayIndex(props.index);
                    }
                  }
                }]}
              />
              <VictoryBar
                data={chartData}
                x="day"
                y="article"
                barWidth={20}
                events={[{
                  target: "data",
                  eventHandlers: {
                    onPressIn: (event, props) => {
                      setSelectedDayIndex(props.index);
                    }
                  }
                }]}
              />
              <VictoryBar
                data={chartData}
                x="day"
                y="paper"
                barWidth={20}
                cornerRadius={{ top: 6 }} // research is top stacked bar, so rounded corner
                events={[{
                  target: "data",
                  eventHandlers: {
                    onPressIn: (event, props) => {
                      setSelectedDayIndex(props.index);
                    }
                  }
                }]}
              />
            </VictoryStack>
          </VictoryChart>
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
                {formatTime(timeSpentData.article)}
              </Text>
            </View>
            <View style={styles.categoryRow}>
              <Text style={textStyles.bodytext2}>Research</Text>
              <Text style={textStyles.bodytext2}>
                {formatTime(timeSpentData.paper)}
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics Overall Box */}
        <Text style={[textStyles.heading1, { marginTop: -25, marginBottom: 30, alignSelf: 'center' }]}>Statistics</Text>
        <View style={styles.overallStatsContainer}>
          <Image
            source={require('../../assets/images/box.png')}
            style={styles.statsBoxPlacement2}
          />
          <View style={[styles.miniBoxContainer]}>
            {/* Day Streak Box */}
            <View style={styles.miniBoxWrapper}>
              <Image source={require('../../assets/images/stats_mini_box.png')} style={styles.statsMiniBox} />
              <View style={styles.iconNumberContainer}>
                <Image source={require('../../assets/images/stats_streak.png')} style={styles.miniIcon} />
                {/* <Text style={textStyles.bodytext3}>2</Text> */}
              </View>
              <Text style={[textStyles.bodytext3, styles.miniBoxText]}>Day Streak</Text>
            </View>

            {/* Level Box */}
            <View style={styles.miniBoxWrapper}>
              <Image source={require('../../assets/images/stats_mini_box.png')} style={styles.statsMiniBox} />
              <View style={styles.iconNumberContainer}>
                <Image source={require('../../assets/images/stats_rank.png')} style={styles.miniIcon} />
                {/* <Text style={textStyles.bodytext3}>4</Text> */}
              </View>
              <Text style={[textStyles.bodytext3, styles.miniBoxText]}>Level</Text>
            </View>

            {/* Place Box */}
            <View style={styles.thirdBoxWrapper}>
              <Image source={require('../../assets/images/stats_mini_box.png')} style={styles.statsMiniBox} />
              <View style={styles.iconNumberContainer}>
                <Image source={require('../../assets/images/stats_trophy.png')} style={styles.miniIcon} />
                {/* <Text style={textStyles.bodytext3}>#3</Text> */}
              </View>
              <Text style={[textStyles.bodytext3, styles.miniBoxText]}>Place</Text>
            </View>
          </View>
        </View>

        {/* Achievement & Leaderboard Buttons */}
        <View style={{ flexDirection: 'column', marginTop: 130, width: 300, height: 150 }}>
          <DropDownButtons
            title=' Achievements '
            variant='purple'
            achievements={achievementsData}
          />
          <DropDownButtons
            title=' Leaderboard '
            variant='purple'
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
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 340,
    height: 350,
    marginTop: 70,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
  timeSpentContainer: {
    alignItems: 'center',
  },
  overallStatsContainer: {
    position: 'relative',
    alignItems: 'center',
    height: 180,
  },
  statsBoxPlacement1: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -80,
  },
  statsBoxPlacement2: {
    width: 480,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  colorCatsContainer: {
    position: 'absolute',
    top: 30,
    left: -20
  },
  todaysDataContainer: {
    position: 'absolute',
    top: 5,
    left: 50,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '87%',
    top: -4,
    left: -5,
    paddingVertical: -3,
  },
  miniBoxContainer: {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '65%',
    top: -10,
  },
  miniBoxWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    marginBottom: -30,
  },
  thirdBoxWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'flex-start',
    marginLeft: -150,
  },
  statsMiniBox: {
    width: 140,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  iconNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 35,
  },
  miniIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  miniBoxText: {
    position: 'absolute',
    top: 60,
    textAlign: 'center',
    width: '100%',
  },
});