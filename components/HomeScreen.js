import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';

export default function HomeScreen({ route, navigation, props }) {

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

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const saveData = () => {
    if (formattedDate == undefined) {
      const currentDate = new Date();
      var newArray = [
        {
          eventName: eventName,
          eventType: eventTypeValue,
          // meetDate as year/month/day
          meetDate: `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
        },
      ];
      navigation.navigate('NewMatch', {
        allEvents: allEvents,
        matchDetails: newArray,
        allWrestlerInfo: allWrestlerInfo,
      });
    }
    var newArray = [
      {
        eventName: eventName,
        eventType: eventTypeValue,
        meetDate: formattedDate,
      },
    ];
    navigation.navigate('NewMatch', {
      allEvents: allEvents,
      matchDetails: newArray,
      allWrestlerInfo: allWrestlerInfo,
    });
  };

  return (
    <View style={styles.mainSection}>
      <View style={{ height: '90%', backgroundColor: '#2D3142', paddingTop: '10%' }}>
        <View style={{ justifyContent: 'center' }}>
          <View style={styles.textSection}>
            <TextInput
              style={styles.textInput}
              placeholder="Event Name"
              placeholderTextColor="white"
              textAlign="center"
              borderColor="white"
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
            <View>
              <Button title="Open" onPress={() => setOpen(true)} />
              <DatePicker
                style={{ width: 200 }}
                date={date}
                mode="date"
                placeholder="select date"
                format="YYYY/MM/DD"
                minDate="2020/01/01"
                maxDate="2025/12/31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{ dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 } }}
                onDateChange={(date) => { setDate(date); }}
              />

              
            </View>
            <View style={styles.buttonSection}>
              <View style={styles.buttonBorder}>
                <Button
                  style={styles.button}
                  color="black"
                  title="Create New Match"
                  onPress={() => {
                    saveData();
                  }}
                />
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
    alignItems: 'center',
    backgroundColor: '#4F5D75',
  },
  textInput: {
    alignItems: 'stretch',
    width: '25%',
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    color: 'white',
  },
  dateInput: {
    justifyContent: 'center',
    alignItems: 'center',
    textColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    color: 'white',
    padding: 10,
    aligntItems: 'center',
    margin: 10,
  },
  buttonBorder: {
    backgroundColor: 'white',
    width: '70%',
    height: 40,
  },
  buttonSection: {
    height: '11%',
    alignItems: 'center',
    justifyContent: 'stretch',
    backgroundColor: 'white',
  },
  textSection: {
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    width: 1500,
  },
  dropdownSection: {
    width: '25%',
    height: 40,
    margin: 12,
    zIndex: 1,
  },
});