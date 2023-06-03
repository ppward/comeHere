import { View, Text ,Image,TouchableOpacity} from "react-native";
import Icons from '../assets'
import {Dimensions} from 'react-native';

const User = () => {
  return (
    <View style={{flex:1}}>
    <View style ={{flex:1.5,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={{marginLeft:'80%'}}>
     <Image style={{ marginTop:10 ,marginBottom:20, width:30,height:30}} source =  {Icons.Setting}/>
     </TouchableOpacity>
     <Text style = {{backgroundColor:'plum', borderRadius:15,marginBottom:10,fontSize:20,color:'white'}}> 프로필 </Text>
    <Image 
    style ={{width:50,height:50}}
     source = {Icons.USER}/> 
    
    </View>
    <View style ={{flex:1, backgroundColor:'lightgray'}}>
     <TouchableOpacity style ={{backgroundColor:'plum',width:100,height:30,justifyContent:'center', borderRadius:15,margin:10}}>
     <Text style={{margin:15,color:'white',height:15}}>oo면 여행자</Text>
     </TouchableOpacity>
     <View style ={{flexDirection:'row', backgroundColor:'white',borderRadius:15,marginLeft:10,marginRight:'25%'}}>
      <Image style={{width:30,height:30 ,margin:10,marginLeft:20}} source ={Icons.Badge}/>
     </View>
     
    </View>

    <View style ={{flex:2,backgroundColor:'white',justifyContent:'flex-start',alignItems:'flex-start'}}>
    <Text style ={{margin:10,backgroundColor:'white',fontSize:25, fontWeight:'bold'}}>나의 활동 </Text>
    <TouchableOpacity style={{borderColor:'grey'}}> 
    <Text style ={{width:Dimensions.get('window').width,margin:10, borderColor:'grey',fontSize:15}}> 파티 참여내역</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{borderColor:'grey'}}> 
    <Text style ={{width:Dimensions.get('window').width,margin:10, borderColor:'grey',fontSize:15}}> 최근 댓글</Text>
    </TouchableOpacity>
    </View>
    
  </View>

  );
};
export default User;
