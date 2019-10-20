import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage, TextInput, ScrollView, ImageBackground} from 'react-native';
import WiseSaying from './WiseSaying';
import ToDo from "./ToDo"; 
import file from './assets/wise-sayings.json';
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";
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

  useEffect(() => {
    loadWiseSayings();
  }, []);

  const controlNewToDo = (text) => {
    setNewToDo(text);
  };

  const addToDo = () => {
    if(newToDo !== ""){

      const ID = uuidv1();
      let tempToDos = toDos;
      tempToDos[ID] = {
        id: ID,
        isCompleted: false,
        text: newToDo,
        createdAt: Date.now()
      };
      setToDos(tempToDos);
      setNewToDo("");
      saveToDos(tempToDos);
    }
  };

  const saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };

  const loadWiseSayings = () => {

    if(file){
      setWiseSaying(file[Math.floor(Math.random() * file.length)].name);
      // setAuthor(file[Math.floor(Math.random() * file.length)].author)
      setIsLoading(true);
    }
    else{

    }
    // csv()
    //   .fromFile(csvFilePath)
    //   .on('json',(jsonObj)=>{
    //       // combine csv header row and csv line to a json object
    //       // jsonObj.a ==> 1 or 4
    //       console.log(jsonObj);
    //   })
    //   .on('done',(error)=>{
    //       console.log('end');
    //   })

    // const csvFilePath=RNFS.DocumentDirectoryPath + '/assets/wist-sayings.csv';

    // console.log('start');
    // RNFS.readFile(csvFilePath).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err.message, err.code);
    // });
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
        <View style={{...styles.halfContainer}}>
          <WiseSaying key={1} text={wiseSaying} reload ={loadWiseSayings} />
        </View>
        {/* author={author} /> */}
        <TextInput 
          style={styles.input} 
          placeholder={"New To Do"} 
          value={newToDo} 
          onChangeText={controlNewToDo} 
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
          onSubmitEditing={addToDo}
          underlineColorAndroid={"transparent"}
          />
        <ScrollView contentContainerStyle={styles.toDos}>
        {Object.values(toDos).reverse().map(toDo => 
            <ToDo key={toDo.id} {...toDo} 
            updateToDo={updateToDo}
            deleteToDo={deleteToDo} 
            completeToDo={completeToDo}
            uncompleteToDo={uncompleteToDo}
            />)}
        </ScrollView>
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
});
