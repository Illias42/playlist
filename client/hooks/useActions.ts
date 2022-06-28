import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as ActionCreators from "../redux/actionCreator";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreators, dispatch);
} 