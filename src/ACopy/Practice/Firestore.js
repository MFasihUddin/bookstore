import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    doc,
    getDocs,
    query,
    where,
    updateDoc,
  } from "firebase/firestore";
  import { app } from "../firebase";
  
  const firestore = getFirestore(app);
  
  const writeData = async () => {
    const data = await addDoc(collection(firestore, "cities"), {
      name: "peshawar",
      pinCode: 25000,
      lat: 34,
      long: 71,
    });
    console.log("result", data);
  };
  
  const makeSubCollection = async () => {
    const subData = await addDoc(
      collection(firestore, "cities/M32GlDLxu8Do2AwI1SQj/place"),
      {
        name: "Uni Road",
        desc: "Big Mall Place",
        date: Date.now(),
      }
    );
    console.log("subData", subData);
  };
  
  const getDocument = async () => {
    const ref = doc(firestore, "cities", "M32GlDLxu8Do2AwI1SQj");
    const snap = await getDoc(ref);
    console.log(snap.data());
  };
  
  const getDocumentQuery = async () => {
    const collectionRef = collection(firestore, "users");
    const q = query(collectionRef, where("isMale", "==", true));
    const querySnap = await getDocs(q);
    querySnap.forEach((data) => console.log(data.data()));
  };
  
  const updateData = async () => {
    const docRef = doc(firestore, "users", "hV6atCFhstbmX4qAiMWP");
    await updateDoc(docRef, {
      Name: "saba",
      isMale: false,
    });
    console.log("updated");
  };
  
  function Firestore() {
    return (
      <div className="App">
        <h2>fireStore</h2>
        <button onClick={writeData}>put data</button>
        <button onClick={makeSubCollection}>makeSubCollection data</button>
        <button onClick={getDocument}>get data</button>
        <button onClick={getDocumentQuery}>get_document_query</button>
        <button onClick={updateData}>Update Data</button>
      </div>
    );
  }
  
  export default Firestore;
  