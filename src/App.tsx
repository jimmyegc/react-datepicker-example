import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker";
import JSONEditor from "./components/ui/JSONEditor/JSONEditor";

export const App = () => {

  return (<>
    <div>      
      <div className="container">
        {/* <JsonConverter /> 
        */}
        <JSONEditor />
        <WFCDatePicker />
      </div>
    </div>
  </>)
}

export default App;
