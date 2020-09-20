'use strict'
import React, { Component } from 'react'
import {StyleSheet, View, Text, Button, TextInput} from 'react-native'
import 'react-native-gesture-handler';
import vibrate from './utils/vibrate';

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
  constructor(props) {
    super(props)
    this.state = {
      start_pause: true,
      minutes: 2,
      seconds: 0, 
      init_w_m: 0,
      init_w_s: 0,
    };    
  }

  componentDidMount() {
      this.myInterval = setInterval(() => {
        const { seconds, minutes } = this.state;
        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: this.state.start_pause ? seconds : seconds - 1,
          }));
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval);
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
    clearInterval(this.myInterval)
  }

  render() {
    const { minutes, seconds, start_pause, init_w_m, init_w_s } = this.state;    

    return (
      <View style={styles.description}>
        <Text style={styles.font}>Work Timer</Text>
        <Text style={styles.font}>{`${
          minutes < 10 ? `0${minutes}` : `${minutes}`
        }:${seconds < 10 ? `0${seconds}` : `${seconds}`}`}</Text>

        <View style={styles.row}>
          <Button
            title={`${start_pause ? "Start" : "Pause"}`}
            onPress={() => {
              this.setState({ start_pause: !start_pause });
            }}
          />
          <Button
            title="Reset"
            onPress={() =>
              this.setState({
                start_pause: true,
                minutes: init_w_m,
                seconds: init_w_s,
              })
            }
          />
        </View>
        <View style={styles.row}>
          <Text>Work Time: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done"
            value={minutes}
            onChangeText={(minutes, init_w_m) =>
              this.setState({ minutes, init_w_m: minutes })
            }
            placeholder={"Mins:"}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            returnKeyType="done"
            value={seconds}
            onChangeText={(seconds, init_w_s) =>
              this.setState({ seconds, init_w_s: seconds })
            }
            placeholder={"Secs:"}
          />
        </View>
        <View style={styles.row}>
          <Text>Break Time: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={"Mins:"}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={"Secs:"}
          />
        </View>
      </View>
    );
  }
}


// vibrate()