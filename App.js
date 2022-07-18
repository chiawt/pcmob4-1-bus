import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [subArrival, setSubArrival] = useState("");
  const [bus_no, setBus_No] = useState("");
  const [bus_id, setBus_Id] = useState("");

  // const bus_no = 155;
  // const bus_stop_id = "83139";
  // const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=";
  
  function loadBusStopData(bus_no, bus_id) {
    // setLoading(true);
    console.log(BUSSTOP_URL.concat("" , bus_id))
    fetch(BUSSTOP_URL.concat("" , bus_id))
      .then((response) => response.json())
      .then((json) => {
        const myBus = json.services.filter((bus) => bus.no == bus_no)[0];
        const wait_time = Math.floor(myBus.next.duration_ms/1000);
        const sub_wait_time = Math.floor(myBus.subsequent.duration_ms/1000);
        
        // console.log(bus_no);
        // console.log(sub_wait_time);
        setArrival(wait_time);
        setSubArrival(sub_wait_time);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData(bus_no, bus_id);
    console.log(bus_no);
    const interval = setInterval(loadBusStopData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.appName}>SBS Transit</Text>

      <Text style={styles.title}>Bus Arrival App</Text>

      <Text style={styles.textbusid}>Bus Stop ID:</Text>
      {/* <Text style={styles.textbusid}> {bus_stop_id} </Text> */}
      <TextInput 
        style={styles.inputbusid}
        value={bus_id}
        onChangeText={(new_bus_id) => setBus_Id(new_bus_id)}
      />
      <Text> </Text>
      
      <Text style={styles.textbusno}>Bus No:</Text>
      {/* <Text style={styles.textbusno}> {bus_no} </Text> */}
      <TextInput 
        style={styles.inputbusno}
        value={bus_no}
        onChangeText={(new_bus_no) => setBus_No(new_bus_no)}
      />

      <Text> </Text>
      <Text style={styles.arrivalTime}>Next Bus:</Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={"blue"}/> : Math.floor(arrival/60) +' min ' + Math.floor(arrival%60) + 'sec '} </Text>

      <Text> </Text>
      <Text style={styles.arrivalNextTime}>Subsequent Bus:</Text>
      <Text style={styles.arrivalNextTime}>{loading ? <ActivityIndicator color={"blue"}/> : Math.floor(subArrival/60) +' min ' + Math.floor(subArrival%60) + 'sec '} </Text>

      <TouchableOpacity style={styles.button} onPress={() => {loadBusStopData(bus_no, bus_id); setLoading(false)}}> 
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
  inputbusid: {
    // margin: 20,
    borderWidth: 1,
    width: '40%',
    padding: 3,
    borderColor: '#ccc',
    backgroundColor: 'white',
    textAlign: "center",
  },
  inputbusno: {
    // margin: 20,
    borderWidth: 1,
    width: '40%',
    padding: 3,
    borderColor: '#ccc',
    backgroundColor: 'white',
    textAlign: "center",
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
