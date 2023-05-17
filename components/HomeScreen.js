import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function HomeScreen({ route, navigation, props }) {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const [myArray, setMyArray] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [allWrestlerInfo, setAllWrestlerInfo] = useState([]);

  const [eventName, setEventName] = useState('');

  const [eventMenu, setEvent] = useState([
    { label: 'Tournament', value: 'Tournament' },
    { label: 'Dual', value: 'Dual' },
    { label: 'Exhibition', value: 'Exhibition' },
  ]);
  const [openEvent, setOpenEvent] = useState(false);
  const [eventTypeValue, setEventTypeValue] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState();

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setFormattedDate(date.toISOString().substr(0, 10));
      
    }
    setShowPicker(false);
  };



const saveData = () => {
  
  if(formattedDate == undefined) {
    var newArray = [{
      eventName: eventName,
      eventType: eventTypeValue,
      meetDate: selectedDate.toISOString().substr(0, 10),
    }];
  } else {
  var newArray = [{
    eventName: eventName,
    eventType: eventTypeValue,
    meetDate: formattedDate,
  }];
}
  setEventName(null);
  setEventTypeValue(null);

  console.log(allEvents);
  console.log(newArray);
  console.log(allWrestlerInfo);
  
  navigation.navigate('NewMatch', { allEvents:allEvents, matchDetails:newArray, allWrestlerInfo:allWrestlerInfo})
};

  return (
   
    <View style={styles.mainSection}>
      <View style={{height:'90%', backgroundColor: '#2D3142'}}>
        <View style={{justifyContent: 'center'}}>
          <View style={styles.textSection}>
            <TextInput 
              style={styles.textInput}
              placeholder='Event Name'
              placeholderTextColor='white'
              textAlign='center'
              borderColor= 'white'
              value={eventName}
              onChangeText={(eventName) => setEventName(eventName)}
            />
            <View style={styles.dropdownSection}>
              <DropDownPicker
                style={{ borderRadius: 0 }}
                dropDownContainerStyle={{ backgroundColor: 'darkgrey' }}
                listItemLabelStyle={{ color: 'white' }}
                open={openEvent}
                value={eventTypeValue}
                items={eventMenu}
                setOpen={setOpenEvent}
                setValue={setEventTypeValue}
                setItems={setEvent}
                dropDownDirection="AUTO"
                placeholder="Event Type"
              />
            </View>
            <Text
              style={{
                padding: 20,
                fontFamily: 'Arial',
                font: 'Arial Black',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
              }}>
              Enter Date of Event:
            </Text>
            <View style={{alignItems: 'center', backgroundColor: 'white', marginBottom: 20, width:170}}>
            <RNDateTimePicker
              
              textColor='white'
              style={styles.dateInput}
              value={selectedDate}
              placeholder= {new Date()}
              onChange={handleDateChange} 
              mode="date"
              format="MM/dd/yyyy"
            />
            </View>
            <View style={styles.buttonSection}>
              <View style={styles.buttonBorder}>
                <Button style={styles.button} color="black" title="Create New Match" onPress={() => {saveData()}}/>
                </View>
              </View>
            </View>
          </View>
        </View>
     </View>
      
      
  );
}

const styles = StyleSheet.create({
  mainSection: {
    height: '100%',
    alignItems: "center", 
    
    backgroundColor: '#4F5D75',

    
  },
  textInput: {
    alignItems: 'stretch',
        width: 400,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white',
  },
  dateInput: {
    
    justifyContent: 'center',
    alignItems: 'center',
    textColor: 'white'
  },
  button: {
    backgroundColor: "white",
  borderWidth: 2,
  color: "white",
  padding: 10,
  aligntItems: "center",
  margin: 12,

  },
  buttonBorder: {
    backgroundColor: "white",
    width: '70%',
    height: 40,
    margin: 1,
  },
   buttonSection: {
    height: '11%',
    alignItems: "center", 
    justifyContent: "stretch",
    backgroundColor: "white",

  },
  textSection: {
    height: '75%',
    alignItems: "center", 
    justifyContent: "center",
   
    borderRadius: 3,
    width: 1500
  },
  dropdownSection: {
    width: '25%',
    height: 40,
    margin: 12,
    zIndex: 1,
  },
  
});