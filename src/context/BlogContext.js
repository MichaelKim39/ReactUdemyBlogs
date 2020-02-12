import createDataContext from "./createDataContext";

// Reducer usually takes state and action arguments
const blogReducer = (state, action) => {
	switch (action.type) {
		case "add_blogpost":
			return [...state, { title: `Blog Post #${state.length + 1}` }];
		default:
			return state;
	}
};

// Helper function to call dispatch (and thus call reducer)
const addBlogPost = dispatch => {
	return () => {
		dispatch({ type: "add_blogpost" });
	};
};

export const { Context, Provider } = createDataContext(
	blogReducer,
	{ addBlogPost },
	[]
);

/*
NOTES:

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
*/
