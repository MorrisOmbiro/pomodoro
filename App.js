'use strict'
import { ThemeProvider } from '@react-navigation/native';
import React, { Component } from 'react'
import {StyleSheet, View, Text, Button, TextInput} from 'react-native'
import 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';

const styles = StyleSheet.create({
  description: {
    flex: 1,
    alignItems: "center",
    color: "#656565",
    justifyContent: "center",
    marginBottom: 150,
  },
  font: {
    fontSize: 60,
  },
  row: {
    flexDirection: "row",
    marginTop: 40,
  },
  input: {
    margin: 15,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
});

export default class App extends Component {
  state = {
    start_pause: false,
    reset: "Reset",
  };


  render() {
    const { start_pause} = this.state

    return (
      <View style={styles.description}>
        <Text style={styles.font}>Work Timer</Text>
        <Text style={styles.font}>Time here</Text>
        <View style={styles.row}>
          <Button
            title={`${start_pause ? "Start" : "Pause"}`}
            onPress={() => this.setState({ start_pause: !start_pause })}
          />
          <Button title="Reset" />
        </View>
        <View style={styles.row}>
          <Text>Work Time:      </Text>
          <TextInput style={styles.input} keyboardType="numeric" placeholder={"Mins:"} />
          <TextInput style={styles.input} keyboardType="numeric" placeholder={"Secs:"} />
        </View>
        <View style={styles.row}>
          <Text>Break Time:      </Text>
          <TextInput style={styles.input} keyboardType="numeric" placeholder={"Mins:"} />
          <TextInput style={styles.input} keyboardType="numeric" placeholder={"Secs:"} />
        </View>
      </View>
    );
  }
}
