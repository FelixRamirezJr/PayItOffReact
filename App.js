import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import FAB from 'react-native-fab';
import AddItem from './components/AddItem';


export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      debug: "",
      modalVisible: false,
    };
  }

  setModalVisible = (visible) => {
   this.setState({modalVisible: visible});
 }

  add_item = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text> {this.state.debug} </Text>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}} >
          <AddItem />
          <TouchableHighlight onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </Modal>
        <FAB buttonColor="red" iconTextColor="#FFFFFF"
                               onClickAction={() => {  this.setModalVisible() }}
                               visible={true}
        />
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
  },
});
