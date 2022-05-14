module.exports = {
  //Add the paths to all of  template files
  //add script in package.json:
  //"tailwind:build": "tailwind build -i ./src/styles/tailwind.css -o ./src/styles/styles.css"
  //build: npm run tailwind:bulid
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
