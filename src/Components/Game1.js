import React, { Component } from "react";
import { View, Animated, Alert, Dimensions, Image } from "react-native";

export default class Game1 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    // console.warn(this.props.navigation.state.params.images[0].Image);

    //corner positioning
    this.pos1 = new Animated.ValueXY(0, 0);
    Animated.spring(this.pos1, {
      toValue: {
        x: WIDTHMIDDLE - 50,
        y: HEIGHT - 90
      }
    }).start();
    this.pos2 = new Animated.ValueXY(0, 0);
    Animated.spring(this.pos2, {
      toValue: {
        x: -WIDTHMIDDLE + 50,
        y: HEIGHT - 90
      }
    }).start();
    this.pos3 = new Animated.ValueXY(0, 0);
    Animated.spring(this.pos3, {
      toValue: {
        x: -WIDTHMIDDLE + 50,
        y: 10
      }
    }).start();
    this.pos4 = new Animated.ValueXY(0, 0);
    Animated.spring(this.pos4, {
      toValue: {
        x: WIDTHMIDDLE - 50,
        y: 10
      }
    }).start();

    this.ballMov = new Animated.ValueXY(0, 0);
    let max = 12;
    let min = 5;
    let randomNum = Math.floor(Math.random() * (max - min)) + min;
    let flag = 0;
    let winner = 0;

    //ball going to the corner
    this.interval = setInterval(() => {
      if (flag == 0) {
        winner = 4;
        Animated.spring(this.ballMov, {
          toValue: { x: -WIDTHMIDDLE + 100, y: HEIGHTMIDDLE - 100 }
        }).start();
        flag = Math.floor(Math.random() * 4);
      } else if (flag == 1) {
        winner = 2;
        Animated.spring(this.ballMov, {
          toValue: { x: -WIDTHMIDDLE + 100, y: -HEIGHTMIDDLE + 100 }
        }).start();
        flag = Math.floor(Math.random() * 4);
      } else if (flag == 2) {
        winner = 3;
        Animated.spring(this.ballMov, {
          toValue: { x: WIDTHMIDDLE - 100, y: HEIGHTMIDDLE - 100 }
        }).start();
        flag = Math.floor(Math.random() * 4);
      } else if (flag == 3) {
        winner = 1;
        Animated.spring(this.ballMov, {
          toValue: { x: WIDTHMIDDLE - 100, y: -HEIGHTMIDDLE + 100 }
        }).start();
        flag = Math.floor(Math.random() * 4);
      } else if (flag == -1) {
        clearInterval(this.interval);
        Alert.alert(
          "WINNER WINNER CHICKEN DINNER!",
          "the winner is: Player #" + winner.valueOf(),
          [
            {
              text: "Go to Lobby",
              onPress: async () => {
                let res = await fetch("http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/deleteImages");
                console.warn(res);
                this.props.navigation.navigate("friendsPage");
              }
            }
          ],
          { cancelable: false }
        );
      }
    }, 300);
    this.timerInt = setInterval(() => {
      randomNum -= 1;
      if (randomNum == 0) {
        clearInterval(this.timerInt);
        flag = -1;
      }
    }, 1000);
  }
  render() {
    return (
      <View>
        <View style={styles.generalPos}>
          <Animated.View style={this.pos1.getLayout()}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.state.params.images[3].Image
              }}
            />
          </Animated.View>
          <Animated.View style={this.pos2.getLayout()}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.state.params.images[2].Image
              }}
            />
          </Animated.View>
          <Animated.View style={this.pos3.getLayout()}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.state.params.images[0].Image
              }}
            />
          </Animated.View>
          <Animated.View style={this.pos4.getLayout()}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.navigation.state.params.images[1].Image
              }}
            />
          </Animated.View>
        </View>
        <Animated.View style={this.ballMov.getLayout()}>
          <Image
            source={require("../images/beerTop.png")}
            style={styles.beerBall}
          />
        </Animated.View>
      </View>
    );
  }
}
const WIDTHMIDDLE = Dimensions.get("window").width / 2;
const HEIGHTMIDDLE = Dimensions.get("window").height / 2;
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const styles = {
  generalPos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    width: 80,
    height: 80
  },
  beerBall: {
    height: 30,
    width: 30,
    left: WIDTHMIDDLE - 15,
    top: HEIGHTMIDDLE - 15
  }
};
