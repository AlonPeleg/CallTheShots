import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Constants } from 'expo';

const BackgroundImage = () => {
    const { containerStyle } = styles;
    return (
        <Image source={require('../images/backgroundImgMain.jpg')} style={containerStyle} />
    );
};
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = {
    containerStyle: {
        width: WIDTH,
        height: HEIGHT,
        position: 'absolute',
        resizeMode: 'cover',
    },
};

export default BackgroundImage;