import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useEffect, useRef, useState } from "react";

import { Dialog } from "./components/dialog";
import { CircularProgressBar } from "./components/timeLine/circularProgressBar";

import { Upload } from "./components/upload";
import { webWoker } from "./utils/webWorker";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];
const clone = structuredClone(POSTS);
webWoker();

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    async mutationFn(title: string) {
      await wait(100);
      return POSTS.push({ id: Number(crypto.randomUUID()), title });
    },
    onSuccess() {
      queryClient.invalidateQueries(["post"]);
    },
  });

  if (postQuery.isLoading) return <h1> Lodaing...</h1>;
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>;
  }

  return (
    <>
      {/* <div>
        {postQuery.data.map((post: any) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
      <button onClick={() => newPostMutation.mutate("new Post")}></button> */}

      <Dialog
        ref={dialogRef}
        contentClassName=" grid dialog-DialogCus__content"
        className="dialog-DialogCus"
      >
        <Upload url="http://localhost:3001/upload" multiple />
      </Dialog>

      <button
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        1
      </button>
      {/* <CircularProgressBar />
       */}
    </>
  );
}

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
