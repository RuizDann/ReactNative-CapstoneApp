import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TextInput, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Svg, { Circle, Rect, AreaChart, Grid, Line, PolyLine } from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';

export default function EventPage({ route, navigation, props }) {

    const [periodH, setPeriodH] = React.useState('1');
    const [otH, setOtH] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState([]);
    const [positions, setPositions] = React.useState([
        {label: "Neutral", value: "Neutral"},
        {label: "Top", value: "Top"},
        {label: "Bottom", value: "Bottom"}
      ]);

    const [positionsNeutral, setPositionsNeutral] = React.useState([
      {label: "Single Leg", value: "Single Leg"},
      {label: "Double Leg", value: "Double Leg"},
      {label: "Hi-C", value: "Hi-C"},
      {label: "Scramble", value: "Scramble"},
      {label: "Throw", value: "Throw"},
      {label: "Front Headlock", value: "Front Headlock"},
      {label: "Defended Shot", value: "Defended Shot"}
    ]);

    const [positionsTop, setPositionsTop] = React.useState([
      {label: "Tilt", value: "Tilt"}, 
      {label: "Half", value: "Half"},
      {label: "Arm Bar", value: "Arm Bar"},
      {label: "Cradle", value: "Cradle"},
      {label: "Leg Ride", value: "Leg Ride"},
      {label: "Takedown to Back", value: "Takedown to Back"}
    ]);

    const [positionsBottom, setPositionsBottom] = React.useState([
      {label: "Stand Up", value: "Stand Up"}, 
      {label: "Sit Out ", value: "Sit Out"},
      {label: "Switch", value: "Switch"},
      {label: "Tripod", value: "Tripod"},
      {label: "Roll", value: "Roll"}
    ]);

    const [offAction, setOffAction] = React.useState([
      {label: "Takedown", value: "Takedown"}, 
      {label: "Escape", value: "Escape"}, 
      {label: "Reversal", value: "Reversal"}, 
      {label: "Nearfall-Two", value: "Nearfall-Two"},
      {label: "Nearfall-Four", value:"Nearfall-Four"},
      {label: "Fall", value: "Fall"},  
      {label: "Caution W", value: "Caution W"},
      {label: "Caution 1", value: "Caution 1"}
      
    ]);
    const [currentRes, setCurrentRes] = React.useState([
      {label: "Success", value: "Success"},
      {label: "Fail", value: "Fail"}
    ]);
    const [scoreType, setScoreType] = React.useState([
      {label: "F", value: "F"},
      {label: "A", value: "A"}
    ]);

    const [selectedPos, setSelectedPos] = React.useState("");
    const [selectedOfAction, setSelectedOfAction] = React.useState("");
  

    const [finalTime, setFinalTime] = React.useState(0);
    function handleStopwatchStop(timeElapsed) {
      setFinalTime(timeElapsed);
    }

    //number inputs
    const [period, setPeriod] = React.useState(1);
    const [ridingTime, setRidingTime] = React.useState(0);
    const [overtime, setOvertime] = React.useState(false);

    //dropdowns
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);

    const [openAct, setOpenAct] = React.useState(false);
    const [valueAct, setValueAct] = React.useState(null);

    const [openOff, setOpenOff] = React.useState(false);
    const [valueOff, setValueOff] = React.useState(null);
    
    const [openRes, setOpenRes] = React.useState(false);
    const [valueRes, setValueRes] = React.useState(null);

    const [openScore, setOpenScore] = React.useState(false);
    const [valueScore, setValueScore] = React.useState(null);

    const [openMinutes, setOpenMinutes] = useState(false);
    const [minuteValue, setMinuteValue] = useState(null);



    const handlePosition = (value) => {
      setPositionType(value);
      if(value == "Neutral")
      {
        setCurrentPos(positionsNeutral);
      }
      if(value == "Top")
      {
        setCurrentPos(positionsTop);
      }
      if(value == "Bottom")
      {
        setCurrentPos(positionsBottom);
      }
    };

    const [minute, setMinute] = useState(null);
    const [textInputValue, setTextInputValue] = useState("");
  
    const minuteValues = [
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
    ];
  
    const handleMinuteChange = (minute) => {
      setMinute(minute);
      if (minute === '3') {
        setTextInputValue('00');
      } else {
        setTextInputValue('');
      }
    };
  
    const handleTextInputChange = (value) => {
      if (value === '') {
        setTextInputValue('');
      } else if (value.length === 1 && value <= '5') {
        setTextInputValue(value);
      } else if (value.length === 2 && value <= '59') {
        setTextInputValue(value);
      }
    };

  //Setup Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
      (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.topSection}>
          <SafeAreaView style={styles.matchInfo}>
            <View style={{paddingVertical: '5%'}}>
              <Text style={{color: 'white'}}>Match Summary</Text>
              <Text style={{alignItems: 'center', color:'white'}}>{route.params.paramLastH} VS {route.params.paramLastA}</Text>
            </View>
          </SafeAreaView>
            <View style={styles.timeTop}>
            <Text style={{ color: 'white' }}>Time</Text>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '80%',
                }}>
                {/* dropdown for munites */}
                <View style={{height:50}}>
                <DropDownPicker
                style={{borderRadius:0}}
                  open={openMinutes}
                  value={minuteValue}
                  items={minuteValues}
                  setOpen={setOpenMinutes}
                  setValue={setMinuteValue}
                  placeholder = "Min"
                  containerStyle={{ height: 40, width: 80,}}
                  onChangeItem={(item) => handleMinuteChange(item.value)}
                />
                </View>
                <Text style={{ color: 'white' }}> :</Text>
                {minuteValue !== '3' && (
                  <TextInput
                    input="numeric"
                    keyboardType="numeric"
                    style={{ backgroundColor: 'white', fontColor: 'black', width: '50%', height: 50, margin: 5, alignItems: "center", justifyContent: "center" }}
                    textAlign="center"
                    placeholder="00"
                    placeholderTextColor = 'black'
                    onChangeText={(value) => handleTextInputChange(value)}
                    value={textInputValue}
                  />
                )}
                {minuteValue === '3' && (
                  <TextInput
                    style={{ backgroundColor: 'white', fontColor: 'black', width: '50%', height: 50, margin: 5, alignItems: "center", justifyContent: "center" }}
                    textAlign="center"
                    editable={false}
                    placeholder = "00"
                    placeholderTextColor = 'black'
                    textInputValue = "00"
                    value={textInputValue}
                  />
                ) }
              </View>
            </View>

            <View style={styles.positionInput}>
              <View style={{alignItems: 'center', justifyContent: 'center', width: '80%'}}>
              <Text style={{color: 'white'}}>Position</Text>
                <DropDownPicker
                  style={{borderRadius:0}}
                  containerStyle={{ height: 50}}
                  open={open}
                  value={value}
                  items={positions}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setPositions}
                  placeholder="Position"
                  onChangeValue={(value) => {
                  handlePosition(value);
                  }}
                />
              </View>
            </View>
            
            <View style={styles.ridingTime}>
            <Text style={{color: 'white'}}>Riding Time</Text>
              <View style={{width:"50%", justifyContent: 'center'}}>
                
                <TextInput input="numeric" 
                  keyboardType="numeric" 
                  style={{backgroundColor: 'white', fontColor: 'black'}} 
                  textAlign="center"
                  value={ridingTime}
                  onChangeText={(ridingTime) => setRidingTime(ridingTime)}
                  placeholder="0"
                  placeholderTextColor="black"
                />

              </View>
            </View>

            <View style={styles.period}>
              <Text style={{color: 'white'}}>Period</Text>
              <View style={{width:"20%", justifyContent: 'center', backgroundColor:'white'}}>

                <TextInput input="numeric" 
                  keyboardType="numeric" 
                  style={{backgroundColor: 'white', fontColor: 'black'}} 
                  textAlign="center"
                  value={period}
                  onChangeText={(period) => setPeriod(period)}
                  defaultValue="1"
                />

              </View>
            </View>

            <View style={styles.overtime}>
              <Text style={{color: 'white'}}>Overtime</Text>
              <View style={{width:"20%", justifyContent: 'center'}}>
                <Checkbox style={{backgroundColor:'white'}} value={overtime} onValueChange={setOvertime}/> 
              </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
         
      ),
    })
  });


