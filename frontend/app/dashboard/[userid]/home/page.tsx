"use client";

import { UploadOnS3 } from "@/services/S3";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard({ params }: { params: { userid: string } }) {
  const [userId, setUserId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>();
  const router = useRouter();

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
        console.log(data.user);
        setUser(data.user);
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
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const form_Data: any = Object.fromEntries(formData.entries());

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
      // request to flask api

      const response2 = await fetch(
        `${process.env.NEXT_PUBLIC_PYTHON_URL}/image`,
        {
          method: "POST",
          body: JSON.stringify({
            ImageUrl: image_url,
            Type: form_Data.image.type,
          }),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        setError("something went wrong");
        return;
      }
      const data2 = await response.json();

      const response3 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/report`,
        {
          method: "POST",
          body: JSON.stringify(data2),
        },
      );

      if (!response3.ok) {
        const data = await response.json();
        console.log(data);
        setError("something went wrong");
        return;
      }
      const data3 = await response.json();
      console.log(data3);

      router.push(`/dashboard/${userId}/chat/${data3.reportid}`);
    } catch (err) {
      setLoading(false);
      setError("something went wrong");
    }
  }

  return (
    <main className="font-sans container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <Card className="mb-8 flex-1">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {user && user.Name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>
                {user && user.Email}
              </p>
              <p>
                <span className="font-semibold">User ID:</span>
                {user && user.UserID}
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Upload Section */}

        <div className="mb-8 flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Scan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6 border-2 border-lime-400 border-dashed rounded-lg">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                />
                <label htmlFor="file-upload">
                  <form
                    onSubmit={handleUpload}
                    className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto"
                  >
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-lime-400 text-black hover:text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-lime-500"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Media
                    </button>
                    {loading && (
                      <div className="text-lime-400 mt-2 font-semibold animate-pulse">
                        Loading ...
                      </div>
                    )}
                    {error && (
                      <div className="text-red-500 mt-2 font-semibold">
                        {error}
                      </div>
                    )}
                  </form>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Previous Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user &&
              user.Reports &&
              user.Images.map((image: string, index: number) => (
                <Link
                  href={`/dashboard/${userId}/${user.Reports[index]}` || ""}
                  key={index}
                >
                  <div className="relative h-48 rounded-lg overflow-hidden hover:opacity-75 transition-opacity border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Scan ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
