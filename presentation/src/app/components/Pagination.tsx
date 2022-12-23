import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
	totalItems: number;
	limit: number;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
}

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	margin: 16px;
`;

const Button = styled.button`
	border: none;
	border-radius: 8px;
	padding: 8px;
	margin: 0;
	background: darkkhaki;
	color: white;
	font-size: 1rem;
	height: 32px;

	&:hover {
		background: tomato;
		cursor: pointer;
		transform: translateY(-2px);
	}

	&[disabled] {
		background: grey;
		cursor: revert;
		transform: revert;
	}

	&[aria-current] {
		background: deeppink;
		font-weight: bold;
		cursor: revert;
		transform: revert;
	}
`;

export default function Pagination({
	totalItems,
	limit,
	page,
	setPage,
}: Props) {
	const pagesLength = Math.ceil(totalItems / limit);
	return (
		<>
			<Nav>
				<Button onClick={() => setPage(page - 1)} disabled={page === 1}>
					{/* previous */}
					{'<<'}
				</Button>
				{Array(pagesLength)
					.fill(pagesLength, 0, pagesLength)
					.map((_, i) => (
						<Button
							key={i + 1}
							onClick={() => setPage(i + 1)}
							//   aria-current={page === i + 1 ? 'page' : null}
						>
							{i + 1}
						</Button>
					))}
				<Button
					onClick={() => setPage(page + 1)}
					disabled={page === pagesLength}
				>
					{/* next */}
					{'>>'}
				</Button>
			</Nav>
		</>
	);
}
