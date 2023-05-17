import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import * as ScreenOrientation from 'expo-screen-orientation';
import DropDownPicker from'react-native-dropdown-picker';



export default function NewMatch( { navigation, route }, props ) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    const [weight, setWeight] = useState([
        { label: '125', value: '125' },
        { label: '133', value: '133' },
        { label: '141', value: '141' },
        { label: '149', value: '149' },
        { label: '157', value: '157' },
        { label: '165', value: '165' },
        { label: '174', value: '174' },
        { label: '184', value: '184' },
        { label: '197', value: '197' },
        { label: 'HWT', value: 'HWT' },
      ]);

      const [matchType, setMatchType] = useState([
        { label: 'Varsity', value: 'Varsity' },
        { label: 'JV', value: 'JV' },
        ]);


    const [totalWrestlerInfo, changeTotalWrestlerInfo] = React.useState(route.params.allWrestlerInfo);
    const [firstH, setFirstH] = useState('');
    const [lastH, setLastH] = useState('');
    const [teamH, setTeamH] = useState('');
    const [allAmerH, setAllAmerH] = useState(false);
    const [natQualH, setNatQualH] = useState(false);

    const [firstA, setFirstA] = useState('');
    const [lastA, setLastA] = useState('');
    const [teamA, setTeamA] = useState('');
    const [natQualA, setNatQualA] = useState(false);
    const [allAmerA, setAllAmerA] = useState(false);

    const [openWeight, setOpenWeight] = useState(false);
    const [weightValue, setWeightValue] = useState(null);

    const [openMatchType, setOpenMatchType] = useState(false);
    const [matchTypeValue, setMatchTypeValue] = useState(null);

    const saveData = () => {

        var wrestlerInfo = [...totalWrestlerInfo, {
          firstNameH: firstH,
          lastNameH: lastH,
          teamH: teamH,
          allAmerH: allAmerH ? 1 : 0,
          natQualH: natQualH ? 1 : 0,
          firstNameA: firstA,
          lastNameA: lastA,
          teamA: teamA,
          allAmerA: allAmerA ? 1 : 0,
          natQualA: natQualA ? 1 : 0,
          weight: weightValue,
          matchType: matchTypeValue,
        }];

        const newArray = [...route.params.allWrestlerInfo, ...wrestlerInfo];
        console.log("new match saved data");
        console.log(route.params.matchDetails);
        console.log(newArray);
        console.log(route.params.allEvents);

        setFirstH(null);
        setLastH(null);
        setTeamH(null);
        setAllAmerH(false);
        setNatQualH(false);
        setFirstA(null);
        setLastA(null);
        setTeamA(null);
        setAllAmerA(false);
        setNatQualA(false);
        setOpenWeight(false);
        setWeightValue(null);
        setOpenMatchType(false);
        setMatchTypeValue(null);
        navigation.navigate('EventPage', { allEvents:route.params.allEvents, matchDetails:route.params.matchDetails, allWrestlerInfo: newArray, paramLastH: lastH, paramLastA: lastA, })
      }
      React.useLayoutEffect(() => {
        navigation.setOptions({
          header: () =>
          (
            <View>
            <SafeAreaView style={styles.matchInfo}>
              <View style={{marginTop: 5, alignItems: 'center', borderRadius: 1}}>
               <Text style={{color:'white', alignItems: 'center', fontSize: 18, fontWeight: 'bold'}}>Wrestler Information</Text>
              </View>
            </SafeAreaView>
            </View>
          )
        })
        }
    );




    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container} keyboardShouldPersistTaps='handled'>
          <Text style={styles.titleText}>Our Wrestler</Text>
          <View style={styles.mainSection}>
            <TextInput 
                style={styles.input}
                placeholder='First Name'
                placeholderTextColor='white'
                textAlign='center'
                value={firstH}
                onChangeText={(firstH) => setFirstH(firstH)}
                borderColor = 'white'
                
            />
            <TextInput 
                style={styles.input}
                placeholder='Last Name'
                placeholderTextColor='white'
                textAlign='center'
                value={lastH}
                onChangeText={(lastH) => setLastH(lastH)}
                borderColor = 'white'
            />
            <TextInput 
                style={styles.input}
                placeholder="Team"
                placeholderTextColor='white'
                textAlign="center"
                borderColor = 'white'
                value={teamH}
                onChangeText={(teamH) => setTeamH(teamH)}
            />
            <View style={styles.checkInput}>
            <Text  style={{color:'white'}}>NAT QUAL</Text>
            <Checkbox style={{marginLeft: 25}} value={natQualH} onValueChange={setNatQualH}/> 
            </View>
            <View style={styles.checkInput}>
            <Text style={{color:'white'}}>All American</Text>
            <Checkbox style={{marginLeft: 25}} value={allAmerH} onValueChange={setAllAmerH}/>
            </View>
          </View>
          <Text style={styles.titleText}>Opponent</Text>
          <View style={styles.mainSection}>
            <TextInput 
                style={styles.input}
                placeholder='First Name'
                placeholderTextColor='white'
                textAlign='center' 
                value={firstA}
                onChangeText={(firstA) => setFirstA(firstA)}
                borderColor = 'white'
               
            />
            <TextInput 
                style={styles.input}
                placeholder='Last Name'
                placeholderTextColor='white'
                textAlign='center'
                value={lastA}
                onChangeText={(lastA) => setLastA(lastA)}
                borderColor = 'white'
            />
            <TextInput 
                style={styles.input}
                placeholder="Team"
                placeholderTextColor="white"
                textAlign="center"
                borderColor = 'white'
                value={teamA}
                onChangeText={(teamA) => setTeamA(teamA)}
            />
            
            <View style={styles.checkInput}>
                <Text style={{color:'white'}}>NAT QUAL</Text>
                <Checkbox style={{marginLeft: 25}} value={natQualA} onValueChange={setNatQualA}/> 
            </View>
            <View style={styles.checkInput}>
                <Text style={{color:'white'}}>All American</Text>
                <Checkbox style={{marginLeft: 25}} value={allAmerA} onValueChange={setAllAmerA}/>
            </View>
            
          
