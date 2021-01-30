import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";

const clientCredentials = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

if (!firebase.apps.length) {
	firebase.initializeApp(clientCredentials);

	// Check that `window` is in scope for the analytics module!
	if (typeof window !== "undefined") {
		// Enable analytics. https://firebase.google.com/docs/analytics/get-started
		if ("measurementId" in clientCredentials) {
			firebase.analytics();
			firebase.performance();
		}
	}
}

export { firebase };

export const firestore = firebase.firestore();
