"use client";

import { UploadOnS3 } from "@/services/S3";
import Link from "next/link";
import { useEffect, useState } from "react";
import VideoRecorder from "@/services/Recorder";

export default function Dashboard({ params }: { params: { userid: string } }) {
  const [userId, setUserId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getParams() {
      try {
        const user_id = (await params).userid;
        setUserId(user_id);
        localStorage.setItem("userid", user_id);
        setError("");
        getUser(user_id);
      } catch (err) {
        setError("something went wrong");
      }
    }

    async function getUser(userid: string) {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${userid}`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) {
          const data = await response.json();
          setError(data.error);
          return;
        }
        const data = await response.json();
        console.log(data);
        setError("");
        setLoading(false);
      } catch (err) {
        setError("something went wrong");
        setLoading(false);
      }
    }

    getParams();
  }, []);

  function urlSetter(url: string) {
    setImageUrl(url);
  }

  function errorSetter(error: string) {
    setError(error);
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      const image_url = await UploadOnS3(e, urlSetter, errorSetter, "image");
      console.log(image_url);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/image`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ ImageUrl: image_url }),
        },
      );
      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return;
      }

      const data = await response.json();
      console.log(data);
      setError("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("something went wrong");
    }
  }

  return (
    <>
      <h1>User Dashboard</h1>
      <Link href={`/forum/${userId}`}>Forum</Link>
      <Link href={`/dashboard/${userId}`}>Dashboard</Link>
      <form onSubmit={handleUpload}>
        <input type="file" name="image" id="image" />
        <button type="submit">Submit</button>
      </form>
      {loading && <div>Loading ...</div>}
      {error && <div>{error}</div>}
    </>
  );
}
