@echo off
echo Creating project structure...

:: Create main project directories
mkdir backend
mkdir frontend
mkdir docker

:: Create backend structure
cd backend
mkdir src
cd src
mkdir controllers
mkdir models
mkdir routes
mkdir middleware
mkdir config
mkdir utils
cd ..

:: Initialize backend with npm
echo Creating package.json for backend...
npm init -y

:: Install backend dependencies
echo Installing backend dependencies...
npm install express mongoose dotenv cors helmet morgan swagger-ui-express swagger-jsdoc jsonwebtoken bcryptjs

:: Install backend dev dependencies
npm install --save-dev nodemon @types/node @types/express

:: Create frontend with Create React App
cd ..
echo Creating React frontend...
npx create-react-app frontend --template typescript

:: Install frontend dependencies
cd frontend
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom axios formik yup react-query

echo Setup completed successfully!
cd ..
