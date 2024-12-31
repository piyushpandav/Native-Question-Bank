import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import Dialog from 'react-native-dialog';
import DialogInput from 'react-native-dialog/lib/Input';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SubCategory() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [el, setEl] = useState('');
  const [all, setAll] = useState([]);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateSubCategory, setUpdateSubCategory] = useState('');
  const [updateId, setUpdateId] = useState('');

  useEffect(() => {
    const fetch = async () => {
      await getUserData();
    };
    fetch();
  }, []);

  const getUserData = async () => {
    const data = await AsyncStorage.getItem('User');
    const users = JSON.parse(data);
    if (users?.data) {
      setUser(users.data.token);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCategories();
      fetchSubCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://interviewhub-3ro7.onrender.com/catagory/', {
        headers: { Authorization: user },
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
        headers: { Authorization: user },
      });
      setAll(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addSubCategory = async () => {
    try {
      const response = await axios.post(
        'https://interviewhub-3ro7.onrender.com/subcatagory/create',
        { subCatagoryname: el, catagoryID: id },
        { headers: { Authorization: user } }
      );
      Alert.alert('SubCategory added successfully!');
      fetchSubCategories();
      setOpen(false);
      setEl('');
      setId(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error adding SubCategory');
    }
  };

  const updateSubCategoryData = async () => {
    try {
      await axios.patch(
        `https://interviewhub-3ro7.onrender.com/subcatagory/${updateId}`,
        { subCatagoryname: updateSubCategory },
        { headers: { Authorization: user } }
      );
      Alert.alert('SubCategory updated successfully!');
      setUpdateVisible(false);
      fetchSubCategories();
    } catch (error) {
      console.error(error);
      Alert.alert('Error updating SubCategory');
    }
  };

  const deleteSubCategory = async (id) => {
    try {
      await axios.delete(`https://interviewhub-3ro7.onrender.com/subcatagory/${id}`, {
        headers: { Authorization: user },
      });
      Alert.alert('SubCategory deleted successfully!');
      fetchSubCategories();
    } catch (error) {
      console.error(error);
      Alert.alert('Error deleting SubCategory');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput placeholder="Search" style={styles.input} placeholderTextColor="black" />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Ionicons name="add-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Add SubCategory Dialog */}
      <Dialog.Container visible={open}>
        <Dialog.Title>Add SubCategory</Dialog.Title>
        <DialogInput placeholder="Enter SubCategory" onChangeText={setEl} value={el} />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#1f33e4' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          labelField="catagoryName"
          valueField="_id"
          placeholder={!isFocus ? 'Select Category' : '...'}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.catagoryName);
            setId(item._id);
            setIsFocus(false);
          }}
        />
        <Dialog.Button label="Cancel" onPress={() => setOpen(false)} />
        <Dialog.Button label="Add" onPress={addSubCategory} />
      </Dialog.Container>

      {/* SubCategory List */}
      {all.map((el, inx) => (
        <View key={inx} style={styles.datas}>
          <Text style={styles.text}>{el.subCatagoryname}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setUpdateId(el._id);
                setUpdateSubCategory(el.subCatagoryname);
                setUpdateVisible(true);
              }}
            >
              <FontAwesome name="edit" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => deleteSubCategory(el._id)}>
              <AntDesign name="delete" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Update SubCategory Dialog */}
      <Dialog.Container visible={updateVisible}>
        <Dialog.Title>Update SubCategory</Dialog.Title>
        <DialogInput
          placeholder="Enter SubCategory Name"
          value={updateSubCategory}
          onChangeText={setUpdateSubCategory}
        />
        <Dialog.Button label="Cancel" onPress={() => setUpdateVisible(false)} />
        <Dialog.Button label="Update" onPress={updateSubCategoryData} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aca5a5',
    paddingVertical: 10,
    borderRadius: 10,
    color: '#000',
    paddingHorizontal: 15,
    width: '90%',
  },
  datas: {
    marginVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  btn: {
    marginHorizontal: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
});
