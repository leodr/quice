import { useRouter } from "next/router";
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { firebase } from "../firebase/client";

interface AuthContextValue {
	user: firebase.User | null;

	signin: (
		email: string,
		password: string,
		redirect?: string
	) => Promise<firebase.User | null>;

	signinWithGitHub: (redirect?: string) => Promise<firebase.User | null>;

	signinWithGoogle: (redirect?: string) => Promise<firebase.User | null>;

	signup: (
		email: string,
		password: string,
		redirect?: string
	) => Promise<firebase.User | null>;

	signout: () => Promise<void>;

	sendPasswordResetEmail: (email: string) => Promise<void>;

	confirmPasswordReset: (code: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function ProvideAuth({ children }: { children: ReactNode }) {
	const auth = useProvideAuth();

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const value = useContext(AuthContext);

	if (value === null) {
		throw Error("AuthContext not found.");
	}

	return value;
}

function useProvideAuth(): AuthContextValue {
	const [user, setUser] = useState<firebase.User | null>(null);
	const router = useRouter();

	async function signin(email: string, password: string, redirect?: string) {
		const response = await firebase
			.auth()
			.signInWithEmailAndPassword(email, password);

		setUser(response.user);

		if (redirect) {
			router.push(redirect);
		}

		return response.user;
	}

	async function signinWithGitHub(redirect?: string) {
		const response = await firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider());

		setUser(response.user);

		if (redirect) {
			router.push(redirect);
		}

		return response.user;
	}

	async function signinWithGoogle(redirect?: string) {
		const response = await firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider());

		setUser(response.user);

		if (redirect) {
			router.push(redirect);
		}

		return response.user;
	}

	async function signup(email: string, password: string, redirect?: string) {
		const response = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password);

		setUser(response.user);

		if (redirect) {
			router.push(redirect);
		}

		return response.user;
	}

	async function signout() {
		await firebase.auth().signOut();

		setUser(null);
		router.push("/");
	}

	async function sendPasswordResetEmail(email: string) {
		await firebase.auth().sendPasswordResetEmail(email);
	}

	async function confirmPasswordReset(code: string, password: string) {
		await firebase.auth().confirmPasswordReset(code, password);
	}

	useEffect(function addUserSubscription() {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return {
		user,
		signin,
		signup,
		signout,
		signinWithGoogle,
		signinWithGitHub,
		sendPasswordResetEmail,
		confirmPasswordReset,
	};
}
