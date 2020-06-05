export function loginAccount(dispatch, user) {
  dispatch(loginUser("USER_LOGIN"));
}

function loginUser(type) {
  return {
    type,
  };
}
