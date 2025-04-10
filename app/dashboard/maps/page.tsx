

import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: 'Locations'
}

const Map = dynamic(() => import("@/app/ui/maps/map"), { ssr: false });

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Map/>
    </div>
  );
}
