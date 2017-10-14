import React from 'react';
import { StyleSheet,
         Text,
         View,
         TextInput,
         Modal,
         TouchableHighlight
       } from 'react-native';


export default class Item extends React.Component {

  constructor(props) {
    super()
    this.state = {
      modalVisible: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => { alert('helo') }}>
          <Text>
            { this.props.name } , { this.props.amount }
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
});
