import React from 'react';
import { StyleSheet,
         Text,
         View,
         Modal,
         AsyncStorage,
         TouchableHighlight } from 'react-native';
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

  componentDidMount() {
    this.get_items();
  }

  setModalVisible = (visible) => {
   this.setState({modalVisible: visible});
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

  get_items = () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
       stores.map((result, i, store) => {
         // get at each store's key/value so you can work with it
         let key = store[i][0];
         let value = store[i][1];
         this.setState({ debug: this.state.debug + key + value });
        });
      });
    });
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
