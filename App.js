import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [subArrival, setSubArrival] = useState("");
  // const [bus_no, setBusNo] = useState("");
  const bus_no = 155;
  const bus_stop_id = "83139";
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  
  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((json) => {
        const myBus = json.services.filter((bus) => bus.no == bus_no)[0];
        const wait_time = Math.floor(myBus.next.duration_ms/1000);
        const sub_wait_time = Math.floor(myBus.subsequent.duration_ms/1000);
        
        console.log(wait_time);
        console.log(sub_wait_time);
        setArrival(wait_time);
        setSubArrival(sub_wait_time);
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

      <Text style={styles.textbusid}>Bus Stop ID:</Text>
      <Text style={styles.textbusid}> {bus_stop_id} </Text>
      <Text> </Text>
      
      <Text style={styles.textbusno}>Bus No:</Text>
      <Text style={styles.textbusno}> {bus_no} </Text>

      <Text> </Text>
      <Text style={styles.arrivalTime}>Next Bus:</Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={"blue"}/> : Math.floor(arrival/60) +' min ' + Math.floor(arrival%60) + 'sec '} </Text>

      <Text> </Text>
      <Text style={styles.arrivalNextTime}>Subsequent Bus:</Text>
      <Text style={styles.arrivalNextTime}>{loading ? <ActivityIndicator color={"blue"}/> : Math.floor(subArrival/60) +' min ' + Math.floor(subArrival%60) + 'sec '} </Text>

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
    fontSize: 50,
    marginVertical: 10,
    color: "blue",
  },
  title: {
    fontSize: 30,
    marginVertical: 10,
    padding: 20,
  },
  textbusid: {
    fontSize: 20,
  },
  inputbusno: {
    margin: 20,
    borderWidth: 1,
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
  },
  textbusno: {
    fontSize: 20,
  },
  arrivalTime: {
    fontSize: 20,
  },
  arrivalNextTime: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "cyan",
    padding: 10,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});
