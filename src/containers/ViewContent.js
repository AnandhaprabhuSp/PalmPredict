import React, {Component} from 'react';
import CardView from './CardView'
import {View, StyleSheet, ScrollView, ViewPagerAndroid, Text,Image,TouchableOpacity,
    BackHandler,InteractionManager} from 'react-native';
import FastImage from 'react-native-fast-image'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hideDetailScreen,shareData } from '../actions/screenAction';


class ViewContent extends Component {
    constructor(props) {
        super(props)
        this.pageScroll = this.pageScroll.bind(this);
        this.goPreviousPage = this.goPreviousPage.bind(this)
        this.goNextPage = this.goNextPage.bind(this)
        this.renderPageView = this.renderPageView.bind(this)
        this.calculatePageCount = this.calculatePageCount.bind(this) //showDetailScreen
        this.showDetailScreen = this.showDetailScreen.bind(this)
        this.state = {
            data: [],
            count : 0,
            currentPage:0,
            newPage:false,
            test:[0,1,2],
            currentTitleImage:"",
            detailPageContent:"",
            detailPageToogle:false,
            showDetailPage : false,
            internetConnected:false,
            changeCurrentPage:true,
            prevCategoryPage:0
        }
    }
    componentWillMount() {
        this.calculatePageCount(this.props)
        BackHandler.addEventListener('hardwareBackPress', function () { 
            if(this.state.showDetailPage){
                this.props.hideDetailScreen();
                this.setState({ showDetailPage : false});
                return true;
            }
            else{
                return false;
            }

        }.bind(this))
    }
    componentWillReceiveProps (nextProps) {
        
        if(this.props.title !== nextProps.title){
            this.calculatePageCount(nextProps);
            this.setState({showDetailPage:false},()=>{
                this.viewPager.setPage(0);
            })
        } else if(!nextProps.isShowDetailPage){
            if(nextProps.resetZero != this.props.resetZero){
                this.calculatePageCount(nextProps);
           this.setState({showDetailPage:false},()=>{
               this.viewPager.setPage(0)
            });
           }
           else{
               this.setState({showDetailPage:false},()=>{
               })
           }
        }
    }
    
    goPreviousPage(){
        if(this.state.currentPage !=0){
            this.viewPager.setPage(this.state.currentPage - 1);
            this.setState({
                currentPage : this.state.currentPage - 1
            })
        }
    }
    goNextPage(){
        if(this.state.currentPage < this.state.count - 1){
            this.viewPager.setPage(this.state.currentPage+1);
            this.setState({
                currentPage : this.state.currentPage+1
            })
        }
    }
    calculatePageCount(props) {
        let data = [];
        let imageURL="";
        for(let i=0;i<props.viewData.length;i++){
            if(props.viewData[i].title === props.title){
                data = props.viewData[i]["data"];
                imageURL = props.viewData[i].image
                break;
            }
        }
        this.setState({
            count : Math.ceil(data.length/1),
            data:data,
            currentPage:0,
            newPage : !this.state.newPage,
            currentTitleImage:imageURL
        })
        
    }
    componentDidUpdate (prevProps, prevState) {
        if(!this.state.showDetailPage && !prevState.showDetailPage){
            InteractionManager.runAfterInteractions(() => {
                let currentRef = `scrollView${this.state.currentPage + 1}`;
            })  
        } else if(!this.state.showDetailPage){
                let currentRef = `scrollView${this.state.currentPage + 1}`;
        }
    }
    getScrollPosition(e){
        this.scrollPosition = e.nativeEvent.contentOffset.y;
    }
    showDetailScreen(quesno){
        let data = this.state.data[quesno-1];
        this.props.shareData(data);
        this.setState({
            detailPageContent : data,
            showDetailPage : true
        })
    }
    renderPageView() {
        console.log("calling each page");
        let renderPageArr = [];
        for (let i = 0; i < this.state.count; i++) {
            let sliceFrom=0; sliceTo=1;
            if(i > 0){
                sliceFrom = i*1;
                sliceTo=(i+1)*1;
            }
            renderPageArr.push(
                <View style={styles.pageStyle} key={i}>
                   
                    <ScrollView ref={`scrollView${i+1}`}  onScroll={this.getScrollPosition} contentContainerStyle={styles.contentContainer}>
                        {this.state.data.slice(sliceFrom,sliceTo)
                            .map((data, index) => {
                                return (<CardView key={index} no={(i*1)+index+1} qaData={data} 
                                 callShowDetail={this.showDetailScreen}/> )
                            })}
                    </ScrollView>
                </View>
            )
        }
        return renderPageArr;
    }
    pageScroll(e){
        console.log(e.nativeEvent); 
        this.setState({ currentPage : e.nativeEvent.position});
    }
    render() {
        debugger
        console.log("render of view pager",this.props.isPortrait)
        return (
            <View style={styles.viewPagerContainer}>
            <View style={{backgroundColor: "#fcd47c",flex: this.props.isPortrait ? 0.06 : 0.16,
            elevation:10, flexDirection: 'row',marginBottom:10,padding:"2%"}}>
                    <TouchableOpacity  style={styles.CatogeryClick} onPress={()=>{
                        this.setState({currentPage:0},()=>{
                            this.viewPager.setPage(0)
                        })
                    }}>
                     <Text  style={styles.categoryText}>{this.props.title.toUpperCase()}</Text>
                    </TouchableOpacity>
                     <View style={styles.catogeryHeaderPageCountWrapper}>
                        <View style={styles.pageCountWrapper}>
                            <Text style={styles.currentpage}>{(this.state.currentPage + 1)}
                            <Text style={{color:"#26365a"}}>{"/"}</Text>
                            <Text style={{color:"#26365a"}}>{this.state.count}</Text>
                        </Text>
                        </View>
                    </View>
                     
            </View>
            <ViewPagerAndroid ref={viewPager => { this.viewPager = viewPager; }} 
             style={[{flex:1}, {marginBottom:this.state.newPage ? 1:0}]} 
                initialPage={this.state.currentPage} 
                onPageScroll={(e)=>{this.pageScroll(e)}}>
                {this.renderPageView()}
            </ViewPagerAndroid>
            </View>

        );
    }
}