//lock orientation to landscape
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//events list section
const [events, changeEvents]  = React.useState([]);
const [totalEvents, changeTotalEvents] = React.useState(route.params.allEvents);

const [listState, setListState] = React.useState(events);
const [idx, incr] = React.useState(0);

const [positionType, setPositionType] = React.useState('');
const [offensiveAction, setOffensiveAction] = React.useState('');
const [actionType, setActionType] = React.useState('');
const [resultType, setResultType] = React.useState('');
const [currScoreType, setCurrScoreType] = React.useState('');
const [currPoints, setCurrPoints] = React.useState();

const [circlePositions, setCirclePositions] = React.useState([]);
const [localCircles, setLocalCircles] = React.useState(circlePositions);
const [circleColor, setCircleColor] = React.useState('red');

const addElement = () => { //adds element to list
  if(((offensiveAction != null && actionType != null && resultType != null && currScoreType != null && positionType != null) || offensiveAction == "Fall") && localCircles.length%2 == 0 && localCircles.length/2 == events.length+1)//if input is not null
  {

  //create new array with new element
  var newArray = [...events , {
    id : idx,
    position: positionType, 
    offAct: offensiveAction, 
    actType: actionType, 
    result: resultType, 
    scoring: currScoreType,  
    time: finalTime, 
    numPeriod: period, 
    secRidingTime: ridingTime,
    isOvertime: overtime,
    points: currPoints,
    StartX: localCircles[localCircles.length-2].x,
    StartY: localCircles[localCircles.length-2].y,
    EndX: localCircles[localCircles.length-1].x,
    EndY: localCircles[localCircles.length-1].y
      }];


  incr(idx+1); //iterates new id value of each event in list (starts as 0)
  console.log();
  console.log("finalTime:" + finalTime);
  console.log("positionType: " + positionType);
  console.log("ridingTime: " + ridingTime);
  console.log("period: " + period);
  console.log("overtime: "+ overtime);
  console.log("offensiveAction: " + offensiveAction);
  console.log("actionType: " + actionType);
  console.log("resultType: " + resultType);
  console.log("currScoreType: " + currScoreType);
  console.log("points: " + currPoints);
  console.log("StartX: " + localCircles[localCircles.length-2].x);
  console.log("StartY: " + localCircles[localCircles.length-2].y);
  console.log("EndX: " + localCircles[localCircles.length-1].x);
  console.log("EndY: " + localCircles[localCircles.length-1].y);

  setListState(newArray); //updating states
  changeEvents(newArray);

  }
};

