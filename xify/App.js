// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your apppppp!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React from 'react';
// import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo installed or use another method to import Ionicons

// const ChatBotPage = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={require('./assets/splash.png')} style={styles.avatar} />
//         <Text style={styles.headerText}>seXify</Text>
//       </View>
//       <ScrollView style={styles.chatContainer}>
//     <View style={[styles.message, styles.messageReceived]}>
//         <Text style={styles.messageText}>Hey there! Ready to explore the mysteries of love?</Text>
//         <Text style={styles.messageTime}>7:45 pm</Text>
//     </View>
//     <View style={[styles.message, styles.messageSent]}>
//         <Text style={styles.messageText}>Absolutely! How do you get a woman to... you know, reach the moon?</Text>
//         <Text style={styles.messageTime}>7:46 pm</Text>
//     </View>
//     <View style={[styles.message, styles.messageReceived]}>
//         <Text style={styles.messageText}>Well, it's all about the journey, not just the landing. Like, have you tried holding hands? That's pretty advanced stuff.</Text>
//         <Text style={styles.messageTime}>7:47 pm</Text>
//     </View>
//     <View style={[styles.message, styles.messageSent]}>
//         <Text style={styles.messageText}>Oh, we've held hands. And just yesterday, we upgraded to kissing! Saw everything but didn't land on the moon, if you catch my drift.</Text>
//         <Text style={styles.messageTime}>7:48 pm</Text>
//     </View>
//     <View style={[styles.message, styles.messageReceived]}>
//         <Text style={styles.messageText}>Astronaut in training, I see! Remember, exploring space is all about patience and enjoying the celestial views. The moon isn't going anywhere!</Text>
//         <Text style={styles.messageTime}>7:50 pm</Text>
//     </View>
// </ScrollView>

//       <View style={styles.inputContainer}>
//         <TextInput style={styles.input} placeholder="Type a message..." />
//         <TouchableOpacity>
//           <Ionicons name="send" size={24} color="#4F8EF7" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//     backgroundColor: '#F3F4F6',
//   },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//   },
//   headerText: {
//     marginLeft: 10,
//     fontWeight: 'bold',
//     color: '#808080',
//   },
//   chatContainer: {
//     flex: 1,
//     padding: 10,
//   },
//   message: {
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   messageReceived: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#D1D1D1',
//   },
//   messageSent: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#4F8EF7',
//   },
//   messageText: {
//     color: '#ffffff',
//   },
//   messageTime: {
//     alignSelf: 'flex-end',
//     fontSize: 10,
//     color: '#ffffff',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6',
//     backgroundColor: '#F3F4F6',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#D1D1D1',
//     borderRadius: 20,
//   },
// });

// export default ChatBotPage;

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo installed or use another method to import Ionicons

const ChatBotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! Ready to explore the mysteries of love?",
      received: true,
      time: "7:45 pm"
    }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    const userMessage = inputText.trim();
    if (userMessage) {
      const message = {
        id: Date.now(),
        text: userMessage,
        received: false,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      };
      setMessages([...messages, message]);
      setInputText('');

      try {
        const response = await fetch('http://localhost:3000/api/invoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: userMessage }),
        });

        const { response: botResponse } = await response.json();

        const botMessage = {
          id: Date.now() + 1,
          text: botResponse,
          received: true,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        };

        setMessages([...messages, message, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={require('./assets/splash.png')} style={styles.avatar} />
        <Text style={styles.headerText}>seXify</Text>
      </View>
      <ScrollView style={styles.chatContainer} ref={ref => this.scrollView = ref}
        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.message, msg.received ? styles.messageReceived : styles.messageSent]}>
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#4F8EF7" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// const styles = StyleSheet.create({
//   // styles remain unchanged
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#F3F4F6',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#808080',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageReceived: {
    alignSelf: 'flex-start',
    backgroundColor: '#D1D1D1',
  },
  messageSent: {
    alignSelf: 'flex-end',
    backgroundColor: '#4F8EF7',
  },
  messageText: {
    color: '#ffffff',
  },
  messageTime: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#F3F4F6',
  },
  input: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 20,
  },
});

export default ChatBotPage;
