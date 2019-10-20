import React, {useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

export default function WiseSaying({text, reload}) {
    // useEffect(() => {
    //    console.log(text); 
    // }, [text]);

    return (
        <>
        <StatusBar barStyle="light-content" />
        <View style={{...styles.halfContainer}}>
            <Text style={styles.wise_text}>{text}</Text>
            {/* <Text style={styles.author_text}>{author}</Text> */}
            {/* <TextInput style={styles.input_text}
                placeholder={"Please Input To Do"} 
                placeholderTextColor={"black"}
            ></TextInput> */}
        </View>
        {/* <View style={{...styles.rightContainer}}>
            <Text style={styles.author_text}>{author}</Text>
        </View> */}
        <TouchableOpacity onPress={reload}>
            <MaterialCommunityIcons size={36} name={"reload"} color="white" />
        </TouchableOpacity>
        </>
    )
}

WiseSaying.propTypes = {
    text: PropTypes.string.isRequired,
    reload: PropTypes.func.isRequired
    // author : PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height:'100%',
        width:'100%'
    },
    halfContainer:{
        marginTop:100,
        flex:1,
        justifyContent:"center"
    },
    rightContainer:{
        flex:1,
        flexDirection:'row-reverse'
    },
    bottomContainer:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"flex-end"
    },
    input_text:{
        fontWeight:"600",
        color:"#3B0B0B",
        fontSize: 18,
        textAlign:'center',
        margin:50
    },
    wise_text:{
        fontWeight:"600",
        color:"#3B0B0B",
        fontSize: 22,
        textAlign:'left',
        margin:50
    },
    author_text:{
        fontWeight:"600",
        color:"white",
        fontSize: 24,
        textAlign:'right',
        marginRight:50
    },
    textContainer:{
        paddingHorizontal:20,
        alignItems:"flex-start"
    },
    authorContainer:{
        paddingHorizontal:20,
    }
})