const deleteElement = () => {  //delete element
  if(events.length !=0 && localCircles.length%2 == 0 && localCircles.length/2 == events.length)
  {
    
    incr(idx-1); //decrease id so events maintain ascending order with no skips
    const newArray = listState.filter((item) => item.id !== events[events.length-1].id); //create new array without last element
    setListState(newArray); //updating states
    changeEvents(newArray);
    const newCircles = [...localCircles];
    newCircles.pop();
    newCircles.pop();
    setLocalCircles(newCircles);
    setCirclePositions(newCircles);
  }
};

const deleteLastCircle = () => {
    if(localCircles.length%2 !=0 || localCircles.length/2 == events.length+1){

      if(circleColor == "red"){//revert back to circle color that is being deleted
        setCircleColor("orange");
      }
      else
      {
        setCircleColor("red");
      }
    let newCircles = [...localCircles];//delete circle
    newCircles.pop();
    setLocalCircles(newCircles);
    setCirclePositions(newCircles);
    }
  }

  const handlePress = (event) => {
    if(localCircles.length == events.length*2 || localCircles.length==0 || localCircles.length == events.length*2+1 ) {
    const { locationX, locationY } = event.nativeEvent;
    const newCircle = {id:idx, x: locationX, y: locationY, color: circleColor };

    if(circleColor == "red"){//change to next circle to be placed
      setCircleColor("orange");
    }
    else
    {
      setCircleColor("red");
    }
    let newCircles = [...localCircles, newCircle];
    setLocalCircles(newCircles);
    setCirclePositions(newCircles);
    }
  };

  const saveData = () => {
    console.log("event page saved data");
    console.log(route.params.matchDetails);
    console.log(route.params.allWrestlerInfo);
    console.log(route.params.allEvents);

    const newArray = [...totalEvents, ...events];
    
    navigation.navigate('MatchDataHomeScreen', { allEvents:newArray, matchDetails:route.params.matchDetails, allWrestlerInfo:route.params.allWrestlerInfo});
  };

  return (
    <View style={styles.backgrounMainSection}>
      <View style={styles.eventsSection}> 
          <FlatList 
            data={listState}
            renderItem={item => (
              <View style={styles.item}>
                <Text style={{color: 'white'}}>{item.item.offAct} {item.item.scoring}{item.item.points}</Text> 
              </View>
            )}
            keyExtractor={item => item.id}
            />
      </View>

      <View style={styles.eventInput}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', zIndex:1}}>

          <View style={{width: '25%', zIndex: 1}}>
            <DropDownPicker
              open={openOff}
              value={valueOff}
              items={offAction}
              setOpen={setOpenOff}
              setValue={setValueOff}
              setItems={setOffAction}
              placeholder="Offensive Action"
              onChangeValue={(value) => {
                setOffensiveAction(value)
                switch(value)
                {
                  case "Takedown":
                    setCurrPoints(2);
                    break;
                  case "Escape": 
                    setCurrPoints(1);
                    break;
                  case "Reversal": 
                    setCurrPoints(2);
                    break;
                  case "Nearfall-Two":
                    setCurrPoints(2);
                    setOffensiveAction("Nearfall");
                    break;
                  case "Nearfall-Four":
                    setCurrPoints(4);
                    setOffensiveAction("Nearfall");
                    break;
                  case "Fall":
                    setCurrPoints(0);
                    setValueAct(null);
                    setValueRes("Success");
                    setValueScore(null);
                    break;
                  case "Caution W":
                    setCurrPoints(0);
                    break;
                  case "Caution 1":
                    setCurrPoints(1);
                    setOffensiveAction("Caution");
                    break;
                  default:   
                }
              }}
            />
          </View>

          <View style={{width: '25%', zIndex: 1}}>
            <DropDownPicker
              open={openAct}
              value={valueAct}
              items={currentPos}
              setOpen={setOpenAct}
              setValue={setValueAct}
              setItems={setCurrentPos}
              placeholder="Action Type"
              onChangeValue={(value) => {
                setActionType(value);
              }}
            />
          </View>
 
          <View style={{width: '25%', zIndex: 1}}>
            <DropDownPicker
              open={openRes}
              value={valueRes}
              items={currentRes}
              setOpen={setOpenRes}
              setValue={setValueRes}
              setItems={setCurrentRes}
              placeholder="Result"
              onChangeValue={(value) => {
                setResultType(value)
              }}
            />
          </View>

          <View style={{width: '25%', zIndex: 1}}>
            <DropDownPicker
              open={openScore}
              value={valueScore}
              items={scoreType}
              setOpen={setOpenScore}
              setValue={setValueScore}
              setItems={setScoreType}
              placeholder="Scoring"
              onChangeValue={(value) => {
                setCurrScoreType(value)
              }}
            />
          </View>

        </View>

          <View style={{paddingVertical: 40, alignItems: 'center', flexDirection:'row'}}>

            <View style={{width: "50%", alignItems: 'center'}}>
              <View style={styles.updateBorder}>
                <Button color="black" title="Update" onPress={addElement}/>
              </View>
            </View>

            <View style={{width: '50%', alignItems: 'center'}}>
              <View style={styles.lastEventBorder}>
                <Button color="black" title="Delete last Event" onPress={deleteElement} />
              </View>
            </View>

          </View>
            <View style={{justifyContent: 'center', paddingVertical: 40}}>
              <View style={styles.SaveButton}>
                <Button color="black" title="Save & Exit" onPress={saveData}/>
              </View>
            </View>
      </View>
    
      <View style={styles.chartSection}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Svg width="200" height="200"  onPress={handlePress}>
          <Rect x = '0' y = '0' width='200' height='200' fill='blue' />
          <Circle cx="100" cy="100" r="100" fill="lightgrey" />
          <Circle cx='100' cy='100' r='50' fill='white' stroke="blue" />
          <Line x1="100" y1="0" x2="100" y2="200" stroke="blue" strokeWidth="1" />
          <Line x1='0' y1='100' x2='200' y2='100' stroke='blue' strokeWidth='1' />
          
          {localCircles.map((circle, index) => (
            <Circle key={index} cx={circle.x} cy={circle.y} r="5" fill={circle.color} stroke="black" strokewidth="1" />
          ))}
          </Svg>
          <View style={styles.lastEventGraphBorder}>
          <Button color="black" title="Delete last Circle" onPress={deleteLastCircle} />
        </View>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  total: {
    borderRightWidth:3,
    height: '30%',
  },
  overtime: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3142',
  },
  period: {
    width: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3142',
  },
  ridingTime: {
    width: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3142',
  },
  ridingTimeCont: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  positionInput: {
    textAlign: 'center',
    width: '15%',
    justifyContent: 'center',
    backgroundColor: '#2d3142',
  },
  timeTop: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3142',
    
  },
  topSection: {
    flexDirection: "row",
  },

  header: {
    height: '10%',  
  },

  matchInfo: {
    backgroundColor: '#4F5D75',
    height: 90,
    width: '20%',
    borderRightWidth: 3,
    alignItems: 'center',
    borderColor: '#4F5D75',
  },
  container: {
    height: '20%',
    width: '30%',
    backgroundColor: 'white',
    alignItems: "left",
  },
  backgrounMainSection: {
    flex: 1,
    backgroundColor: '#4F5D75',
    flexDirection: 'row',
  },
  eventInput: {
    width: '51%',
    height: '90%',
    alignItems: "center", 
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    backgroundColor: '#2d3142',
    borderRightColor:'#4F5D75',
  },
  chartSection: {
    width: '30%',
    height: '90%',
    alignItems: "center", 
    justifyContent: 'center', 
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    backgroundColor: '#2d3142',
    borderRightColor:'#4F5D75',
  },
  timeInput: {
    width: '25%',
    height: '75%',
    alignItems: "center", 
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#2d3142',
    borderColor:'#4F5D75',
  },
  titleText: {
    alignItems: "center",
    fontFamily: "Arial",
    font: "Arial Black",
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  eventsSection: {
    width: '20%',
    borderWidth: 3,
    height: '90%',
    backgroundColor: '#2d3142',
    borderRightColor:'#4F5D75',
  },
  item: {
    flex: 1,
    borderBottomWidth: 2,
    alignItems: 'center',
    borderColor:'#4F5D75',
  },
  updateBorder: {
    borderRadius: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    height: 40,
  },
  lastEventBorder: {
    borderRadius: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    height: 40,
    alignItems: 'center',
  },
  lastEventGraphBorder: {
    borderRadius: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'black',
    width: 170,
    height: 40,
    alignItems: 'center',
    margin: 10,
  },
  SaveButton: {
    borderRadius: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    height: 40,
    alignItems: 'center',
  }
});