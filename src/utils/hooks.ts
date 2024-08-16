import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'; // Assuming you have an AppDispatch type

export const useAppDispatch: () => AppDispatch = useDispatch;
