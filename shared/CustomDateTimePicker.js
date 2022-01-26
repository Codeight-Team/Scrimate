import React from "react";
import { View, Text, TouchableHighlight, Modal } from 'react-native'
import moment from "moment";
import { useState } from "react/cjs/react.development";

const CustomDateTimePicker = (props) => {
    const { textStyle } = props
    const [date, setDate] = useState(moment())
    const [show, setShow] = useState(false)

    // const onChange = (e, selectedDate) => {
    //     setDate(moment(selectedDate))
    // }

    return (
        <TouchableHighlight
            activeOpacity={0}
            onPress={() => console.log("DateTime")}

        >
            <Text style={textStyle}>{moment().format('dddd YYYY-MM-DD')}</Text>


            {/* <Modal 
                transparent={true}
                animationType="slide"
                visible={show}
                supportedOrientations={['portrait']}
                onRequestClose={() => setShow(false)}
                >
                    <View style={{flex:1}}>
                        <TouchableHighlight style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row'}} 
                            activeOpacity={1}
                            visible={show}
                            onPress={() => setShow(false)}>
                                <TouchableHighlight
                                    underlayColor={"#FFFFFF"}
                                    style={{flex: 1, borderTopColor: '#E9E9E9', borderTopWidth: 1}}
                                    onPress={() => console.log("Date picker clicked")}>
                                        <View style={{backgroundColor: '#FFFFFF', height: 250, overflow:'hidden'}}>
                                            <View style={{marginTop: 20}}>
                                                <DateTime timeZoneOffsetInMinutes={0}
                                                    value={new Date(date)}
                                                    mode="date"
                                                    minimumDate={new Date(moment().format("YYYY-MM-DD"))}
                                                    onChange={onChange}/>
                                            </View>
                                        </View>
                                </TouchableHighlight>
                        </TouchableHighlight>
                    </View>
            </Modal> */}
        </TouchableHighlight>
    )
}

CustomDateTimePicker.defaultProps = {
    textStyle: {

    }
}

export default CustomDateTimePicker;