// Lowercase file name - convention when exporting plane functions
// Create a new file to create pieces of context for us automatically
// Useful in the case that several resources must be managed - blogPosts, comments etc.
import React, { useReducer } from "react";

// Need some data to work with to create context
// 1. reducer which manages state
// 2. Utility functions
// 3. Initial value to set states
export default (reducer, actions, initialState) => {
	const Context = React.createContext();
	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, initialState);

		// actions === { addBlogPost: (dispatch) => {return () => {}} }
		const boundActions = {};
		for (let key in actions) {
			// key === 'addBlogPost'
			// For each utility function in actions, call dispatch
			// Store the returned utility function in a new object
			boundActions[key] = actions[key](dispatch);
		}

		return (
			<Context.Provider value={{ state: state, ...boundActions }}>
				{children}
			</Context.Provider>
		);
	};

	return { Context, Provider };
};
