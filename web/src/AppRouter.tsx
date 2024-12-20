import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import CreateGameMenu from "./components/ui/menus/create_game/CreateGameMenu";
import JoinGameMenu from "./components/ui/menus/join_game/JoinGameMenu";
import MainMenu from "./components/ui/menus/main/MainMenu";
import GameView from "./components/ui/views/GameView";

export default function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="" element={<MainMenu />} />
        <Route path="/join">
          <Route path="" element={<JoinGameMenu />} />
          <Route path=":gameId" element={<JoinGameMenu />} />
        </Route>
        <Route path="/create" element={<CreateGameMenu />} />
        <Route path="/play">
          <Route path="" element={<Navigate to="/join" />} />
          <Route path=":gameId" element={<GameView />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
