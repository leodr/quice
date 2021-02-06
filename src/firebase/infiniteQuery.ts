import { useCallback, useEffect, useRef, useState } from "react";
import { useMemoCompare } from "src/hooks/memoCompare";
import { FormSubmission } from "src/types/form";
import { firebase } from "./client";

export function useSubmissionQuery(
  orderedQuery: firebase.firestore.Query | null,
  chunkSize = 20
) {
  const subscribtions = useRef<Array<() => void>>([]);

  const [docs, setDocs] = useState<FormSubmission[]>();
  const [canLoadMore, setCanLoadMore] = useState(true);

  const snapshotHandler = useCallback(
    (
      snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    ) => {
      if (snapshot.size === 0) setCanLoadMore(false);

      setDocs((docs) => {
        const map = new Map();

        docs?.forEach((doc) => map.set(doc.id, doc));
        snapshot.docs.forEach((doc) =>
          map.set(doc.id, { id: doc.id, ...doc.data() })
        );

        const newDocs = Array.from(map.values()) as FormSubmission[];
        newDocs.sort((a, b) => {
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        });

        return newDocs;
      });
    },
    []
  );

  const queryCached = useMemoCompare(orderedQuery, (prevQuery) => {
    return Boolean(
      prevQuery && orderedQuery && orderedQuery.isEqual(prevQuery)
    );
  });

  useEffect(() => {
    if (!queryCached) return;

    const unsubscribe = queryCached
      .limit(chunkSize)
      .onSnapshot(snapshotHandler);

    subscribtions.current.push(unsubscribe);
  }, [chunkSize, queryCached, snapshotHandler]);

  useEffect(function unsubscribeAll() {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps -- We do not really care when it changes, since we want to end all subscribtions anyway.
      return subscribtions.current.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  function loadMore() {
    if (!queryCached) return;

    const lastDoc = docs?.[docs.length - 1];

    const unsubscribe = queryCached
      .limit(chunkSize)
      .startAfter(lastDoc?.createdAt)
      .onSnapshot(snapshotHandler, console.error);

    subscribtions.current.push(unsubscribe);
  }

  return {
    submissions: docs,
    canLoadMore,
    loadMore,
  };
}
