import { StyleSheet, Text, View,Modal,Alert,Image,TextInput,Button} from 'react-native'
import React, { useState } from 'react';
export default function TodoInput({visible,onAddTodo,onCancel}) {
  const [enteredTodoText, setEnteredTodoText] = useState('');

  const addTodoHandler = () => {
    onAddTodo(enteredTodoText);
    setEnteredTodoText('');
  };
  return (
    <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            <Image style={styles.image} source={require('../assets/images/logo.png')}/>
            <TextInput style={styles.textInput} placeholder="Add something to the to-do list :)"
            value={enteredTodoText}
            onChangeText={(text) => setEnteredTodoText(text)}
            />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <Button  title="Add" color='rgba(29, 125,6, 1)' onPress={addTodoHandler}
                />
            </View>
            <View style={styles.button}>
                <Button  title="Cancel" color='rgba(255, 0, 0, 1)' onPress={onCancel}
                />
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    margin: 50,
    marginTop:80,
    alignSelf:'center'
  },
  textInput: {
    borderWidth: 2,
    width: '90%',
    padding: 8,
    borderRadius: 10,
    borderColor: 'gray',
    alignSelf:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf:'center',
  },
  button: {
    width: 100,
    marginHorizontal: 8,
    
  },
});