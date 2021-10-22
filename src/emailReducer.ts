import { Reducer } from 'redux';
import { CHANGE_EMAIL, changeEmail } from './configuration/actions';

type State = string;
type Action =
    | ReturnType<typeof changeEmail>
    | { type: 'OTHER_ACTION'; payload?: any };

const emailReducer: Reducer<State, Action> = (
    previousState = '',
    action
) => {
    if (action.type === CHANGE_EMAIL) {
        return action.payload;
    }
    return previousState;
};

export default emailReducer;
