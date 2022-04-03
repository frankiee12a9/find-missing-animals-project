import { createTheme } from "@material-ui/core"
import { grey } from "@material-ui/core/colors"


interface ThemeProps {
	// properties here
}

export const theme = createTheme({
	palette: {
		primary: {
			main: grey[50],
		},
	},
	// myButton: {
	// 	backgroundColor: "red",
	// 	color: "white",
	// 	border: "1px solid black",
	// },
})
