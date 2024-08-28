import Image from "next/image";
import Nav from "./_components/guestNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-cover" style={{ backgroundImage:"url('/assets/images/grid.png')" }}>
      <Nav />
      <div>
        the rest of the content
      </div>
    </main>
  );
}
