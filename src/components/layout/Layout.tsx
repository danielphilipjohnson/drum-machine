import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  onSoundBankChange: (bank: string) => void;
  currentBank: string;
}

const Layout = ({ children, onSoundBankChange, currentBank }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar onSoundBankChange={onSoundBankChange} currentBank={currentBank} />

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>

      <footer className="bg-zinc-950 py-3 px-4 text-center text-zinc-500 text-sm">
        <p>Next.js Drum Machine &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
