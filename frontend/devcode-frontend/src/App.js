import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import ContributeQuestion from "./pages/contribute_a_question";
import Login from "./pages/login";
import PastContests from "./pages/past_contests";
import UpcomingContest from "./pages/upcoming_contest";
import CodePlayground from "./pages/code_playground";
import Profile from "./pages/profile";
const router=createBrowserRouter([
  {path:"/",element:<Home></Home>},
  {path:"/about",element:<About></About>},
  {path:"/contribute",element:<ContributeQuestion></ContributeQuestion>},
  {path:"/login",element:<Login></Login>},
  {path:"/pastcontests",element:<PastContests></PastContests>},
  {path:"/upcomingcontest",element:<UpcomingContest></UpcomingContest>},
  {path:"/question/:qId/:cId/:uId",element:<CodePlayground></CodePlayground>},
  {path:"/profile",element:<Profile></Profile>}
]);
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;