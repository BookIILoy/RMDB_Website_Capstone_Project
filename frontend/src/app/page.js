import Header from "./Header/header";
import NowPlaying from "./Home/nowplaying";
import PopularHomePage from "./Home/popularPage";
import UpComingMovie from "./Home/upcoming";

export default function Home() {
  return (
    <main className="container mx-auto my-auto flex min-h-screen flex-col items-center justify-between p-[2rem]">
      <div className="">
      <NowPlaying />
      <PopularHomePage />
      <UpComingMovie />
      </div>
    </main>
  );
}
