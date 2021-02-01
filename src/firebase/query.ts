import { useEffect, useReducer } from "react";
import { useMemoCompare } from "src/hooks/memoCompare";
import { FirebaseDoc } from "../types/firebase";
import { PromiseStatus } from "../types/promise-status";
import { firebase } from "./client";

interface State<T> {
	status: PromiseStatus;
	data?: T[];
	error?: firebase.firestore.FirestoreError;
}

type Action<T> =
	| { type: "idle" }
	| { type: "pending" }
	| { type: "fulfilled"; payload: T[] }
	| { type: "rejected"; payload: firebase.firestore.FirestoreError };

type Reducer<T> = (state: State<T>, action: Action<T>) => State<T>;

const reducer = <T>(_: State<T>, action: Action<T>): State<T> => {
	switch (action.type) {
		case "idle":
			return { status: "idle", data: undefined, error: undefined };
		case "pending":
			return { status: "pending", data: undefined, error: undefined };
		case "fulfilled":
			return { status: "fulfilled", data: action.payload, error: undefined };
		case "rejected":
			return { status: "rejected", data: undefined, error: action.payload };
		default:
			throw new Error("Invalid action");
	}
};

export function useFirestoreQuery<T extends FirebaseDoc>(
	query: firebase.firestore.Query | null
) {
	const initialState: State<T> = {
		status: query ? "pending" : "idle",
		data: undefined,
		error: undefined,
	};

	const [state, dispatch] = useReducer<Reducer<T>>(reducer, initialState);

	const queryCached = useMemoCompare(query, (prevQuery) => {
		return Boolean(prevQuery && query && query.isEqual(prevQuery));
	});

	useEffect(() => {
		if (!queryCached) {
			dispatch({ type: "idle" });
			return;
		}

		dispatch({ type: "pending" });

		return queryCached.onSnapshot(
			(response) => {
				const data = response.docs.map((doc) => {
					const docData = doc.data() as T;

					return {
						...docData,
						id: doc.id,
					};
				});

				dispatch({ type: "fulfilled", payload: data });
			},
			(error) => {
				dispatch({ type: "rejected", payload: error });
			}
		);
	}, [queryCached]);

	return state;
}
