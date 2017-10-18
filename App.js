import React from 'react';
import { StyleSheet,
         Text,
         View,
         Modal,
         AsyncStorage,
         TouchableHighlight } from 'react-native';
import FAB from 'react-native-fab';
import ItemForm from './components/ItemForm';
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
      editName: "",
      editAmount: "",
      editPreviousAmounts: []
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
   //alert(name);
   //alert(amount);
   this.setState({
     editName: name,
     editAmount: amount,
     editPreviousAmounts: []
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
          <ItemForm add_item={this.add_item}
                   name={this.state.editName}
                   amount={this.state.editAmount}
                   previousAmounts={this.state.editPreviousAmounts}
          />
          <TouchableHighlight onPress={() => {
            this.existingModalVisisble(!this.state.existingModalVisisble);
          }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </Modal>
        <FAB buttonColor="red" iconTextColor="#FFFFFF"
                               onClickAction={() => {
                                 this.setState({ editName: "",
                                                 editAmount: "",
                                                 editPreviousAmounts: []});
                                 this.existingModalVisisble(true);
                               }}
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
    marginTop: 15
  },
});
