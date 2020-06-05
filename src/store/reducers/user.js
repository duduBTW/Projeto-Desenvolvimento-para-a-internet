const INITIAL_STATE = {
  user: null,
};

export default function user(state = INITIAL_STATE, action) {
  if (action.type === "USER_LOGIN") {
    return Object.assign({}, state, {
      user: action.user,
    });
  }
  return state;
}
