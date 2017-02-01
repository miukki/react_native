/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ListView
} from 'react-native';



class Item extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    let onPress = (props) => {

      props.addDir({name:props.children, idx: props.idx, path:props.path})
    };

    return (
      <TouchableOpacity style={styles.itemKeyword} onPress={()=> {return this.props.type=='folder' ? onPress(this.props) : undefined } } >
        <View>
          <Text>{this.props.type+':'} {this.props.children} {'path:'+this.props.path}</Text>
        </View>
      </TouchableOpacity>

    );
  }
}

class SearchView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: '', chosenDirs: []};
    this.source =  [
    {text: 'img1', path: [{path: '/path/to', type: 'folder'}]},
    {text: 'img2', path: [{path: '/path/to', type: 'file'}, {path: '/path/to/1', type: 'folder'}, {path:'/path/to/2', type: 'file'}]},
    {text: 'img3', path: [{path: '/path/to/some', type: 'file'}]},
    {text: 'img4', path: [{type:'file', path: 'foo/bar'}, {type:'folder', path: 'foo/bar/1'}]},
    {text: 'img4', path: [{type: 'folder', path:'/p/t/m'}]},
    {text: 'img5', path: [{type: 'folder', path:'/p/t/m'}, {type: 'file', path:'/p/t/m'},  {type: 'file', path:'/p/t/m/2'}]}

    ];
    /*
     where is text - unique name in file system
    */

  }


  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    let addDir = (props) => {
      if (this.state.chosenDirs.filter(i=>{return i.idx === props.idx+''}).length){
        return;
       }
       this.setState({chosenDirs: [].concat(this.state.chosenDirs, [props])});
    };

    let cleanChosenDirs= () => {
      this.state.chosenDirs = [];
       this.setState({chosenDirs: []});
    };


    let _source = [];
    this.source.forEach((i, idxP) => {
        i.path.forEach((p,idx) => {
            _source.push({text: i.text, type: p.type, path: p.path, idx: idxP+''+idx+''});
         });
    });


    //result items
    let parts = this.state.text && _source.filter((i) => i.text && new RegExp(this.state.text).test(i.text.toLowerCase())).map((i) => {

      return <Item addDir={addDir} idx={i.idx} path={i.path} type={i.type}>{i.text}</Item>

    }) || <Text></Text>;

    let deleteDir = (rowData) => {
      let chosenDirs = this.state.chosenDirs;
      let idx = chosenDirs.indexOf(rowData);
      if (idx!== -1) {
        chosenDirs.splice(idx, 1);
        this.setState({chosenDirs: chosenDirs});
       }
    }


    return (

    <View style={{padding: 10}}>
            <TextInput
              style={{height: 40}}
              placeholder="Enter keywords to start searching...!"
              onChangeText={(text) => {
                this.setState({text: !/^#/g.test(text) && !/\s/g.test(text) && text.replace(/\W|_|(\\)?/g, '').toLowerCase() || text})}
              }
              value = {this.state.text}
              style={styles.default}
    />

     <View style={this.state.chosenDirs.length ? styles.block : ''}>
            <ListView
              dataSource={ds.cloneWithRows(this.state.chosenDirs)}
              renderRow={(rowData) => <TouchableOpacity style={{flex:1}}><Text>{rowData.name}</Text><Text onPress={() => { deleteDir(rowData);
               }}>{'x'}</Text></TouchableOpacity>}
            />
     <TouchableOpacity onPress={() => {cleanChosenDirs() }} >
        <View>
          <Text>{this.state.chosenDirs.length ? 'Clear all' : ''}</Text>
        </View>
      </TouchableOpacity>
    </View>


     <View style={parts && parts.length ? styles.block  : ''}>
      <Text>{parts && parts.length && 'Suggested keywords:' || ''}</Text>
      {parts}
    </View>



   </View>

    )
  }
}

export default class AwesomeProject extends Component {
  constructor(props) {
     super(props);
    }

  render() {
      return (
        <SearchView></SearchView>

    );
  }
}

const styles = StyleSheet.create({
  itemKeyword: {
    paddingBottom: 5,
    paddingTop: 5
  },

  block:{

    borderBottomWidth: 2,
    borderColor: '#a4c639',
    margin: 5,
    paddingBottom:10

  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
