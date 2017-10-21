import React from 'react';
import { StyleSheet,
         Text,
         View,
         TextInput,
         Modal,
         TouchableHighlight,
         Button
       } from 'react-native';

import Prompt from 'react-native-prompt';


export default class Item extends React.Component {

  constructor(props) {
    super()
    this.state = {
      modalVisible: false
    };
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
          <Text>
            { this.props.name } , { this.props.amount }
          </Text>
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
            onSubmit={ (value) => this.setState({
              promptVisible: false,
              message: `You said "${value}"`
            }) }/>

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
