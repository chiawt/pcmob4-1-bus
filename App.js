import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  const bus_no = 155;

  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((json) => {
        const myBus = json.services.filter((bus) => bus.no == bus_no)[0];
        const wait_time = Math.ceil(myBus.next.duration_ms/60000);
        console.log(wait_time);
        setArrival(wait_time);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
    const interval = setInterval(loadBusStopData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.appName}>SBS Transit</Text>

      <Text style={styles.title}>Bus Arrival App</Text>
      <Text style={styles.arrivalTime}>Next Bus:</Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={"blue"}/> : arrival} min</Text>

      <Text> </Text>
      <Text style={styles.arrivalNextTime}>Next Bus:</Text>
      <Text style={styles.arrivalNextTime}>{loading ? <ActivityIndicator color={"blue"}/> : arrival} min</Text>

      <TouchableOpacity style={styles.button} onPress={() => setLoading(false)}> 
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightcyan",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 60,
    marginVertical: 20,
  },
  title: {
    fontSize: 40,
    marginVertical: 20,
  },
  arrivalTime: {
    fontSize: 30,
  },
  arrivalNextTime: {
    fontSize: 30,
  },
  button: {
    backgroundColor: "cyan",
    padding: 20,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});
