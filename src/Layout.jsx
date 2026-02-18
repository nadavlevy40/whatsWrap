export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen overflow-y-auto">
      {children}
    </div>
  );
}