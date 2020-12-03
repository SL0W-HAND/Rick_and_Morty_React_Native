import React, { Component } from 'react'
import {View, Text} from 'react-native'

export class CharcaterDetail extends Component {

    state = {
        character:{}
    }

    componentDidMount(){

        const char = this.props.route.params.character
        //console.log(this.props.route.params.character)
        console.log(char.name)
       // this.props.navigation.setOptions({title:'lol'})
        this.props.navigation.setOptions({ title: char.name })
        this.setState({character:char})
        
    }
    render() {
        return (
            <Text>ffhfh</Text>
        )
    }
}

export default CharcaterDetail
