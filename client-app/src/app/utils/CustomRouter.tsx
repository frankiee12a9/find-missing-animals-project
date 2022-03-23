import React, { useState, useLayoutEffect } from "react"
import { History } from "history"
import { Router, RouterProps } from "react-router-dom"

interface Props {
	history: History
}

const CustomRouter = ({ history, ...props }) => {
	const [state, setState] = useState({
		action: history.action,
		location: history.location,
	})

	useLayoutEffect(() => history.listen(setState), [history])

	return (
		<Router
			{...props}
			location={state.location}
			navigationType={state.action}
			navigator={history}
		/>
	)
}

export default CustomRouter
