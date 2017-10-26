import React from 'react';
import { StyleSheet,
         Text,
         View,
         TextInput,
         Modal,
         TouchableHighlight,
         Button,
         Platform
       } from 'react-native';

import Prompt from 'react-native-prompt';


export default class Item extends React.Component {

  constructor(props) {
    super()
    this.state = {
      modalVisible: false
    };
  }

  pretty = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  updateAmount = ( sub_amount ) => {
    var diff = parseFloat( this.props.amount ) - parseFloat( sub_amount );
    if (diff == undefined || diff == NaN){
      alert("Looks like there is a bug with this... Going to set to zero");
      //this.props.add_item( this.props.name, 0 );
    }
    else if( diff < 0 ) {
      // overpaid!
      alert("You overpaid! But congrats you paid off " + this.props.name);
      //this.props.removeItem( this.props.name );
    } else if( diff == 0 ) {
      alert("Congrats! You paid off " + this.props.name);
      //this.props.removeItem( this.props.name );
      //remove
    } else {
      this.props.add_item( this.props.name, diff.toString() );
    }
  }

  pay = () => {
    this.setState({ promptVisible: true });
  }

  edit = () => {
    this.props.openItem( this.props.name, this.props.amount );
  }

  render() {
    var popupTitle = "Paid " + this.props.name + " how much?";
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => { this.edit() }}>
          <View>
            <Text style={styles.itemName}>
              { this.props.name }
            </Text>
            <Text style={styles.itemAmount}>
             ${ this.pretty(this.props.amount) }
            </Text>
          </View>
        </TouchableHighlight>

        <Button
          onPress={this.pay}
          title="Paid"
        />

        <Prompt
            title={popupTitle}
            placeholder="100"
            visible={ this.state.promptVisible }
            onCancel={ () => this.setState({
              promptVisible: false,
              message: "You cancelled"
            }) }
            onSubmit={ (value) => {
              this.setState({promptVisible: false});
              this.updateAmount(value);
            }
          }/>

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
  },
  itemName: {
    marginBottom: (Platform.OS === 'ios') ? 5 : 20,
    marginTop: (Platform.OS === 'ios') ? 5 : 20,
    fontSize: (Platform.OS === 'ios') ? 15 : 25,
    textAlign: 'center'
  },
  itemAmount: {
    marginBottom: (Platform.OS === 'ios') ? 5 : 20,
    fontSize: (Platform.OS === 'ios') ? 25 : 45,
    textAlign: 'center',
    color: '#4DB6AC'
  }
});
