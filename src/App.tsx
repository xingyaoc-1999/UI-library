import { Modal } from "./components/modal";

import { Upload } from "./components/upload";

function App() {
  return (
    <Modal>
      <Upload url={""} listType='text' multiple/>
    </Modal>
  );
}

export default App;
