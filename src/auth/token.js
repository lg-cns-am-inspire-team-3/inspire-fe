let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
}

export const getAccessToken = () => accessToken;

// 삭제할 예정
window.setAccessToken = setAccessToken;
window.getAccessToken = getAccessToken;