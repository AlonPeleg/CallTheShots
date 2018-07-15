import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions } from "react-native";


export default class AddFriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      playerCounter: 0
    };
  }
componentDidMount(){
  this.refreshPlayerCount();
}

  static navigationOptions = {
    header: null
  };


  goPlay = async () => {
    let res = await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/getPhotoUri",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    let json = await res.json();
    let theJson = JSON.parse(json.d);
    this.setState({ photos: theJson });
    //console.warn(this.state.photos[0].Image);
    this.props.navigation.navigate("fourGame", { images: this.state.photos });
  };

  marioGame = async () => {
    let res = await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/getPhotoUri",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    let json = await res.json();
    let theJson = JSON.parse(json.d);
    this.setState({ photos: theJson });
    //console.warn(this.state.photos[0].Image);
    this.props.navigation.navigate("twoGame", { images: this.state.photos });
  };
  deleteImages =async  () => {
   await fetch("http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/deleteImages");
   this.refreshPlayerCount();
  }
  refreshPlayerCount = async () => {
    let res = await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site07/webservice.asmx/getPlayers",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    let json = await res.json();
    let theJson = JSON.parse(json.d);
    this.setState({ playerCounter: theJson })
  }
  checkPlayersFours=async()=>{
    await this.refreshPlayerCount();
    if(this.state.playerCounter==4)
    {
      this.goPlay();
    }
    else {
      console.warn("not enough players for 4");
    }
  }
  checkPlayersTwos = async () => {
    await this.refreshPlayerCount();
    if (this.state.playerCounter == 2) {
      this.marioGame();
    }
    else {
      console.warn("not enough players for 2");
    }
  }
  render() {
    return (

      <View>
        <Image source={require('../images/friendsBackground.jpg')} style={styles.backgroundStyle} />
        <TouchableOpacity
          style={{ top: HEIGHT - 200, left: WIDTHMIDDLE + 35 }}
          onPress={this.checkPlayersFours}
        >
          <Image
            style={{ width: 70, height: 70, opacity: 0.7, }}
            source={require("../images/bottleButton.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHT - 270, left: WIDTHMIDDLE - 115, width: 70, height: 70 }}
          onPress={this.checkPlayersTwos}
        >
          <Image
            style={{ width: 70, height: 70, opacity: 0.7 }}
            source={require("../images/marioButton.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHT - 190, left: WIDTHMIDDLE - 25, width: 70, height: 70 }}
          onPress={() => { this.props.navigation.navigate("cameraPage",{refreshfunction:this.refreshPlayerCount}) }}
        >
          <Image
            style={{ height: 40, width: 40, opacity: 0.6 }}
            source={require("../images/addPicture.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHT - 260, left: WIDTHMIDDLE - 100, width: 70, height: 70 }}
          onPress={this.deleteImages}
        >
          <Image
            style={{ height: 40, width: 40, opacity: 0.6 }}
            source={require("../images/deleteImagesPic.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHT - 331, left: WIDTHMIDDLE + 50, width: 70, height: 70 }}
          onPress={this.refreshPlayerCount}
        >
          <Image
            style={{ height: 40, width: 40, opacity: 0.6 }}
            source={require("../images/refreshPlayers.png")}
          />
        </TouchableOpacity>
        <View style={{ top: HEIGHT-450, left:WIDTHMIDDLE-60 }}>
          <Text>Player Count: {this.state.playerCounter}</Text>
        </View>
      </View>
    );
  }
}

const WIDTHMIDDLE = Dimensions.get("window").width / 2;
const HEIGHTMIDDLE = Dimensions.get("window").height / 2;
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  players: {
    top: HEIGHT - 50,
    left: WIDTHMIDDLE
  },
  backgroundStyle: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    resizeMode: 'cover',
  },
};
