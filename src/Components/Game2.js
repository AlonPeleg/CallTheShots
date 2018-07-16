import React, { Component } from "react";
import { View, Button, Image, LayoutAnimation, Text } from "react-native";

const tickCount = Math.floor(Math.random() * 5) + 2;
const timevar = 0

export default class Game2 extends Component {
    state = {
        arrowPos: 0,
        arrowSpeed: 40
    };

    componentDidMount() {
        let timez = Math.floor(Math.random() * 2000 + 2000);
        this.inty(10, 5, timez);
        this.inty(2, 2, timez - 1000);
        this.lastic();
        this.spinspeed();

    }
    inty = (spd, tick, TO) => {
        timevar += TO + (this.state.arrowSpeed / tick) * 0.8; // interval times algoritam
        this.interval = setInterval(() => {
            //arrow spin speed
            this.timeOut = setTimeout(() => {
                if (this.state.arrowSpeed >= spd)
                    this.setState({ arrowSpeed: this.state.arrowSpeed - tick });
                else if (this.state.arrowSpeed <= spd) {
                    clearInterval(this.interval);

                }
            }, TO);
        }, 800)

    };

    lastic = () => {
        this.timeOut = setTimeout(() => {
            this.interval2 = setInterval(() => {
                this.setState({ arrowPos: this.state.arrowPos + 10 });
                tickCount--;
                if (tickCount <= 0) {
                    if (this.state.arrowPos < 180)
                        console.warn("red won")
                    else
                        console.warn("yellow won")
                    clearInterval(this.interval2);
                }
            }, 1000);
        }, timevar + 3);

    };

    spinspeed = () => {
        //arrow spinning
        this.interval = setInterval(() => {
            // Animate the upate
            // LayoutAnimation.spring();
            // flag = Math.floor(Math.random() * 2);
            this.setState({ arrowPos: this.state.arrowPos + this.state.arrowSpeed });
        }, 50);

    };
    render() {
        return (
            <View>
                <Image style={styles.wheel} source={require("../images/spinItWheel.png")} />
                <Image
                    style={{
                        position: "absolute",
                        top: 362,
                        left: 128,
                        height: 65,
                        width: 120,
                        transform: [{ rotate: this.state.arrowPos + "deg" }]
                    }}
                    source={require("../images/arrow.png")}
                />
                <Image
                    style={styles.imageStyle}
                    source={{
                        uri: this.props.navigation.state.params.images[0].Image
                    }}
                />
                <Image
                    style={styles.imageStyle2}
                    source={{
                        uri: this.props.navigation.state.params.images[1].Image
                    }}
                />
                <Image
                    style={styles.imageStyle3}
                    source={{
                        uri: this.props.navigation.state.params.images[2].Image
                    }}
                />
                <Button title="check Deg" onPress={() =>
                    console.warn(this.state.arrowPos % 360)} />
                <Button title="Back" style={{ top: 50 }} onPress={
                    () => {
                        this.setState({ arrowPos: 0 })
                        timevar = 0;
                        tickCount = Math.floor(Math.random() * 5) + 2;
                        this.props.navigation.navigate("friendsPage")
                    }
                } />
            </View>
        );
    }
}
const styles = {
    wheel: {
        position: "absolute",
        top: 250,
        left: 25,
        height: 303.75,
        width: 324.75
    },
    imageStyle: {
        width: 80,
        height: 80,
        position: "absolute",
        top: 100,
        right: 38,
        borderRadius: 70
    },
    imageStyle2: {
        width: 80,
        height: 80,
        position: "absolute",
        top: 100,
        left: 38,
        borderRadius: 70
    },
    imageStyle3: {
        width: 80,
        height: 80,
        position: "absolute",
        top: 100,
        left: 145,
        borderRadius: 70
    },
};