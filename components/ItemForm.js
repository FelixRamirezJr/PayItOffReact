import React from 'react';
import { StyleSheet,
         Text,
         View,
         Modal,
         TouchableOpacity,
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
    this.props.removeItem( this.props.name );
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
      mainItemFunction = "Create";
    }

    if( !newItem ) {
      //deleteButton = <Button style={styles.remove_item_button} onPress={this.delete} title="Remove" />;
      deleteButton = <TouchableOpacity
                      onPress={() => {
                        this.delete()
                      }}>
                        <Text style={styles.remove_item_button}> Remove Item </Text>
                      </TouchableOpacity>;
    }

    return (
      <View style={styles.container} >
        <TextInput style={styles.input}
                   placeholder="Name"
                   onChangeText={(name) => this.setState({name})}
                   value={this.state.name}
        />
        <TextInput style={styles.amount_input}
                   onChangeText={(amount) => this.setState({amount})}
                   value={this.state.amount}
                   keyboardType="numeric"
                   placeholder="Amount" />

        <TouchableOpacity
        style={styles.add_item_button}
        onPress={() => {
          if( mainItemFunction == "Update" ) {
            this.delete();
          }
          this.props.add_item( this.state.name, this.state.amount );
        }}>
          <Text style={styles.mainItemFunction}> { mainItemFunction } </Text>
        </TouchableOpacity>
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
    width: '100%',
    padding: 5,
    fontSize: 35
  },
  amount_input: {
    width: '100%',
    padding: 5,
    fontSize: 35,
    color: "#4DB6AC"
  },
  add_item_button: {
    marginTop: 5,
  },
  remove_item_button: {
    marginTop: 15,
    color: 'red',
    fontSize: 20
  },
  mainItemFunction: {
    marginBottom: 15,
    fontSize: 20
  }
});
