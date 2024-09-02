import Sidebar from "./_components/useraside";
export default function AdminLayout({ children }) {
    return (
      <div className="flex flex-col md:flex-row h-screen overflow-x-auto antialiased" style={{ backgroundColor:"#0d0d0d" }}>
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-80 transition-all duration-300">
          { children } 
        </div>
      </div>
    );
}
