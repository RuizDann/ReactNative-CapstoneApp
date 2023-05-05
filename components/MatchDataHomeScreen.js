import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function MatchDataHomeScreen({ route, navigation, props }) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    console.log("my Array data");
    console.log(route.params.allEvents);
    console.log(route.params.matchDetails);
    console.log(route.params.allWrestlerInfo);
    console.log("");
  
    const [eventName, setEventName] = useState(route.params.matchDetails[0].eventName);
    const [eventType, setEventType] = useState(route.params.matchDetails[0].eventType);
    const [selectedDate, setSelectedDate] = useState(route.params.matchDetails[0].meetDate);
    console.log(selectedDate);
    console.log(`${route.params.matchDetails[0].eventName},,`);

    const saveData = () => {
        navigation.navigate('NewMatch', { allEvents:route.params.allEvents, matchDetails:route.params.matchDetails, allWrestlerInfo:route.params.allWrestlerInfo})
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
          header: () =>
          (
            <View>
            <SafeAreaView style={styles.matchInfo}>
              <View style={{marginTop: 5, alignItems: 'center', borderRadius: 1}}>
               <Text style={{color:'white', alignItems: 'center', fontSize: 18, fontWeight: 'bold'}}>Wrestling Statistics</Text>
              </View>
            </SafeAreaView>
            </View>
          )
        })
        }
    );

// function to share the csv file
const shareMatch = async () => {
// get the match info from the route params
const matchDetails = route.params.matchDetails;
const allEvents = route.params.allEvents;
const allWrestlerInfo = route.params.allWrestlerInfo;

const csvMatchDetails = `${route.params.matchDetails[0].eventName},${matchDetails[0].eventType},${matchDetails[0].meetDate},,`;
let separatedWrestlerInfoCSV = [];

let CSVMATCH = `${matchDetails[0].eventName},${matchDetails[0].eventType},${matchDetails[0].meetDate},,`;


for(let i=0; i<allWrestlerInfo.length; i++)
{
    CSVMATCH +=`${allWrestlerInfo[i].firstNameH},${allWrestlerInfo[i].lastNameH},${allWrestlerInfo[i].teamH},${allWrestlerInfo[i].allAmerH},${allWrestlerInfo[i].natQualH},${allWrestlerInfo[i].firstNameA},${allWrestlerInfo[i].LastNameA},${allWrestlerInfo[i].teamA},${allWrestlerInfo[i].allAmerA},${allWrestlerInfo[i].natQualA}`;
    CSVMATCH +=`,,`;
    for(let j = 0; j < allEvents.length; j++)
    {
        
        if(allEvents[i].id == 0 && j !=0)
        { CSVMATCH+=`,,`;
            break;
        }
        CSVMATCH+=`${allEvents[i].time},${allEvents[i].position},${allEvents[i].secRidingTime},${allEvents[i].numPeriod},${allEvents[i].isOvertime},${allEvents[i].offAct},${allEvents[i].actType},${allEvents[i].result},${allEvents[i].scoring},${allEvents[i].StartX},${allEvents[i].StartY},${allEvents[i].EndX},${allEvents[i].EndY},${allEvents[i].points}`;
        CSVMATCH+=`,,`;
    }
}
CSVMATCH+=`END`;
console.log(CSVMATCH);

// function to share the csv fil
    
 // create the csv string
    
    const title = `Testtitle`;
    
    console.log(`${matchDetails[0].eventType},${matchDetails[0].eventName}`);
    
    
 // write the csv string to a file in the device's file system
    
     const fileUri = FileSystem.documentDirectory + title + '.csv';
    
    await FileSystem.writeAsStringAsync(fileUri, CSVMATCH, {
    
     encoding: FileSystem.EncodingType.UTF8,
    
    });

    // share the file
    
    try {
    
      await Sharing.shareAsync(fileUri);
    
    } catch (error) {
      alert(error.message);
    }
};



//navigation.navigate('HomeScreen');
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
              editable={eventName==""}
            />
            <TextInput 
                style={styles.textInput}
                placeholder='Event Type'
                placeholderTextColor='white'
                textAlign='center'
                borderColor= 'white' 
                value={eventType}
                onChangeText={(eventType) => setEventType(eventType)}
                editable={false}
            />
                    <TextInput 
                      style={styles.textInput}
                      placeholder='Date'
                      placeholderTextColor='white'
                      textAlign='center'
                      borderColor= 'white' 
                      value={selectedDate}
                      onChangeText={(eventType) => setEventType(eventType)}
                      editable={false}
                    />
                    <View style={styles.buttonSection}>
                      <View style={styles.buttonBorder}>
                        <Button style={styles.button} color="black" title="Create New Match" onPress={() => {saveData()}}/>
                        </View>
                        <View>
                        <TouchableOpacity style={{backgroundColor: 'white', padding: 10, borderRadius: 5, margin: 20, alignSelf:'center'}} onPress={shareMatch}>
                        <Text>Share Match</Text>
                         </TouchableOpacity>
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
            width: 350
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
            borderRadius: 1,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
            width: 200,
            height: 40,
            margin: 1,
          },
           buttonSection: {
            height: '22%',
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
    topSection: {
        flexDirection: "row",
    },
    matchInfo: {
        backgroundColor: '#4F5D75',
        height: 90,
        borderRightWidth: 3,
        alignItems: 'center',
        borderColor: '#4F5D75',
    },
});