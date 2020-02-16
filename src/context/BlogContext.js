import createDataContext from "./createDataContext";
import jsonserver from "../api/jsonserver";

// Reducer usually takes state and action arguments
const blogReducer = (state, action) => {
	switch (action.type) {
		case "get_blogposts":
			return action.payload;
		case "edit_blogpost":
			return state.map(blogPost => {
				return blogPost.id === action.payload.id ? action.payload : blogPost;
			});
		case "delete_blogpost":
			return state.filter(blogPost => blogPost.id !== action.payload);
		case "add_blogpost":
			return [
				...state,
				{
					id: Math.floor(Math.random() * 99999),
					title: action.payload.title,
					content: action.payload.content
				}
			];
		default:
			return state;
	}
};

const getBlogPosts = dispatch => {
	return async () => {
		const response = await jsonserver.get("/blogposts");
		// response.data === [{}, {}, {}...]

		dispatch({ type: "get_blogposts", payload: response.data });
	};
};

// Helper function to call dispatch (and thus call reducer)
const addBlogPost = dispatch => {
	return (title, content, callback) => {
		dispatch({ type: "add_blogpost", payload: { title, content } });
		if (callback) {
			callback();
		}
	};
};

// Utility function to delete blog posts
const deleteBlogPost = dispatch => {
	return id => {
		dispatch({ type: "delete_blogpost", payload: id });
	};
};

// Utility function to edit blog posts
const editBlogPost = dispatch => {
	return (id, title, content, callback) => {
		dispatch({ type: "edit_blogpost", payload: { id, title, content } });
		// Must catch null argument for callback
		if (callback) {
			callback();
		}
	};
};

export const { Context, Provider } = createDataContext(
	blogReducer,
	{ addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
	[]
	// [{ title: "TEST POST", content: "TEST CONTENT", id: 1 }]
);

/*
NOTES:

APIs are the total source of truth	

Use named export for the provider (export ___, import {})
Use default export for context   (export default ___, import ___)

Context placed in separate folder:
    Only one file required usually
    Different to other custom components
Context works like so:
    1. Create context using createContext
    2. Display context.Provider in component notation through a provider function
    3. Give value prop to Provider to be passed to children

You cannot render out an object directly using react
    E.g. send value prop as an object to be rendered in a text component

Reducer used so that the number of utility functions can be minimised
    Use a switch statement with action.type instead of writing many independent functions

React provides createContext function to pass data using context
    It produces a piece of context with a 'provider' inside
    The provider allows nested children to access parent data

Nested elements returned in a component are stored in a prop called children
    The component will pass the prop into the parent component returned
	Children prop is unrelated to context but can be integrated with it
		
Whenever we want to add in new interaction with state:
	1. Add new function that calls dispatch
	2. Add new case to reducer
*/
