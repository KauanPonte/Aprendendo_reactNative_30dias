import { Text, TextInput, FlatList, View, Pressable} from "react-native";
import { useState } from "react";

export default function Index() {
  const [name, setName] = useState('');
  const [tarefas, setTarefas] =  useState<{id: number, text: string, status: boolean}[]>([]);



    function addTarefa() {
    if(name.trim() === ''){
      return
    }

     setTarefas([...tarefas, {
      id: Date.now(),
      text: name,
      status: false,
    }])
      setName('')
    }

    function removeTarefa(id: number){
      setTarefas(
        tarefas.filter((n) => (
          n.id !== id
        ))
      )
    }

    function tarefaFeita(id: number) { 
      setTarefas(
        tarefas.map((n) => (
          id === n.id ? {... n, status: !n.status} : n
        ))
      )
    }

  
    

  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
        value={name}
        onChangeText={setName}
         placeholderTextColor="black"
         placeholder="Digite seu nome"
         style={{ borderWidth: 1,height: 30,margin: 15,padding: 5,width: 150 }}/>
      
        <Pressable onPress={addTarefa} style={{ borderWidth: 1, width: 50,height:20, justifyContent: "center", alignItems: "center", marginTop: 10, marginLeft: -5, backgroundColor: "blue", borderRadius: 50}} >
          <Text style={{fontSize: 9, color: "white"}}>Adicionar</Text>
        </Pressable>

  

      </View>
    
      <FlatList 
        style={{flex: 1}}
        data={tarefas}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => (
          <View style={{flexDirection: "row", justifyContent: "space-between"}}> 
              <Text style={[{margin:10}, item.status && {textDecorationLine: "line-through"} ]}>Tarefa: {item.text}</Text>
              
              <View style={{flexDirection: "row"}}> 
                <Pressable onPress={() => removeTarefa(item.id)} style={{ borderWidth: 1, width: 50,height:20, justifyContent: "center", alignItems: "center", marginTop: 10, marginRight: 10 , backgroundColor: "red", borderRadius: 50}} >
                  <Text style={{fontSize: 9, color: "white"}}>Remover</Text>
                </Pressable>

                <Pressable onPress={() => tarefaFeita(item.id)} style={{ borderWidth: 1, width: 50,height:20, justifyContent: "center", alignItems: "center", marginTop: 10, marginRight: 10, backgroundColor: "green", borderRadius: 50 }} >
                  <Text style={{fontSize: 9, color: "white"}}>Feito</Text>
                </Pressable>
              </View>
          </View>



        )}
      />

       <View style={{bottom: 40, left:250}} > 
          <Text >
            {tarefas.filter((n) => n.status).length} de {tarefas.length} Concluidas!
          </Text>
        </View>


    </View> 
  );
}