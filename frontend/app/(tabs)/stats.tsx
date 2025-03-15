import { Text, View, ImageBackground, ScrollView, StyleSheet } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import React, { useEffect, useState } from "react";
import { textStyles } from "../stylesheets/textStyles";
import axios from "axios";

export default function Stats() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([ // Default y-values (in minutes) will be converted and updated dynamically
    { x: "M", y: 0 },
    { x: "T", y: 0 },
    { x: "W", y: 0 },
    { x: "T", y: 0 },
    { x: "F", y: 0 },
    { x: "S", y: 0 },
    { x: "Sun", y: 0 },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userId = ""; // Replace with userID or API key
        const response = await axios.get(`api_url/${userId}`); // link
        const timeSpent = response.data;

        // Map API data
        const formattedData = timeSpent.map((minutes, index) => ({
          x: chartData[index].x, // Days of the week
          y: minutes, // Time spent in minutes
        }));
        setChartData(formattedData);

      } catch (error) {
        console.error("Error: ", error); // Network error (Axios)
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Text>Loading statistics...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={textStyles.pageHeader}>Statistics</Text>

        {/* resize */ }
        <ImageBackground
            source={require('../../assets/images/stats_background.png')}
            style={styles.imagebg}
        />

        <VictoryChart
          theme={VictoryTheme.material}
          domain={{ y: [120, 360] }} // Minutes (2hr to 6hr)
          style={{
            parent: { backgroundColor: "#FFFFFF" },
          }}
        >
          {/* X-Axis */}
          <VictoryAxis
            tickFormat={(x) => x} // Days of the week
          />

          {/* Y-Axis */}
          <VictoryAxis
            dependentAxis
            tickValues={[120, 180, 240, 300, 360]} // y-values in minutes
            tickFormat={(y) => `${y / 60}h`} // Convert y-values to hours
          />

          {/* Bar Chart */}
          <VictoryBar
            data={chartData}
            style={{
              data: { fill: "#4A90E2", width: 20 }, // Customize later
            }}
          />
        </VictoryChart>

        <Text style={textStyles.heading1}>Time Spent</Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagebg: {
    flex: 1,
    resizeMode: 'cover', 
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
