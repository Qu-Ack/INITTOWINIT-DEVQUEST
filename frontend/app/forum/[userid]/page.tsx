"use client";

import { useEffect, useState } from "react";

export default function Forum({ params }: { params: { userid: string } }) {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          setError(data.error);
        }
        const data = await response.json();
        console.log(data);
        setPosts(data.posts);
        setError("");
      } catch (err) {
        setError("something went wrong");
      }
    }
    getPosts();
  }, []);

  return (
    <>
      {posts.map((post) => {
        return <h1>hello</h1>;
      })}
    </>
  );
}
