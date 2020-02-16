import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({ navigation }) => {
	const id = navigation.getParam("id");
	// Need to get context so we know which post we wish to edit
	const { state, editBlogPost } = useContext(Context);

	const blogPost = state.find(blogPost => blogPost.id == id);

	return (
		<BlogPostForm
			initialValues={{ title: blogPost.title, content: blogPost.content }}
			onSubmit={(title, content) => {
				editBlogPost(id, title, content, () => navigation.pop());
			}}
		/>
	);
};

const styles = StyleSheet.create({});

export default EditScreen;

/*
navigation.pop allows access to screen that we just navigated from
*/
