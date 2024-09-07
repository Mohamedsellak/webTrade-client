import Sidebar from "./_components/useraside";
export default function AdminLayout({ children }) {
    return (
      <div className="h-screen antialiased bg-black" >
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-80 transition-all duration-300">
          { children } 
        </div>
      </div>
    );
}
