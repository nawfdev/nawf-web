import { PostForm } from "@/components/post-form";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-white">New post</h1>
      <PostForm />
    </div>
  );
}
