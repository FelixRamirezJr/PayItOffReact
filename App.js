import React from 'react';
import { StyleSheet,
         Text,
         View,
         ScrollView,
         Modal,
         AsyncStorage,
         TouchableHighlight } from 'react-native';
import FAB from 'react-native-fab';
import ItemForm from './components/ItemForm';
import Item from './components/Item';
import Icon from 'react-native-fa-icons';

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
    this.setState({
      editName: name,
      editAmount: amount,
      editPreviousAmounts: []
    });
    this.existingModalVisisble(true);
  }

 removeItem = (name) => {
   try {
     AsyncStorage.removeItem(name);
     this.refresh();
   } catch (error) {
     console.log("Error could not save data");
   }
 }

  add_item = (name, amount) => {
    try {
      AsyncStorage.setItem(name, amount);
      this.refresh();
    } catch (error) {
      console.log("Error could not save data");
    }
  }

  refresh = () => {
    this.get_items();
    this.existingModalVisisble(false);
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
       <Item key={i} name={store[i][0]} amount={store[i][1]} openItem={this.openItem} edit={false} removeItem={this.removeItem} add_item={this.add_item} />
     );
    return (
      <View style={styles.container}>
        <ScrollView>
          {items}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.existingModalVisisble}
            onRequestClose={() => {}} >
            <ItemForm add_item={this.add_item}
                     name={this.state.editName}
                     amount={this.state.editAmount}
                     previousAmounts={this.state.editPreviousAmounts}
                     removeItem={this.removeItem}
            />
            <TouchableHighlight style={styles.hideModal} onPress={() => {
              this.existingModalVisisble(!this.state.existingModalVisisble);
            }}>
              <Text style={{ fontSize: 35, color: 'black' }}>
                <Icon name='close' allowFontScaling />
              </Text>
            </TouchableHighlight>
          </Modal>
        </ScrollView>
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
  hideModal: {
    position: 'absolute',
    top: 25,
    right: 25
  }
});
