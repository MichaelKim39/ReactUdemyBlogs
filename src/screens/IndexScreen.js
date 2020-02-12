import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { Context } from "../context/BlogContext";
import { MaterialIcons } from "@expo/vector-icons";

const IndexScreen = () => {
	// useContext prop justs accesses value prop from our provider
	// Destructure context object, getting data and functions from provider
	const { state, addBlogPost } = useContext(Context);

	return (
		<View>
			<Button title='Add Post' onPress={addBlogPost} />
			<FlatList
				data={state}
				keyExtractor={blogPost => blogPost.title}
				renderItem={({ item }) => {
					return (
						<View style={styles.row}>
							<Text style={styles.title}>{item.title}</Text>
							<MaterialIcons name='delete' style={styles.icon} />
						</View>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderTopWidth: 1,
		borderColor: "gray"
	},
	title: {
		fontSize: 18
	},
	icon: {
		fontSize: 24
	}
});

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
