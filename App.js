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

const ItemJson = {
  name: "",
  amount: "",
  previousAmounts: []
}

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      debug: "",
      modalVisible: false,
      items: [],
      existingModalVisisble: false,
      existingName: "",
      existingAmount: "",
      existingPreviousAmounts: []
    };
  }

  componentDidMount() {
    this.get_items();
  }

  // Add new item modal
  setModalVisible = (visible) => {
   this.setState({modalVisible: visible});
  }

  // Edit existing item modal
  existingModalVisisble = (visible) => {
   this.setState({existingModalVisisble: visible});
  }

 openItem = (name, amount) => {
   this.setState({
     existingName: name,
     existingAmount: amount,
     existingPreviousAmounts: []
   });
   this.existingModalVisisble(true);
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
       <Item key={i} name={store[i][0]} amount={store[i][1]} openItem={this.openItem} edit={false} />
     );
    return (
      <View style={styles.container}>
        {items}

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.existingModalVisisble}
          onRequestClose={() => {alert("Modal has been closed.")}} >
          <AddItem add_item={this.add_item}
                   name={this.state.editName}
                   amount={this.state.editAmount}
                   previousAmounts={this.state.editPreviousAmounts}
          />
          <TouchableHighlight onPress={() => {
            this.existingModalVisisble(!this.state.existingModalVisisble)
          }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </Modal>
        <FAB buttonColor="red" iconTextColor="#FFFFFF"
                               onClickAction={() => {  this.existingModalVisisble(true) }}
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
