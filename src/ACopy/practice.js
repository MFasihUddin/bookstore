import "./App.css";
import Firestore from "./Practice/Firestore";
import RealTime from "./Practice/RealTime";

function firestore() {
  return (
    <div className="App">
      <Firestore />
      <RealTime/>
    </div>
  );
}

export default firestore;
