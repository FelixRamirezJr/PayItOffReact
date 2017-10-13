import React from 'react';
import { StyleSheet,
         Text,
         View,
         TextInput
       } from 'react-native';


export default class Item extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container} >
        <Text>
          { this.props.name } , { this.props.amount }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%'
  }
});
