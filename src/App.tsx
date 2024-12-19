import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker";
import JsonConverter from "./components/ui/JsonConverter/JsonConverter";

export const App = () => {

  return (<>
    <div>      
      <div className="container">
        {/* <JsonConverter /> */}
        <WFCDatePicker /> 
      </div>
    </div>
  </>)
}

export default App;
