import { gql, useMutation } from "@apollo/client";
import { GetStaticProps } from "next";
import { FC } from "react";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";
import { refreshTokenInit } from "../lib/auth";
import { __prod__ } from "../lib/constants";

const LOGIN_MUTATION = gql`
	mutation Login($token: String!) {
		login(token: $token) {
			_id
		}
	}
`;

interface Props {
	googleClientId: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
	props: { googleClientId: process.env.GOOGLE_CLIENT_ID! }
});

const Login: FC<Props> = ({ googleClientId }) => {
	const [login] = useMutation(LOGIN_MUTATION);

	const handleLogin = (res: GoogleLoginResponse) => {
		console.log(res.tokenId);
		if (!__prod__) console.log(res.tokenId);

		login({
			variables: {
				token: res.tokenId
			}
		});

		refreshTokenInit(res);

		window.location.reload();
	};

	return (
		<GoogleLogin
			clientId={googleClientId}
			buttonText="Sign In with Google"
			onSuccess={(res) => handleLogin(res as GoogleLoginResponse)}
			cookiePolicy="single_host_origin"
			isSignedIn={true}
		/>
	);
};

export default Login;
