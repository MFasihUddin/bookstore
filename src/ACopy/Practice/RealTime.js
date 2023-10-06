import { useFirebase } from "../context/Firebase";

function RealTime() {
  const { putData } = useFirebase();
  const putDataNew = () => {
    putData("grandfather/father/child", { id: 1, name: "fasih" });
  };
  return (
    <div>
      <h1>RealTime Database</h1>
      <button onClick={putDataNew}>Put new data</button>
    </div>
  );
}

export default RealTime;
