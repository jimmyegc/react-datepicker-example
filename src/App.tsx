import { Contact } from "./views/Contact/Contact";
import { WFCDatePicker } from "./views/WFCDatePicker/WFCDatePicker";

export const App = () => {
  
  return (<>
    <div>      
      <div className="container">
        <Contact />
        <WFCDatePicker /> 
      </div>
    </div>
  </>)
}


export default App;
