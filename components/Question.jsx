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

export default function Question() {
  const [user, setUser] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [Answer, setAnswer] = useState('');
  const [Question, setQuestion] = useState('');
  const [all, setAll] = useState([]);
  const [searc, setSearch] = useState('')

  useEffect(() => {
    const fetch = async () => {
      await UserData();
    };
    fetch();
  }, []);

  useEffect(() => {
    SubCategoryData();
    GetQuestions();
  }, [user]);

  const UserData = async () => {
    const data = await AsyncStorage.getItem('User');
    const users = JSON.parse(data);
    if (users.data) {
      setUser(users.data.token);
    }
  };

  const SubCategoryData = () => {
    try {
      axios
        .get('https://interviewhub-3ro7.onrender.com/subcatagory/', {
          headers: {
            Authorization: user,
          },
        })
        .then((res) => {
          if (res.data) {
            setAll(res.data.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addQuestion = () => {
    try {
      axios
        .post(
          `https://interviewhub-3ro7.onrender.com/questions/create`,
          {
            questions: Question,
            answer: Answer,
            subcatagoryID: id,
          },
          {
            headers: {
              Authorization: user,
            },
          }
        )
        .then((res) => {
          if (res.data) {
            Alert.alert('Your data was successfully added');
            setOpen(false);
            GetQuestions()
          }
        })
        .catch((e) => {
          console.log(e);
          Alert.alert('Your data was already added');
        });
    } catch (error) {
      console.log(error);
    }
    setId(null);
    setAnswer('');
    setQuestion('');
  };

  const GetQuestions = () => {
    try {
      axios
        .get('https://interviewhub-3ro7.onrender.com/questions/', {
          headers: {
            Authorization: user,
          },
        })
        .then((res) => {
          if (res.data) {
            setData(res.data.data);
            console.log(res.data.data);

          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`https://interviewhub-3ro7.onrender.com/questions/${id}`, {
        headers: {
          Authorization: user,
        },
      });
      Alert.alert('Question deleted successfully!');
      GetQuestions();
    } catch (error) {
      console.log(error);
      Alert.alert('Error deleting question');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor="black"
          onChangeText={setSearch}
          value={searc}
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Ionicons name="add-circle" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <Dialog.Container visible={open}>
        <Dialog.Title>Add Question</Dialog.Title>
        <DialogInput
          placeholder="Add Question"
          onChangeText={setQuestion}
          value={Question}
        />
        <DialogInput
          placeholder="Add Answer"
          onChangeText={setAnswer}
          value={Answer}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#1f33e4' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={all}
          search
          maxHeight={300}
          labelField="subCatagoryname"
          valueField="_id"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item);
            setId(item._id);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? '#ffffff' : 'white'}
              name="Safety"
              size={20}
            />
          )}
        />
        <Dialog.Button label="Cancel" onPress={() => setOpen(false)} />
        <Dialog.Button label="Add" onPress={addQuestion} />
      </Dialog.Container>
      <View>
        {
          Data.length ? (
            
            Data.filter((el, inx) => {
            return el.questions.toLocaleLowerCase().includes(searc.toLocaleLowerCase())
          }).map((el, inx) => {
            return (
              <View key={inx} style={[styles.dataItem, { width: '99%' }]}>
                <Text style={[styles.dataText, { color: 'white' }]}>{el.questions}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <TouchableOpacity
                    style={styles.BTN}
                    onPress={() => deleteQuestion(el._id)}
                  >
                    <AntDesign name="delete" size={24} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ):(
          <View style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
          <Text style={{fontSize:50}}>No Data Found</Text>
          </View>
        )
        }
      </View>
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
    color: 'black',
    paddingHorizontal: 15,
    width: '90%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#060606',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dataItem: {
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
  dataText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    padding: 2,
  },
  BTN: {
    marginHorizontal: 8,
  },
});