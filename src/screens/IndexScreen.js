import React, { useContext, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Button,
	TouchableOpacity
} from "react-native";
import { Context } from "../context/BlogContext";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
	// useContext prop justs accesses value prop from our provider
	// Destructure context object, getting data and functions from provider
	const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

	// NOTE since getBlogPosts modifies state we cannot call directly in the component due to repeated calls
	// UseEffect hook used instead
	useEffect(() => {
		getBlogPosts();
	}, []);

	return (
		<View>
			<FlatList
				data={state}
				keyExtractor={blogPost => blogPost.title}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => navigation.navigate("Show", { id: item.id })}
						>
							<View style={styles.row}>
								<Text style={styles.title}>
									{item.title} - {item.id}
								</Text>
								<TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
									<MaterialIcons name='delete' style={styles.icon} />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

// React navigation calls the function inside navigation options
// Automatically when index screen is navigated to
IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity onPress={() => navigation.navigate("Create")}>
				<Feather style={styles.plus} name='plus' />
			</TouchableOpacity>
		)
	};
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
		fontSize: 28,
		padding: 5
	},
	plus: {
		// borderWidth: 10,
		// borderColor: "black",
		marginRight: 15,
		fontSize: 30
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
