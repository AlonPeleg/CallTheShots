import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions } from "react-native";

let playerCount = 0;
export default class AddFriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }
  componentWillMount() {

  }

  changePhoto = photo => {
    this.setState({ photo: photo }, console.log(photo));
  };

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
  render() {
    console.log(this.props.navigation.getParam("photo", "hello"));
    return (

      <View>
        <View style={{ top: HEIGHTMIDDLE - 100, left: 50 }}>
          <Text>{playerCount}/4</Text>
        </View>
        <TouchableOpacity
          style={{ top: HEIGHTMIDDLE - 150, left: WIDTHMIDDLE - 30 }}
          onPress={this.goPlay}
        >
          <Image
            style={{ width: 70, height: 70 }}
            source={require("../images/bottleButton.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ top: HEIGHT - 150, left: WIDTH - 55 }}
          onPress={() => { this.props.navigation.navigate("cameraPage") }}
        >
          <Image
            style={{ height: 50, width: 50 }}
            source={require("../images/addPicture.png")}
          />
        </TouchableOpacity>

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
  }
};
