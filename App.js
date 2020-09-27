"use strict";
import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import "react-native-gesture-handler";
import Constants from "expo-constants";
import vibrate from "./utils/vibrate";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FF403F",
  },
  font: {
    fontSize: 48,
    color: '#F8F8F8',
    fontFamily: 'ArialHebrew-Light'
  },font2: {
    fontSize: 100,
  }, 
  input: {
    margin: 15,
    height: 40,
    borderColor: "#353533",
    borderWidth: 1,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
  },coolButton: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#FF403F',
    borderRadius: 50, 
    borderWidth: 1, 
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    padding: 30,
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
      MIN_B: 0,
      SEC_B: 0,
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
  setPause = () => {
    this.setState({ start_pause: !this.state.start_pause });
  };
  render() {
    const { seconds, minutes, start_pause, event, MIN_B, SEC_B } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.font}>{`${
          event ? "Work Time" : "Break Time"
        }`}</Text>
        <Text style={styles.font2}>{`${
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
            onChangeText={(b_minutes) => {this.setState({b_minutes, MIN_B: b_minutes})}}
          ></TextInput>
          <TextInput
            style={styles.input}
            keyBoardType="numeric"
            placeholder="Seconds"
            onChangeText={(b_seconds) => {this.setState({b_seconds, SEC_B: b_seconds})}}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.coolButton}
            onPress={this.setPause}
            ><Text>{`${start_pause ? "START" : "PAUSE"}`}</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.coolButton}
            onPress={() =>
              this.setState({
                start_pause: true,
                minutes: event ? this.state.MIN : MIN_B,
                seconds: event ? this.state.SEC : SEC_B,
              })
            }
          ><Text>RESET</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}
