import React from 'react';
import { Text } from 'react-native';

const Header = () => {
    return (
        <Text style={styles.textStyle} textAlign='center'>Call The Shots</Text>
    );
}

const styles = {
textStyle: {
    position: 'absolute',
    margin: 24,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#34495e',
    top: 1
  },
}

export default Header;
