import React from 'react';
import { StyleSheet,
         Text,
         View,
         TextInput,
         Modal,
         TouchableOpacity,
         Button,
         Platform
       } from 'react-native';

import Prompt from 'react-native-prompt';

export default class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      popupTitle: "Paid '" + this.props.name + "' how much?"
    };
  }

  pretty = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  updateAmount = ( sub_amount ) => {
    var message = null;
    var diff = parseFloat( this.props.amount ) - parseFloat( this.props.beautify(sub_amount) );
    if ( diff == undefined || isNaN(diff) )
    {
      if( !this.state.popupTitle.includes("ONLY NUMBERS") ) {
        this.setState({ popupTitle: this.state.popupTitle + " ( ONLY NUMBERS PLEASE )" });
      }
    }
    else
    {
      diff = +diff.toFixed(2);
      if( diff < 0 )
      {
        message = "You overpaid! But congrats you paid off " + this.props.name;
      } else if( diff == 0 ) {
        message = "Congrats! You paid off" + this.props.name;
      }
      this.props.add_item( this.props.name, diff.toString() );
      this.setState({promptVisible: false}, function() {
      });

    }
    if( message ) { alert(message); }
  }

  pay = () => {
    this.setState({ promptVisible: true });
  }

  edit = () => {
    this.props.openItem( this.props.name, this.props.amount );
  }

  render() {
    var paidButton = null;
    if( parseFloat( this.props.amount ) > 0 ){
      paidButton = <Button onPress={this.pay} title="Paid" />;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.edit() }}>
          <View>
            <Text style={styles.itemName}>
              { this.props.name }
            </Text>
            <Text style={styles.itemAmount}>
             ${ this.pretty(this.props.amount) }
            </Text>
          </View>
        </TouchableOpacity>

        {paidButton}

        <Prompt
            title={this.state.popupTitle}
            placeholder="100"
            visible={ this.state.promptVisible }
            textInputProps={{keyboardType: 'numeric'}}
            onCancel={ () => this.setState({
              promptVisible: false,
              message: "You cancelled"
            }) }
            onSubmit={ (value) => {
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
    textAlign: 'center',
    fontWeight: 'bold'
  },
  itemAmount: {
    marginBottom: (Platform.OS === 'ios') ? 5 : 20,
    fontSize: (Platform.OS === 'ios') ? 25 : 45,
    textAlign: 'center',
    color: '#4DB6AC'
  }
});
