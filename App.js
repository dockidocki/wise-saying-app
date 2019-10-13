import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import WiseSaying from './WiseSaying';
import file from './assets/wise-sayings.json';

export default function App() {
  const [wiseSaying, setWiseSaying] = useState('');
  const [author, setAuthor] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadWiseSayings();
  }, []);

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

  return (
  <> 
    {
      isLoading ? 
        <View style={styles.container}>
        <WiseSaying key={1} text={wiseSaying} reload ={loadWiseSayings} />
        {/* author={author} /> */}
        </View> :
        <View style={styles.container}>
        </View>
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
  }
});
