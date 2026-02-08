# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## MappedTable Configuration

### Styling (`MappedTable.css`)

The component imports `./MappedTable.css` by default. 
- Ensure a file named `MappedTable.css` exists in the same directory.
- To use your own global styles or CSS-in-JS, remove the import line from `MappedTable.jsx`.

### Registry System (`MappedTableRegistry.js`)

`MappedTable` relies on a centralized registry file to map abstract keys to concrete logic. You **must** create a `MappedTableRegistry.js` file colocated with the component. It must export the following 4 named objects:

1.  **`CELL_REGISTRY`**: Maps a `cellRegistryKey` to a React Component.
    *   *Usage*: Used to render non-string cell content (e.g., Images, Inputs, Formatted Currency).
    *   *Default Key*: `DEFAULT` (renders data as-is).

2.  **`NORMALIZER_REGISTRY`**: Maps a `tableRegistryKey` to a Normalizer Function.
    *   *Function Signature*: `(rawDataRow) => normalizedObject`
    *   *Purpose*: Transforms backend API data into a flat object where keys match your table's `columns` config.

3.  **`PATH_BUILDER_REGISTRY`**: Maps a `tableRegistryKey` to a Path Function.
    *   *Function Signature*: `(rowId) => "/string/path"`
    *   *Purpose*: Determines where the user goes when clicking the row. Return `null` to disable linking for that table type.

4.  **`ID_FINDER_REGISTRY`**: Maps a `tableRegistryKey` to an ID Resolver Function.
    *   *Function Signature*: `(rawDataRow) => uniqueId`
    *   *Purpose*: Extracts the unique identifier from your raw data (e.g., `row.id` or `row.product._id`). This ID is used for React keys and the Path Builder.

#### Example `MappedTableRegistry.js`

```javascript
/* MappedTableRegistry.js */

export const CELL_REGISTRY = {
  DEFAULT: ({ data }) => <>{data}</>,
  CURRENCY: ({ data }) => <span>${data.toFixed(2)}</span>,
  IMAGE: ({ data }) => <img src={data} alt="" />,
};

export const NORMALIZER_REGISTRY = {
  USER_LIST: (user) => ({
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    joined: new Date(user.createdAt).toLocaleDateString(),
  }),
};

export const PATH_BUILDER_REGISTRY = {
  USER_LIST: (id) => `/users/${id}`,
};

export const ID_FINDER_REGISTRY = {
  USER_LIST: (user) => user.id,
};
```

### `parentBemBlock` Argument

The `parentBemBlock` prop is used to generate BEM-compliant class names for the table and its children.
It allows the table to be styled according to the context in which it provides.
- The root table element receives the class `table--[parentBemBlock]`.
- Child elements inherit this block context.
