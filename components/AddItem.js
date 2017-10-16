import React from 'react';
import { StyleSheet,
         Text,
         View,
         Modal,
         TouchableHighlight,
         Button,
         TextInput
       } from 'react-native';


export default class AddItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: this.props.existingName,
      amount: this.props.existingAmount,
      previousAmounts: this.props.existingPreviousAmounts
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <TextInput style={styles.input}
                   placeholder="Name"
                   onChangeText={(name) => this.setState({name})}
                   value={this.state.name}
        />
        <TextInput style={styles.input}
                   onChangeText={(amount) => this.setState({amount})}
                   value={this.state.amount}
                   placeholder="Amount" />

        <TouchableHighlight
        style={styles.add_item_button}
        onPress={() => {
          this.props.add_item( this.state.name, this.state.amount );
        }}>
          <Text>Add Item</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    width: '100%'
  },
  add_item_button: {
    marginTop: 5
  }
});
