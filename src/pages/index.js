import { Inter } from "next/font/google";
import UserPosts from "@/components/userPosts";
import DataAnalysis from "@/components/dataAnalysis";
import PostsSync from "@/components/postSync";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flexContainer flex">
        <UserPosts />
        <DataAnalysis />
        <PostsSync />
      </div>
    </main>
  );
}
