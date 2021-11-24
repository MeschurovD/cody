import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../reducer/store';


export const useTypeDispatch = () => useDispatch<AppDispatch>()
export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector