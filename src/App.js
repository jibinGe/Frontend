import "./App.css";
import Header from "./components/Embryo/Header";
import Welcome from "./components/Welcome";
import AddPatients from "./components/AddPatients";
import Embryos from "./components/Embryo/index";
import Embryo from "./components/Embryos";
//import Edit from './components/Edit';
import Sidebar from "./components/Clinic/Admin/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation, useNavigate
} from "react-router-dom";
import Report from "./components/Clinic/Admin/report";
import Detail from "../src/components/Patient/Report/Details";
import EmbryoScore from "./components/Patient/Report/EmbryoScore";
import Download from "./components/helpers/Download";
import Login from "../src/components/Login";
import NotFound from "../src/components/NotFound";
import Discription from "../src/components/Patient/Report/Discription";
import DataContext from "./controllers/DataContext";
import { UserContext } from "./controllers/UserContext";
import Welcome1 from "./components/Patient/Report/Welcome";
import Pdfviewer from "./components/Patient/MainReportView";
import ReportDownload from "./components/Patient/ReportDownload";
import ReportPrint from "./components/Patient/ReportPrint";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Cookies from "js-cookie";
import { useState } from "react";
function App() {
  const [data, setData] = useState({});
  const [selectedButton, setSelectedButton] = useState(3);

  function MainLayout() {
    const location = useLocation();
    const history = useNavigate();
    const checkLocalStorageKey = () => {
      if (!localStorage.getItem('clinic')) {
        Cookies.set('access_token', '', { expires: -1 });
          Cookies.set('common_data', '', { expires: -1 });
         history("/");
      }  
      if (!Cookies.get('access_token')) {
        localStorage.setItem("clinic", []);
        history("/");
      }
      

    };

    checkLocalStorageKey();


    return (
      <>
        
          <NotificationContainer />
          {location.pathname !== "/MainReport" &&
            location.pathname !== "/ReportDownload" &&
            location.pathname !== "/ReportPrint" && <Header />}
          <div>
            <Routes>
              <Route path="/" element={<Login />} exact />
              <Route path="/welcome" element={<Welcome />} exact />
              <Route path="/addPatients" element={<AddPatients />} />
              <Route
                path="/upload-images"
                element={<Embryos isPresent={false} />}
              />
              <Route
                path="/embryo"
                element={<Embryo setSelectedButton={setSelectedButton} />}
              />
              <Route
                path="/embryos"
                element={<Embryos setSelectedButton={setSelectedButton} />}
              />
              <Route path="/sidebar" element={<Sidebar />} />
              <Route
                path="/report"
                element={<Report setSelectedButton={setSelectedButton} />}
              />
              <Route path="/detail" element={<Detail />} />
              <Route path="/score" element={<EmbryoScore />} />
              <Route path="/download" element={<Download />} />
              <Route path="/des" element={<Discription />} />
              <Route path="/wel" element={<Welcome1 />} />
              <Route path="/MainReport" element={<Pdfviewer />} />
              <Route path="/ReportDownload" element={<ReportDownload />} />
              <Route path="/ReportPrint" element={<ReportPrint />} />
              <Route path="/not-found" element={<NotFound />} />
            </Routes>
          </div>
       
      </>
    );
  }

  return (
    <DataContext.Provider value={{ data, setData }}>
      <div>
        <Router>
          <MainLayout />
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;
