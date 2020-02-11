import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import IndexScreen from './src/screens/IndexScreen';
import { BlogProvider } from './src/context/BlogContext';

// Recall stack navigator takes 2 arguments, 
// Route configuration object AND
// Configuration options
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
  }, 
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Blogs'
    }
  }
);

// Must export react component
// createAppContainer just takes the navigator and returns a specific screen
// We can wrap the navigator inside our own custom component 
const App = createAppContainer(navigator);
export default () => {
  return (
    <BlogProvider>
      <App />
    </BlogProvider>
  );
};

// Props system good for moving data from parent to immediate child
// Can become complicated once multiple layers are involved
// Context system good for moving data from parent to nested child directly instead of through all the immediate children
// But more work to set-up and involves many special terms 