</View>
          <View style={styles.mainSection}>
            <View style={styles.dropdownSection}>
              <DropDownPicker
                style={{ borderRadius: 0 }}
                dropDownContainerStyle={{ backgroundColor: 'darkgrey' }}
                listItemLabelStyle={{ color: 'white' }}
                open={openMatchType}
                value={matchTypeValue}
                items={matchType}
                setOpen={setOpenMatchType}
                setValue={setMatchTypeValue}
                setItems={setMatchType}
                dropDownDirection="AUTO"
                placeholder="Match Type"
              />
            </View>
            
          <View style={styles.dropdownSection}>
              <DropDownPicker
                style={{ borderRadius: 0 }}
                dropDownContainerStyle={{ backgroundColor: 'darkgrey' }}
                listItemLabelStyle={{ color: 'white' }}
                open={openWeight}
                value={weightValue}
                items={weight}
                setOpen={setOpenWeight}
                setValue={setWeightValue}
                setItems={setWeight}
                dropDownDirection="AUTO"
                placeholder="Select Weight Class"
              />
            </View>
          
         
          </View>
          <View style={styles.buttonBorder}>
          <Button color="black" title="Submit" onPress={() => {saveData()}}/>
            </View>
            
        </View>
        </TouchableWithoutFeedback>
        
        )
      }
    
      const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#2D3142',
            alignItems: 'center',
            paddingTop: '10%',
        },
        mainSection: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center', 
            gap: '10rem',
            justifyContent: 'center',
            
        },
        titleText: {
            height: '8%', 
            padding: 20,
            fontFamily: 'Arial',
            font: 'Arial Black',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white'
            
        },
        input: {
            alignItems: 'center',
            width: 150,
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            color: 'white',
          },
          dropdownSection: {
            width: '30%',
            height: 40,
            margin: 12,
            zIndex: 1,
          },
        checkInput: {
            alignItems: 'center',
            width: 150,
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            fontColor: 'white',
            flexDirection: 'row',
            color: 'white',
            borderColor: 'white'
        },
        buttonBorder: {
        borderRadius: 2,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        width: '30%',
        height: 40,
        margin: 20,
        zIndex: -1,
      },
      matchInfo: {
        backgroundColor: '#4F5D75',
        height: 90,
        borderRightWidth: 3,
        alignItems: 'center',
        borderColor: '#4F5D75',
      },
      });