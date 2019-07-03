import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showDetailScreen} from '../actions/screenAction'
import {imgUrlConstants} from '../constants/imgContants';
import {AdMobBanner,PublisherBanner} from 'react-native-admob'

var {width, height} = Dimensions.get('window')
class CardView extends Component {
  constructor(props) {
    super(props);
    this.showDetailPage = this.showDetailPage.bind(this);
  }
  showDetailPage(quesId) {
    this.props.showDetailScreen();
    this.props.callShowDetail(quesId);
  }
  render() {
    debugger
    // let imgContent = this.props.qaData.img ?  <Image  key={1} style={styles.programImage} source={{uri:this.props.qaData.img}}/> :<Image />;
    let quesAns = <TouchableOpacity></TouchableOpacity>;
    let descContent = this.props.qaData.desc ? <Text style={styles.cardViewData}>{this.props.qaData.desc}</Text> : <Text></Text>;
    let imgContent = <Image source={require('../public/901.png')}/>;
    // let imgContent = <Image  key={this.props.qaData.qId} source={{uri:this.props.qaData.img}}/> ;
    // let imgContent = this.props.qaData.img ? <Image  key={this.props.qaData.qId} source={require('../public/102.png')}/> : <Image />;
    const resizeMode = 'center';
    // let imgUrl = this.props.qaData.imgId ? require(`../public/${this.props.qaData.imgId}+.png`):'';
    if(this.props.qaData && this.props.qaData.ques && this.props.qaData.ques != 'proverb'){
    quesAns = (<View><TouchableOpacity>
    <Text style={styles.cardViewHeader}>
      <Text style={{color: "#ec5343"}}>{"#" + this.props.no + "  "}</Text>
      {this.props.qaData.ques}
    </Text>
    <View style={styles.hr}></View>
    <Text style={styles.cardViewData}>
      {/* Code Re-usability – A component-based approach makes your application development easier and faster. If you want to use a pre-existing functionality in your code, you can just put that code in yours instead of building it from scratch. It also allows your application architecture to stay up to date over time as you can update the specific areas which need up-gradations. */}
      {this.props.qaData.ans}
    </Text>
 
    <View style={styles.hr}></View>
    <View>
    {this.props.qaData.imgId ? <Image source={imgUrlConstants[this.props.qaData.imgId].img} key={this.props.qaData.qId} style={styles.mainImage}/>:<Image/>}
    {/* {<Image source={this.props.qaData.img} key={this.props.qaData.qId} style={styles.mainImage}/>} */}
    {/* {this.props.qaData.img ? <Image  key={this.props.qaData.qId} style={styles.mainImage} source={{uri:this.props.qaData.img}}/>:<Image/>} */}
    </View>
    {/* {this.props.qaData.img ? <Image  key={this.props.qaData.qId} source={{uri:this.props.qaData.img}}/>:<Image/>} */}
    {descContent}
    <View style={styles.ImageViewWrapper}>
                    {this.props.qaData.imgUrls && this.props.qaData.imgUrls.map((image, index) => ( 
                        <Image  key={index} style={styles.programImage} source={{uri:image.imgUrl}}/>
                        ))}
                        
                </View>
  </TouchableOpacity>
  
  </View>);
    } else {
      quesAns = (
      
      <ImageBackground style={{width:'100%',height:'100%'}} source={require('../public/13.jpg')}>
        <View style={styles.cardViewContainerSub}>
        <TouchableOpacity>
      <Text style={styles.quotes}>{"\""}</Text>
      <Text style={styles.proverb}>
        {this.props.qaData.ans.toUpperCase()}
      </Text>
      <Text style={styles.right}>{"\""}</Text>
    {/* <Text>Inside</Text> */}
    </TouchableOpacity>
    </View>
    </ImageBackground>
    );
    }
    return (
      <View style={styles.cardViewContainer}>
        {quesAns}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    //  storeTitle : state.currentCategory.title
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    showDetailScreen: showDetailScreen
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(CardView)

const styles = StyleSheet.create({
  cardViewContainer: {
    width: "95%",
    // height:600,
    backgroundColor: "#fed987d6",
    margin: 10,
    flex: 1,
    elevation: 5,
    justifyContent: 'center',
    borderRadius: 7,
  },subConatinerForLoader:{
    marginTop: "10%",
    alignItems: 'center',
  }, cardViewContainerSub: {  
    width: "100%",
    backgroundColor: "#06060599",
    margin: 0,
    padding:55,
    flex: 1,
    height:550,
    elevation: 5,
    justifyContent: 'center',
    // justifyContent:'center',
    alignItems:'center',
  },
  ImageViewWrapper: {
    flex: 1,
    width: "100%",
    alignItems: 'center'
},
  cardViewHeader: {
    fontSize: 19,
    color: "#3C4043",
    minHeight: 35,
    paddingLeft: "2%",
    backgroundColor: "transparent",
    textAlignVertical: "center",
    // fontFamily: 'Zapfino'
    fontFamily: 'quicksand_bold' 
  },
  proverb: {
    fontSize: 25,
    color: "#ffffffb5",
    minHeight: 35,
    paddingLeft: "2%",
    backgroundColor: "transparent",
    textAlign:"center",
    fontFamily: 'quicksand_bold'    
    
  },
  cardViewData: {
    padding: 8,
    paddingLeft: 10,
    lineHeight: 25,
    color: "#26365a",
    fontSize: 16,
    fontFamily: 'quicksand_bold'    
    // fontFamily: 'quicksand_regular'
  },
  hr: {
    paddingLeft: 10,
  },
  moreImage: {
    height: 15,
    width: "10%",
    alignSelf: 'flex-end',
    margin: 2
  },
  mainImage: {
    resizeMode: "contain",
    flex:1,
    width: 320,
    height:320,
    alignSelf: 'center',
    margin: 5,
},
  programImage: {
    resizeMode: "contain",
    flex:1,
    width: 320,
    height:320,
    alignSelf: 'center',
    margin: 5,
},
right:{
  alignSelf: 'flex-end',
  color: "#ffffff94",  
  fontSize: 35,
  fontFamily: 'quicksand_regular'
},
quotes:{
  color: "#ffffff94",  
  fontSize: 35,
  fontFamily: 'quicksand_regular',
  backgroundColor:'transparent'
}
})