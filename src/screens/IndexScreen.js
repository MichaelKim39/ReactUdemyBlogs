import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import BlogContext from '../context/BlogContext';

const IndexScreen = () => {
    // useContext prop justs accesses value prop from our provider
    // Destructure context object, getting data and functions from provider
    const { data, addBlogPost } = useContext(BlogContext);

    return (
        <View>
            <Text>Index Screen</Text>
            <Button title="Add Post" onPress={addBlogPost}/>
            <FlatList
                data={data}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return <Text>{item.title}</Text>
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default IndexScreen;

/*
Import useContext hook to use pieces of context - allow nested children to fetch data from parent 
NB using state in parent means any time the piece of state is updated by nested children, the whole app will re-render and pass the new data to all
children linked to the provider

Note that context system does not actually manage state - useState etc. is used for that
Context simply used for passing data etc.

useReducer recap:
    Manages state
    We 'dispatch' an 'action' to modify state
    dispatch is a function that takes an object (by convention with type and payload properties inside)
    Implement a reducer function that is called by dispatch through React 
*/