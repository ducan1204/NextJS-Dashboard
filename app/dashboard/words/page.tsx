import { Metadata } from "next";
import Quiz from "@/app/ui/words/quiz";

export const metadata: Metadata = {
  title: 'Words'
}

export default async function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Quiz/>
    </div>
  );
}
