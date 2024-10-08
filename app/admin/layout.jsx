import Sidebar from "./_components/adminaside";
export default function AdminLayout({ children }) {
    return (
      <div className="flex h-screen overflow-x-auto antialiased" style={{ backgroundColor:"#0d0d0d" }}>
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-80 transition-all duration-300">
        { children } 
      </div>
    </div>
    );
  }
  