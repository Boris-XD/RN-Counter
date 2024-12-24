import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface Props{
    label: string;
    position?: 'left' | 'right';
    //Methods
    onPress?: () => void;
    onLongPress?: () => void;
}


export default function FAB({ label, onLongPress, onPress, position='right' } : Props) {	
  return (
    <Pressable
        style={({pressed}) => [
            styles.floatingButton,
            position === 'right' ? styles.positionRight : styles.positionLeft,
            pressed ? { opacity: 0.5 } : { opacity: 1 }
        ]}
        onPress={onPress}
        onLongPress={onLongPress}>
        <Text style={styles.textButton}>{label}</Text>
    
    </Pressable>
  )
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'lightblue',
        padding: 20,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 3
    },
    positionRight: {
        right: 20,
    },
    positionLeft: {
        left: 20
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})