import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Card from "../components/Card";

// Fetch data from local API
const fetchDataFromAPI = async (setFeeds, setIsLoading) => {
  const url = "https://kiran-application.onrender.com/api/data";

  try {
    const response = await fetch(url);
    const data = await response.json();

    setFeeds(data || []);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data from API:", error);
    setIsLoading(false);
  }
};

const Dashboard = () => {
  const [feeds, setFeeds] = useState([]); // Data from API
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetchDataFromAPI(setFeeds, setIsLoading);
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 2500); // Fetch data every 2.5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Extracting data for the first group (Irradiance, Temperature, Voltage)
  const timeLabels = feeds
    .map((feed, index) =>
      index % 5 === 0
        ? new Date(feed.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : ""
    )
    .reverse();
  const field1Data = feeds.map((feed) => parseFloat(feed.irradiance) || 0).reverse(); // Irradiance
  const field2Data = feeds.map((feed) => parseFloat(feed.temperature) || 0).reverse(); // Temperature
  const field3Data = feeds.map((feed) => parseFloat(feed.voltage) || 0).reverse(); // Voltage
  const field4Data = feeds.map((feed) => parseFloat(feed.azimuth) || 0).reverse(); // Azimuth
  const field5Data = feeds.map((feed) => parseFloat(feed.zenith) || 0).reverse(); // Zenith

  const chartConfig = (color) => ({
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => color,
    strokeWidth: 2,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: color,
      fill: color,
    },
    propsForBackgroundLines: {
      stroke: "#e3e3e3",
    },
    decimalPlaces: 2,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        <Card
          fieldName="Irradiance"
          value={`${field1Data[field1Data.length - 1]?.toFixed(2)} W/m²`}
          icon={require("../assets/irradiance.png")}
          color="#ff6b6c" // Light Red
        />
        <Card
          fieldName="Temperature"
          value={`${field2Data[field2Data.length - 1]?.toFixed(2)} °C`}
          icon={require("../assets/temperature.png")}
          color="#ffa630" // Orange Peel
        />
        <Card
          fieldName="Voltage"
          value={`${field3Data[field3Data.length - 1]?.toFixed(2)} V`}
          icon={require("../assets/voltage.png")}
          color="#4da1a9" // Moonstone
        />
        <Card
          fieldName="Azimuth"
          value={`${field4Data[field4Data.length - 1]?.toFixed(2)}°`}
          icon={require("../assets/azimuth.png")}
          color="#5b5f97" // Ultra Violet
        />
        <Card
          fieldName="Zenith"
          value={`${field5Data[field5Data.length - 1]?.toFixed(2)}°`}
          icon={require("../assets/zenith.png")}
          color="#C07CDF" // Updated color
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.chartContainer}>
          {feeds.length > 0 && (
            <>
              <View style={[styles.chartWrapper, { borderColor: "#ff6b6c" }]}>
                <Text style={[styles.chartLabel, { backgroundColor: "#ff6b6c" }]}>Irradiance</Text>
                <LineChart
                  data={{
                    labels: timeLabels,
                    datasets: [
                      {
                        data: field1Data,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 32}
                  height={220}
                  chartConfig={chartConfig("#ff6b6c")} // Light Red
                  bezier
                  style={styles.chart}
                />
              </View>
              <View style={[styles.chartWrapper, { borderColor: "#ffa630" }]}>
                <Text style={[styles.chartLabel, { backgroundColor: "#ffa630" }]}>Temperature</Text>
                <LineChart
                  data={{
                    labels: timeLabels,
                    datasets: [
                      {
                        data: field2Data,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 32}
                  height={220}
                  chartConfig={chartConfig("#ffa630")} // Orange Peel
                  bezier
                  style={styles.chart}
                />
              </View>
              <View style={[styles.chartWrapper, { borderColor: "#4da1a9" }]}>
                <Text style={[styles.chartLabel, { backgroundColor: "#4da1a9" }]}>Voltage</Text>
                <LineChart
                  data={{
                    labels: timeLabels,
                    datasets: [
                      {
                        data: field3Data,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 32}
                  height={220}
                  chartConfig={chartConfig("#4da1a9")} // Moonstone
                  bezier
                  style={styles.chart}
                />
              </View>
              <View style={[styles.chartWrapper, { borderColor: "#5b5f97" }]}>
                <Text style={[styles.chartLabel, { backgroundColor: "#5b5f97" }]}>Azimuth</Text>
                <LineChart
                  data={{
                    labels: timeLabels,
                    datasets: [
                      {
                        data: field4Data,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 32}
                  height={220}
                  chartConfig={chartConfig("#5b5f97")} // Ultra Violet
                  bezier
                  style={styles.chart}
                />
              </View>
              <View style={[styles.chartWrapper, { borderColor: "#C07CDF" }]}>
                <Text style={[styles.chartLabel, { backgroundColor: "#C07CDF" }]}>Zenith</Text>
                <LineChart
                  data={{
                    labels: timeLabels,
                    datasets: [
                      {
                        data: field5Data,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 32}
                  height={220}
                  chartConfig={chartConfig("#C07CDF")} // Updated color
                  bezier
                  style={styles.chart}
                />
              </View>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chartContainer: {
    marginTop: 16,
  },
  chartWrapper: {
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    overflow: "hidden",
  },
  chart: {
    borderRadius: 16,
  },
  chartLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 4,
    color: "#fff",
  },
});

export default Dashboard;
