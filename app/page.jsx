import TimerForm from "./components/TimerForm";
import { TimerList } from "./components/TimerList";
import PixelClock from "./styles/PixelClock";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-6 right-6 ">
        <PixelClock />
      </div>
      <div className="absolute bottom-6 right-6 ">
        <PixelClock />
      </div>
      <div className="absolute top-6 left-6 ">
        <PixelClock />
      </div>
      <div className="absolute bottom-6 left-6 ">
        <PixelClock />
      </div>
      <TimerForm />
      <TimerList />
    </main>
  );
}
