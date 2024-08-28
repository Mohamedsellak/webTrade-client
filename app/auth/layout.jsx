import Nav from "../_components/guestNav";

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <div>{children}</div>
    </div>
  );
}
