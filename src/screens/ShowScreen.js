import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { FontAwesome } from "@expo/vector-icons";

// Recall that navigation params not passed in as props automatically
// Must instead pass in navigation and get param using navigation.getParam("")
const ShowScreen = ({ navigation }) => {
	// Destructure state from context made from createDataContext
	const { state } = useContext(Context);
	const blogPost = state.find(
		blogPost => blogPost.id === navigation.getParam("id")
	);

	return (
		<View>
			<Text>{blogPost.title}</Text>
			<Text>{blogPost.content}</Text>
		</View>
	);
};

ShowScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("Edit", { id: navigation.getParam("id") })
				}
			>
				<FontAwesome style={styles.pencil} name='pencil' />
			</TouchableOpacity>
		)
	};
};

const styles = StyleSheet.create({
	pencil: {
		// borderWidth: 10,
		// borderColor: "black",
		marginRight: 15,
		fontSize: 30
	}
});

export default ShowScreen;

/*
To access state using context same steps:
    1. Import useContext
*/
