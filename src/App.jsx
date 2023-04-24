import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar"
import Step1 from "./components/Steps/Step1"
import Step2 from "./components/Steps/Step2"
import Step3 from "./components/Steps/Step3"
import Step4 from "./components/Steps/Step4"
import Step5 from "./components/Steps/Step5"

const App = () => {
    return (
        <div className="wrapper">
            <Sidebar />

            <div className="step-page">
                <Routes>
                    

                    <Route path="/" element={<Step1 />} />
                    <Route path="/step/2" element={<Step2 />} />
                    <Route path="/step/3" element={<Step3 />} />
                    <Route path="/step/4" element={<Step4 />} />
                    <Route path="/step/5" element={<Step5 />} />
                    
                </Routes>
            </div>

        </div>
    )
}

export default App