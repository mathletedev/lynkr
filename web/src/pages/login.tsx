import { gql, useMutation } from "@apollo/client";
import { GetStaticProps } from "next";
import { FC } from "react";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";
import { refreshTokenInit } from "../lib/auth";

const LOGIN_MUTATION = gql`
	mutation Login($token: String) {
		login(token: $token)
	}
`;

interface Props {
	googleClientId: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
	props: { googleClientId: process.env.GOOGLE_CLIENT_ID! }
});

const Login: FC<Props> = ({ googleClientId }) => {
	const handleLogin = (res: GoogleLoginResponse) => {
		const user = useMutation(LOGIN_MUTATION, {
			variables: {
				token: res.tokenId
			}
		});

		console.log(user);

		refreshTokenInit(res);
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
