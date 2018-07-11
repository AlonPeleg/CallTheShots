import React, { Component } from "react";
import { View, Text, Button, Image } from "react-native";
import { Body } from "native-base";

export default class AddFriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  componentWillMount() {
    console.log(this.props.navigation.getParam("photo"));
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
      <View style={styles.containerStyle}>
        <Text> This is the second page </Text>
        <Button title="Play" onPress={this.goPlay} />
        <Button
          title="Camera"
          onPress={() => {
            this.props.navigation.navigate("cameraPage");
          }}
        />
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri:
              "https://facebook.github.io/react-native/docs/assets/favicon.png"
          }}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageStyle: {
    flex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  }
};
