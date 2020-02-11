import React, { useState } from 'react';

// React provides createContext function to pass data using context
// It produces a piece of context with a 'provider' inside
// The provider allows nested children to access parent data
const BlogContext = React.createContext();

// Nested elements returned in a component are stored in a prop called children
// The component will pass the prop into the parent component returned
// Children prop is unrelated to context but can be integrated with it
export const BlogProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([]);

    // Helper function to add blogPost  
    const addBlogPost = () => {
        setBlogPosts([...blogPosts, { title: `Blog Post: #${blogPosts.length + 1}`}]);
    };

    return <BlogContext.Provider value={{ data: blogPosts, addBlogPost: addBlogPost }}>{children}</BlogContext.Provider>
};

// Use named export for the provider (export ___, import {})
// Use default export for context   (export default ___, import ___)

export default BlogContext;

/*
Context placed in separate folder:
    Only one file required usually
    Different to other custom components
Context works like so:
    1. Create context using createContext
    2. Display context.Provider by returning in a component
    3. Give value prop to Provider to be passed to children

You cannot render out an object directly using react
    E.g. send value prop as an object to be rendered in a text component
*/
