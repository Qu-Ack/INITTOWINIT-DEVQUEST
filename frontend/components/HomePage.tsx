"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function HomePage() {
  const userData = {
    Email: "dakshsangal@gmail.com",
    ID: "678b5e328239a70ff77b3d1a",
    Images: [
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
      "https://kanteentest.s3.amazonaws.com/3gQV8eZz",
    ],
    Name: "Daksh Sangal",
    UserID: "100351840261753903032",
  };

  return (
    <main className="font-sans container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Profile Section */}

        <Card className="mb-8 flex-1">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {userData.Name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userData.Email}
              </p>
              <p>
                <span className="font-semibold">User ID:</span>{" "}
                {userData.UserID}
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
                  <Button className="flex items-center gap-2 bg-lime-400 text-black hover:text-white">
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Button>
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
            {userData.Images.map((image, index) => (
              <Link href={`@/test/report/`} key={index}>
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
