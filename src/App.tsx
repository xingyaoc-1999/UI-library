import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRef, useState } from "react";

import { Modal } from "./components/modal";

import { Upload } from "./components/upload";
import { useEventListener } from "./hooks";
import { readableStream } from "./utils/stream/readableStream";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];
function App() {
  const [visible, setVisible] = useState<boolean>(false);
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
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <Upload
          url={""}
          listType="text"
          multiple
        />
      </Modal>

      <button onClick={() => setVisible(true)}>1</button>
    </>
  );
}

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
