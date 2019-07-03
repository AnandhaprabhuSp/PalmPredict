import React, {Component} from "react";
import {Text, View,StyleSheet,Image} from 'react-native';
class About extends Component {
    render() {
        return (
            <View style={styles.container}>
             <Image style={styles.arivohmLogo} source={require('../public/Arivohm.png')}/>
             <View style={styles.subConatiner}>
                <Image source={require('../public/ic_launcher.png')}/>
                <Text style={styles.appName}>Palm Predict</Text>
                <Text style={styles.text}> {this.props.viewData}</Text>
             </View>
            </View>
        );
    }
}

export default About;


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    homeText :{
        fontSize:16,
        // textAlign:"center",
        padding:10
    },
    arivohmLogo:{
        left:"6%",
        top:"3%",
      },
      subConatiner:{
        // top:"10%",
        marginTop: '5%',
        justifyContent:"center",
          alignItems: 'center',
      },
      appName : {
        fontSize: 30,
        // marginTop: 25,
        textAlign: "center",
        color:"#26365a",
        fontFamily: 'quicksand_bold',
    },
    text: {
        textAlign: "center",
        color:"#26365a",
        fontSize: 16,
        width:"90%",
        fontFamily: 'quicksand_regular',
    },
  });