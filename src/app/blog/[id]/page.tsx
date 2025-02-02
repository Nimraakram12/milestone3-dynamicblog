import posts from "../../../../post-details/data.json";
import Image from "next/image";
import { Clock4, User, CalendarDays } from "lucide-react";
import { Skeleton } from "@/Components/ui/skeleton";
import Comments from "@/Components/Comments";
import BlogAnimation from "@/Components/animations/BlogAnimation";

type Props = {
  params: Promise< {
    id: string; 
  }>;
};




export default async function AllBlog({ params }: Props) {

  const resolvedParams = await params; // Await the params if it's a Promise
  const { id } = resolvedParams;
  
 
  // Fetch the post data based on the dynamic route id
  const post = posts.find((p: any) => p.id === id);

  // Show a loading skeleton if the post is not found
  if (!post) return <Skeleton />;
  // this code is debugged by m.Anees

  return (
    <div className="pt-20 w-full">
      <div className="max-w-screen-md mx-auto py-20 px-10">
        <BlogAnimation>
          {/* Blog Title */}
          <h1 className="md:text-5xl sm:text-4xl text-2xl font-bold">
            {post.tittle}
          </h1>

          {/* Blog Metadata */}
          <div className="my-6 text-slate-600 flex flex-col sm:flex-row gap-6">
            <div className="flex gap-2">
              <User />
              <span>{post.author}</span>
            </div>
            <div className="flex gap-2">
              <CalendarDays />
              <span>11/3/24</span>
            </div>
            <div className="flex gap-2">
              <Clock4 />
              <span>2 min read</span>
            </div>
          </div>
        </BlogAnimation>

        <BlogAnimation>
          {/* Blog Image */}
          <Image
            src={post.src}
            alt={post.tittle}
            height={2000}
            loading="lazy"
            width={2000}
            className="w-full rounded-lg object-cover my-4"
          />

          {/* Blog Content */}
          <p className="text-2xl leading-relaxed py-10">{post.content}</p>
        </BlogAnimation>

        <BlogAnimation>
          {/* Comments Section */}
          <div className="mt-20">
            <Comments blogId={post.id} />
          </div>
        </BlogAnimation>
      </div>
    </div>
  );
}