import React from 'react';
import { StyleSheet,
         Text,
         View,
         Modal,
         TouchableHighlight,
         Button,
         TextInput
       } from 'react-native';


export default class ItemForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      amount: this.props.amount,
      previousAmounts: this.props.previousAmounts
    }
  }

  delete = () => {

  }

  render() {
    // Get the text for the item buttons
    var newItem = false;
    var deleteButton = null;
    if ( this.props.name == 0 && this.props.amount == 0 ) {
      newItem = true;
    }
    var mainItemFunction = "Update";
    if ( newItem ) {
      mainItemFunction = "Add";
    }

    if( !newItem ) {
      deleteButton = <Button onPress={this.delete} title="Remove" />;
    }

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
          <Text> { mainItemFunction } </Text>
        </TouchableHighlight>
        { deleteButton }

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
