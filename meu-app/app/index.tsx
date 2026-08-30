import { Text, TextInput, FlatList, View, Pressable, ActivityIndicator, Image} from "react-native";
import { useEffect, useState } from "react";

export default function Index() {
  const [jogos, setJogos] = useState<any[]>([])
  const [carregando, setCarregamdo] = useState(false)
  const [erro, setErro] =useState('');

    
    
  useEffect(() => {
    async function carregar() {
      try{
        setCarregamdo(true)
        const response = await fetch("https://api.rawg.io/api/games?key=88b8e9cbc6854fa0b7626c4020c0ef0f&page_size=20");

        if(!response.ok){
          throw new Error (`Erro HTTP: ${response.status}`)
        }

        const dados = await response.json();
        setJogos(dados.results)
        console.log(dados.results)

      } catch(e){
        if(e instanceof Error){
        setErro(`Não foi possivel carregar os jogos! Erro: ${e.message}`)
        }
      }finally{
         setCarregamdo(false);
      }
      
    }
    carregar()
  },[]);

  
  return(
    <View style={{flex:1}}>
      {carregando ? (
        <ActivityIndicator  style={{margin: 100}} size={"large"} color={"blue"}/>

      ) :erro ? (
        <Text>{erro}</Text>

      ) : (
        <FlatList 
          data={jogos} 
          keyExtractor={(item,index) => item.id.toString()}
          renderItem={({item})=> (
            <View style={{margin: 10, alignItems: "center",  }}>

              <View style={{margin:5}}>
                <Text style={{color:'black'}}>{item.name}</Text>
              </View>

              <View>
                <Image
                source={{uri: item.background_image}}
                style={{width: 150, height: 100}}
                /> 
              </View>

              <View>
                <Text>Nota: {item.rating}</Text>
              </View>

            </View>
          )}
        />
      ) }
    </View>
  )


  
  
    

  
}