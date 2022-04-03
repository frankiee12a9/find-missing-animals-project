import React, { SyntheticEvent, useState } from "react"
import "./style/index.css"
// Note: Add tags component (like adding tags of StackOverflow)
export default function TagInput() {
	const [tags, setTags] = useState([])

	function handleKeyDown(e: SyntheticEvent) {
		if (e.key !== "Enter") return
		const value = e.target.value
		if (!value.trim()) return
		setTags([...tags, value])
		e.target.value = ""
	}

	function removeTag(index: number) {
		setTags(tags.filter((el, i) => i !== index))
	}

	return (
		<div className="tags-input-container">
			{tags.map((tag, index) => (
				<div className="tag-item" key={index}>
					<span className="text">{tag}</span>
					<span className="close" onClick={() => removeTag(index)}>
						&times;
					</span>
				</div>
			))}
			<input
				onKeyDown={handleKeyDown}
				type="text"
				className="tags-input"
				placeholder="Type something"
			/>
		</div>
	)
}
