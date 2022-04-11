import { Grid, makeStyles} from "@material-ui/core"
import { Container, createTheme, ThemeProvider } from "@mui/material"
import React, {useState} from "react"
import Navbar from "./Navbar"
import Leftbar from "./Leftbar"
import Feed from "./Feed"
import Rightbar from "./Rightbar"
import "./styles/App.scss"
import {Route, Switch} from "react-router-dom"
import { useAppDispatch } from "../store/storeConfig" 
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import HomePage from "./HomePage"
import MapLandingPage from "../utils/MapLandingPage"

function App() {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)


	const [darkMode, setDarkMode] = useState(false)
	const paletteType = darkMode ? "dark": "light"
	const theme = createTheme({
		palette: {
			mode: paletteType, // Todo: fix type error
			background: {
				default: paletteType === "light" ? "#eaeaea": "121212"
			}
		}
	})

	function handleThemeChange() {
		setDarkMode(!darkMode)
	}

  // Todo: add Loading component soon
	// if (loading) return <Loading />

	return (
		<div>
			<ThemeProvider theme={theme}>
				<ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
			<Navbar darkMode={darkMode} handleThemeChange={handleThemeChange}/>
			<Route exact path="/" component={HomePage} /> 
			<Route path={"/(.+)"} render={() => (
			<Container sx={{mt: 4}}>
				<Switch>
					<Route exact path="/map" component={MapLandingPage}/>
					{/* <Route exact path="/map" component={MapLandingPage}/>
					<Route exact path="/map" component={MapLandingPage}/>
					<Route exact path="/map" component={MapLandingPage}/> */}
				</Switch>
			</Container>
			)} />
			</ThemeProvider>
		</div>
	)
}

export default App