function mapStateToProps(state) {
    return { 
            drawerActive: state.drawer.drawerActive,
            resetZero : state.currentCategory.catgeoryClickBool
            };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        hideDetailScreen : hideDetailScreen,
        shareData:shareData
    }, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(ViewContent)

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        // marginBottom:this.state.count % 2 == 0 ? 1 : 0
    },
    contentContainer: {
        // paddingVertical: 10,
        // backgroundColor: "red",
        justifyContent: 'center',
    },
    viewPagerContainer: {
        flex: 1,
        //  alignItems: 'center',
        // backgroundColor: "grey",
        backgroundColor: "#fed987d6",
    },
    catogeryHeader:{
        backgroundColor: "white",
        flex: 0.06,
        elevation:10,
        flexDirection: 'row',
        // padding: 200,
        // width:"100%"
        // backgroundColor: "red"
    },
    pageStyle: {
        // alignItems: 'center',
        backgroundColor: "#fed987d6",
        // backgroundColor: "red"
        // elevation:10
    },
    pageCount:{
        // textAlign: 'center',
        // alignSelf: 'flex-end',
    },
    categoryText: {
        fontSize: 22,
        // width:"70%",
        textAlignVertical:"center",
        color:"#ec5343",
        // backgroundColor:"blue",
        // left:"25%",
        top:5,
        fontFamily: 'quicksand_bold',
    },
    CatogeryClick:{
        width:"70%",
        left:"25%",
        bottom:"0.8%",
    },
    // image:{
    //     // alignSelf: 'flex-end',
    // },
    categoryImage:{
        width:"75%",
        height:25,
        // left:"10%",
        // flex:0.7,
        // resizeMode: Image.resizeMode.contain
    },
    catogeryHeaderImageWrapper:{
        width:"10%",
        justifyContent: 'center',
        alignItems: 'flex-end',
        // backgroundColor:"red",
    },
    catogeryHeaderPageCountWrapper:{
        // flexDirection: 'row',
        width:"45%",
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"red"
    },
    previous:{
        alignItems: 'flex-start',
        // width:"25%"
    },
    next:{
        alignItems: 'flex-end',
    },
    pageCount :{
        textAlign:"center",
        // textAlignVertical:"center",
        fontSize: 20,
        // bottom:"2%"
    },
    currentpage:{
        textAlign:"center",
        // textAlignVertical:"center",
        fontSize: 18,
        top:"7%",
        color:"#ec5343",
        fontFamily: 'quicksand_bold',
    },
    pageCountWrapper:{
        // width:"45%",
        // flexDirection: 'row',
        justifyContent: 'center',
        // textAlign:"center"
    },
    admob:{
        // backgroundColor: "red"
        }
})