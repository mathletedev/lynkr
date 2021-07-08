import { GoogleLoginResponse } from "react-google-login";

export const refreshTokenInit = (res: GoogleLoginResponse) => {
	let refreshTime = (res.tokenObj.expires_in || 3300) * 1000;

	const refreshToken = async () => {
		const newAuthToken = await res.reloadAuthResponse();

		refreshTime = (newAuthToken.expires_in || 3300) * 1000;

		setTimeout(refreshToken, refreshTime);
	};

	setTimeout(refreshToken, refreshTime);
};
