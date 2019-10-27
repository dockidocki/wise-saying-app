import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage, 
  Text, TextInput, ScrollView, ImageBackground, KeyboardAvoidingView} from 'react-native';
import WiseSaying from './WiseSaying';
import ToDo from "./ToDo"; 
import file from './assets/wise-sayings.json';
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";
import * as Font from 'expo-font';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

export default function App() {
  const [wiseSaying, setWiseSaying] = useState('');
  const [author, setAuthor] = useState('');
  const [newToDo, setNewToDo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toDos, setToDos] = useState({});
  const [mainText, setMainText] = useState('오늘 당신의 가장 중요한\n"One thing"은\n무엇입니까?');
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadToDos();
    loadFont();
    loadWiseSayings();
  }, []);

  const loadToDos = async () => {
    try{
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);

      if(parsedToDos && parsedToDos.createdAt){
        if(parsedToDos.createdAt !== require('moment')().format('YYYY-MM-DD')){
          parsedToDos = {};
        }
      }
      setToDos(parsedToDos || {});
    } catch (err) {
      console.error(err);
    }
  };

  const loadFont = async () => {
    await Font.loadAsync({
      'font1': require('./assets/fonts/BMHANNAPro.ttf'),
    });
    setFontLoaded(true);
  };

  const loadWiseSayings = () => {
    if(file){
      setWiseSaying(file[Math.floor(Math.random() * file.length)].name);
      // setAuthor(file[Math.floor(Math.random() * file.length)].author)
      setIsLoading(true);
    }
    else{

    }
  };

  const controlNewToDo = (text) => {
    setNewToDo(text);
  };

  const addToDo = () => {
    if(newToDo !== ""){

      const ID = uuidv1();
      const toDay = require('moment')().format('YYYY-MM-DD');
      let tempToDos = toDos;
      tempToDos[ID] = {
        id: ID,
        isCompleted: false,
        text: newToDo,
        createdAt: toDay
      };
      setToDos(tempToDos);
      setNewToDo("");
      saveToDos(tempToDos);
    }
  };

  const saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };

  const deleteToDo = (id) => {
    delete toDos[id]; 
    setToDos({
      ...toDos
    });
    saveToDos({...toDos});
  };

  const uncompleteToDo = (id) => {
    toDos[id].isCompleted = false;
    setToDos({
      ...toDos
    });
    saveToDos({...toDos});
  };

  const completeToDo = (id) => {
    toDos[id].isCompleted = true;
    setToDos({
      ...toDos
    });
    saveToDos({...toDos});
  };

  const updateToDo = (id, text) => {
    toDos[id].text = text;
    setToDos({
      ...toDos
    });

    saveToDos({...toDos});
  };

  const bannerError = () => {
    console.log("An error");
    return;
  }
  
  return (
  <> 
    {
      isLoading ? 
      <ImageBackground style={styles.container}
            source={require('./assets/background.jpg')}>
        <KeyboardAvoidingView behavior="position">
        <View style={{...styles.halfContainer}}>
          <WiseSaying key={1} text={wiseSaying} reload ={loadWiseSayings} />
        </View>
        {/* author={author} /> */}
        {fontLoaded ? <Text style={styles.text}>{mainText}</Text> : null}
        {Object.keys(toDos).length === 0 ? <TextInput 
          style={styles.input} 
          // placeholder={mainText} 
          value={newToDo}
          onChangeText={controlNewToDo} 
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
          onSubmitEditing={addToDo}
          underlineColorAndroid={"transparent"}
          /> : <></>}
          <ScrollView contentContainerStyle={styles.toDos}>
          {Object.values(toDos).reverse().map(toDo => 
              <ToDo key={toDo.id} {...toDo} 
              updateToDo={updateToDo}
              deleteToDo={deleteToDo} 
              completeToDo={completeToDo}
              uncompleteToDo={uncompleteToDo}
              />)}
          </ScrollView>
          </KeyboardAvoidingView>          
        <AdMobBanner
            style={styles.bottomBanner}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-3940256099942544/2934735716"
            testDeviceID="EMULATOR"
            onDidFailToReceiveAdWithError={bannerError} />
        </ImageBackground>
           :
        <AppLoading />
    }
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfContainer:{
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toDos:{
    alignItems:"center"
  },
  input:{
    padding: 20,
    borderBottomColor:"#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  text:{
    fontFamily:'font1',
    fontSize: 20,
    textAlign:'center',
    margin:50
  }
});
