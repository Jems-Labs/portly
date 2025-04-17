import Sidebar from "./_components/Sidebar";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-3">
        <Sidebar />
        {children}
    </div>
  );
}
