import React,{ useState,useEffect } from "react";
import { Text,SafeAreaView,View,StyleSheet,Animated,ScrollView,Image,TouchableOpacity } from "react-native";
import images from "../../constants/images";
import { COLORS, SIZES } from "../../constants/theme";
const { OnBoarding1,OnBoarding2,OnBoarding3 } = images ;


const onBoardings = [
    {
        title: "Let's Travelling",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img:OnBoarding1
    },
    {
        title: "Navigation",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: OnBoarding2
    },
    {
        title: "Destination",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: OnBoarding3
    }
];

const OnBoarding = () => {
    const scrollX = new Animated.Value(0)
    const [compeleted,setCompeleted] = useState(false)
    useEffect(() => {
        scrollX.addListener(({value}) => {
            if (Math.floor(value/SIZES.width) === onBoardings.length -1  ) {
                setCompeleted(true)
            }
        })
        return () => scrollX.removeListener();
    },[])
    function renderContent() {
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                snapToAlignment='center'
                decelerationRate={0}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                onScroll = {Animated.event([
                    {nativeEvent : { contentOffset:{ x : scrollX}}},
                ],{useNativeDriver:false})}
            >
                {onBoardings.map((item,index) => (
                    <View
                        key={index}
                        style={{width:SIZES.width}}
                    >
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Image
                                source={item.img}
                                resizeMode='cover'
                                style={{
                                    width:'100%',
                                    height:'100%'
                                }}
                            />
                        </View>
                        <View style={{position:'absolute',bottom:'13%',alignItems:'center'}}>
                            <Text style={styles.txtTitle}>{item.title}</Text>
                            <Text numberOfLines={2} style={styles.txtDescription}>{item.description}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.btnSkip}
                        >
                            <Text style={styles.txtBtn}>{compeleted ? "Let's Go" : 'Skip' }</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.ScrollView>
        )
        
    }
    function renderDot() {
        const dotPositions = Animated.divide(scrollX,SIZES.width)
        return(
            <View style={styles.dotContainer}>
                {onBoardings.map((item,index) => {
                    
                    const opacity = dotPositions.interpolate({
                        inputRange :[ index-1, index, index+1],
                        outputRange: [0.3 ,1 , 0.3],
                        extrapolate:'clamp'
                    })

                    const dotSize = dotPositions.interpolate({
                        inputRange: [index-1, index , index +1 ],
                        outputRange :[SIZES.base,17,SIZES.base],
                        extrapolate:'clamp'
                    })

                    return (
                        <Animated.View
                        key={`dot - ${index}`}
                        opacity={opacity}
                        style={[styles.dot,{width:dotSize,height:dotSize}]}
                        >
                        </Animated.View>
                    )
                    
                })}
            </View>
        )
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotRootContairner}>
                {renderDot()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    txtTitle :{
        fontSize:SIZES.body2,
        color:COLORS.gray,
        fontWeight:'700',
        textAlign:'center'
    },
    txtDescription:{
        fontSize:SIZES.body4,
        color:COLORS.gray,
        textAlign:'center',
        paddingHorizontal:30,
        paddingVertical:10
    },
    dotRootContairner : {
        position:'absolute',
        bottom:SIZES.height > 700 ? '30%' :'20%'
    },
    dotContainer : {
        flexDirection:'row',
        height:SIZES.padding,
        alignItems:'center',
        justifyContent:'center'
    },
    dot :{
        width:20,
        height:20,
        borderRadius:20,
        backgroundColor:COLORS.blue,
        marginHorizontal:5,
        
    },
    btnSkip:{
        position:'absolute',
        right:0,
        bottom:0,
        width:120,
        height:50,
        backgroundColor:COLORS.blue,
        borderBottomLeftRadius:60,
        borderTopLeftRadius:60,
        alignItems:'center',
        justifyContent:'center'
    },
    txtBtn:{
        fontSize:SIZES.h2,
        color:COLORS.white,
        fontWeight:'700'
    }
})

export default OnBoarding;