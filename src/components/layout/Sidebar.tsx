import Link from "next/link";
import { Menu, Search, Activity, Edit, Sliders } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

const SidebarButton = ({
  icon,
  label,
  active = false,
  href,
  onClick,
}: SidebarButtonProps) => {
  const button = (
    <button
      className={`w-full p-4 flex justify-center text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors ${
        active ? "bg-zinc-800 text-zinc-200" : ""
      }`}
      onClick={onClick}
      aria-label={label}
    >
      {icon}
    </button>
  );

  // If href is provided, wrap button in Link component
  if (href) {
    return (
      <Link href={href} className="block">
        {button}
      </Link>
    );
  }

  return button;
};

const Sidebar = () => {
  const pathname = usePathname();
  const currentPath = pathname;

  return (
    <aside className="bg-zinc-900 h-screen border-r border-zinc-800 w-16 flex flex-col">
      <div className="flex flex-col flex-1">
        <SidebarButton
          icon={<Menu size={20} />}
          label="Menu"
          href="/"
          active={currentPath === "/"}
        />

        <div className="mt-8 space-y-1">
          <SidebarButton
            icon={<Search size={20} />}
            label="Search"
            href="/search"
            active={currentPath === "/search"}
          />
          <SidebarButton
            icon={<Activity size={20} />}
            label="Signal"
            href="/"
            active={currentPath === "/"}
          />
          <SidebarButton
            icon={<Edit size={20} />}
            label="Edit"
            href="/edit"
            active={currentPath === "/edit"}
          />
        </div>
      </div>

      <div className="mb-8">
        <SidebarButton
          icon={<Sliders size={20} />}
          label="Settings"
          href="/settings"
          active={currentPath === "/settings"}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
