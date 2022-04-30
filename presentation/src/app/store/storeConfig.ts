import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { postSlice } from "../../features/post/postSlice"
import { tagSlice } from '../../features/tags/tagSlice';

export const store = configureStore({
	reducer: {
		// slices here
		posts: postSlice.reducer,
		tags: tagSlice.reducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
