import React from "react"
import {
	alpha,
	AppBar,
	Avatar,
	Badge,
	InputBase,
	makeStyles,
	Toolbar,
	Typography,
} from "@material-ui/core"
import { Cancel, Mail, Notifications, Search } from "@material-ui/icons"
import { useState } from "react"

interface DisplayProps {
	open: boolean
}

const useStyles = makeStyles(theme => ({
	toolbar: {
		display: "flex",
		justifyContent: "space-between",
	},
	logoLg: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	logoSm: {
		display: "block",
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	search: {
		display: "flex",
		alignItems: "center",
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		borderRadius: theme.shape.borderRadius,
		width: "50%",
		[theme.breakpoints.down("sm")]: {
			display: (props: DisplayProps) => (props.open ? "flex" : "none"),
			width: "70%",
		},
	},
	input: {
		color: "white",
		marginLeft: theme.spacing(1),
	},
	cancel: {
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	searchButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	icons: {
		alignItems: "center",
		display: (props: DisplayProps) => (props.open ? "none" : "flex"),
	},
	badge: {
		marginRight: theme.spacing(2),
	},
}))

const Navbar = () => {
	const [open, setOpen] = useState(false)
	const classes = useStyles({ open })
	return (
		<AppBar position="fixed">
			<Toolbar className={classes.toolbar}>
				<Typography variant="h6" className={classes.logoLg}>
					발려동물.찾기.컴
				</Typography>
				<Typography variant="h6" className={classes.logoSm}>
					LAMA
				</Typography>
				<div className={classes.search}>
					<Search />
					<InputBase
						placeholder="검색 키워드 입력..."
						className={classes.input}
					/>
					<Cancel
						className={classes.cancel}
						onClick={() => setOpen(false)}
					/>
				</div>
				<div className={classes.icons}>
					<Search
						className={classes.searchButton}
						onClick={() => setOpen(true)}
					/>
					<Badge
						badgeContent={4}
						color="secondary"
						className={classes.badge}>
						<Mail />
					</Badge>
					<Badge
						badgeContent={2}
						color="secondary"
						className={classes.badge}>
						<Notifications />
					</Badge>
					<Avatar
						alt="Remy Sharp"
						// src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhipSRxq94EUJMm7d2J0n6vjdrUyE9d04N89u_szECLc4933GdvPrHJc9VDeROEAyniY&usqp=CAU"
					/>
				</div>
			</Toolbar>
		</AppBar>
	)
}
