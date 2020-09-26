"use strict";
import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import "react-native-gesture-handler";
import Constants from "expo-constants";
import vibrate from "./utils/vibrate";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  font: {
    fontSize: 48,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: 0,
      b_seconds: 0,
      b_minutes: 0, 
      SEC: 0, 
      MIN: 0, 
      event: true,
      start_pause: true,
    };
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes, start_pause, b_seconds, b_minutes, event , SEC, MIN} = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: this.state.start_pause ? seconds : seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
            if(!start_pause) {
              this.setState({event: !event})
            }
            if(event) {
              this.setSec(b_seconds);
              this.setMin(b_minutes);
            }else {
              this.setSec(this.state.SEC)
              this.setMin(this.state.MIN)
            }
        } else {
          this.setState(({ minutes }) => ({
            minutes: this.state.start_pause ? minutes : minutes - 1,
            seconds: this.state.start_pause ? seconds : 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  setMin = (min_input) => {
    this.setState({ minutes: min_input });
  };
  setSec = (sec_input) => {
    this.setState({ seconds: sec_input });
  };
  setBMin = (min_input) => {
    this.setState({ b_minutes: min_input });
  };
  setBSec = (sec_input) => {
    this.setState({ b_seconds: sec_input });
  };
  setPause = () => {
    this.setState({ start_pause: !this.state.start_pause });
  };
  render() {
    const { seconds, minutes, start_pause, event } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.font}>{`${
          event ? "Work Time" : "Break Time"
        }`}</Text>
        <Text style={styles.font}>{`${
          minutes < 10 ? `0${minutes}` : `${minutes}`
        }:${seconds < 10 ? `0${seconds}` : `${seconds}`}`}</Text>
        <View style={styles.row}>
          <Text style={styles.font}>Work: </Text>
          <TextInput
            style={styles.input}
            keyBoardType="numeric"
            placeholder="Minutes"
            onChangeText={(minutes, MIN) => {
              this.setState({ minutes, MIN: minutes });
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            keyBoardType="numeric"
            placeholder="Seconds"
            onChangeText={(seconds, SEC) => {
              this.setState({ seconds, SEC: seconds });
            }}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.font}>Break: </Text>
          <TextInput
            style={styles.input}
            keyBoardType="numeric"
            placeholder="Minutes"
            onChangeText={this.setBMin}
          ></TextInput>
          <TextInput
            style={styles.input}
            keyBoardType="numeric"
            placeholder="Seconds"
            onChangeText={this.setBSec}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Button
            onPress={this.setPause}
            title={`${start_pause ? "start" : "Pause"}`}
          />
          <Button
            title="Reset"
            onPress={() =>
              this.setState({
                start_pause: true,
                minutes: this.state.MIN,
                seconds: this.state.SEC,
              })
            }
          />
        </View>
      </View>
    );
  }
}