import { Header } from "../components/Header";

export function NotFound() {
  return (
    <div className="App max-h-screen bg-stone-200 overflow-hidden p-4">
      <Header />
      <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)] text-center font-bold bg-stone-200 text-green-900">
        <h1 className="text-8xl">404</h1>
        <p className="text-lg">Página não encontrada</p>
      </div>
    </div>
  );
}