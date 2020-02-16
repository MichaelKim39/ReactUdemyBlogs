import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = ({ navigation }) => {
	const { addBlogPost } = useContext(Context);

	return (
		<BlogPostForm
			onSubmit={(title, content) => {
				// Recall addBlogPost takes 3 arguments, title, content, callback for navigation
				addBlogPost(title, content, () => navigation.navigate("Index"));
			}}
		/>
	);
};

const styles = StyleSheet.create({});

export default CreateScreen;

/*
	onPress={() => {
		addBlogPost(title, content);
		navigation.navigate("Index");
	}}
Navigation should be done after API request receives response - better way to do this:
	onPress={() => {
		addBlogPost(title, content, navigation.navigate("Index"));
	}}
 */
