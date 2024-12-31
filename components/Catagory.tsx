import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';
import DialogInput from 'react-native-dialog/lib/Input';
import axios from 'axios';
import Loader from './Loader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Category() {
  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [Search, setSearch] = useState('')

  useEffect(() => {
    const fetch = async () => {
      await UserData();
    };
    fetch();
  }, []);

  useEffect(() => {
    GetCategory();
  }, [user]);

  const UserData = async () => {
    const data = await AsyncStorage.getItem('User');
    const users = JSON.parse(data);
    if (users.data) {
      console.log(users.data.token);

      setUser(users.data.token);
    }

  };

  const GetCategory = () => {
    try {
      axios
        .get('https://interviewhub-3ro7.onrender.com/catagory/', {
          headers: {
            Authorization: user,
          },
        })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const AddData = () => {
    try {
      axios
        .post(
          'https://interviewhub-3ro7.onrender.com/catagory/create',
          {
            catagoryName: category,
          },
          {
            headers: {
              Authorization: user,
            },
          }
        )
        .then((res) => {
          alert('Successfully added');
          setVisible(false);
          setCategory('');
          GetCategory();
        });
    } catch (error) {
      console.log(error);
    }
    setCategory('');
  };

  const Update = () => {

    try {
      axios
        .patch(
          `https://interviewhub-3ro7.onrender.com/catagory/${updateId}`,
          {
            catagoryName: updateCategory,
          },
          {
            headers: {
              Authorization: user,
            },
          }
        )
        .then((res) => {
          Alert.alert('Category updated successfully!');
          setUpdateVisible(false);
          setUpdateCategory('');
          GetCategory();
        });
    } catch (error) {
      console.log(error);
      Alert.alert('Error updating category');
    }
  };

  const deletes = (id) => {
    try {
      axios
        .delete(`https://interviewhub-3ro7.onrender.com/catagory/${id}`, {
          headers: {
            Authorization: user,
          },
        })
        .then((res) => {
          Alert.alert('Successfully deleted category!');
          GetCategory();
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(Search);


  return (
    <View style={style.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
        <TextInput placeholder="Search" style={style.input} placeholderTextColor="black" onChangeText={setSearch} value={Search} />
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Ionicons name="add-circle" size={40} color="black" />
        </TouchableOpacity>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Category Add</Dialog.Title>
          <DialogInput placeholder="Add Category" value={category} onChangeText={setCategory} />

          <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
          <Dialog.Button label="Add" onPress={AddData} />
        </Dialog.Container>
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        data.length ? (
          data.filter((el, inx) => {
            return el.catagoryName.toLocaleLowerCase().includes(Search.toLocaleLowerCase())
          }).map((el, inx) => (
            <View key={inx} style={style.Datas}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', padding: 2 }}>
                {el.catagoryName}
              </Text>
              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={style.BTN} onPress={() => {
                  setUpdateId(el._id);
                  setUpdateCategory(el.catagoryName);
                  setUpdateVisible(true);
                }}
                >
                  <FontAwesome name="edit" size={24} color="#ffffff" />
                </TouchableOpacity>

                <TouchableOpacity style={style.BTN} onPress={() => deletes(el._id)}>
                  <AntDesign name="delete" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={{ justifyContent: 'center', alignItems: "center", flex: 1, }}>
            <Text style={{ fontSize: 50, }} >Data Not Found </Text>
          </View>
        )

      )}

      {/* Update Dialog */}
      <Dialog.Container visible={updateVisible}>
        <Dialog.Title>Update Category</Dialog.Title>
        <DialogInput
          placeholder="Enter new category name"
          value={updateCategory}
          onChangeText={setUpdateCategory}
        />
        <Dialog.Button label="Cancel" onPress={() => setUpdateVisible(false)} />
        <Dialog.Button label="Update" onPress={() => Update()} />
      </Dialog.Container>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 10,
    borderRadius: 10,
    color: '#000000',
    paddingHorizontal: 15,
    width: '90%',
  },
  Datas: {
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
  BTN: {
    marginHorizontal: 8,
  },
});
