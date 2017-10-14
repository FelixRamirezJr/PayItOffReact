import React from 'react';
import { StyleSheet,
         Text,
         View,
         Modal,
         AsyncStorage,
         TouchableHighlight } from 'react-native';
import FAB from 'react-native-fab';
import AddItem from './components/AddItem';
import Item from './components/Item';


export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      debug: "",
      modalVisible: false,
      items: []
    };
  }

  componentDidMount() {
    this.get_items();
  }

  setModalVisible = (visible) => {
   this.setState({modalVisible: visible});
 }

 openItem = (name) => {
   //this.setState({debug: "Test"});
 }

  add_item = (name, amount) => {
    try {
      AsyncStorage.setItem(name, amount);
      this.get_items()
    } catch (error) {
      this.setState({ debug: error.toString() });
      console.log("Error could not save data");
    }
  }

  get_items = () =>
  {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        this.setState({ items: stores });
      });
    });
  }

  render() {
    let items = this.state.items.map((result, i, store) =>
       <Item key={i} name={store[i][0]} amount={store[i][1]} />
     );
    return (
      <View style={styles.container}>
        <Text> {this.state.debug} </Text>
        {items}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}} >
          <AddItem  add_item={this.add_item} />
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
  },
});
