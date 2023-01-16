import { Button } from "./components/button";
import { Modal } from "./components/modal";
import TextItem from "./components/upload/fileList/TextItem";

function App() {
  return (
    <Modal>
      <div className="Modal-modal__quote flex flex-col">
        <div className="Modal-modal__title">Upload Files</div>
        <div className="Modal-modal__description">
          Upload documents you want to share with your
        </div>
      </div>
      <div className="flex justify-center items-center grid-row-2 Modal-modal__operation-container place-self-center flex-row">
        <div className="flex Modal-modal__operation flex-col justify-between items-center">
          <div>1</div>
          <div className="Modal-modal__operation__description">
            Drag and Drop here
          </div>
          <div className="Modal-modal__operation__description">-OR-</div>
          <Button type="primary">Browser Files</Button>
        </div>
      </div>

      <div className="flex flex-col justify-betwee grid-row-2 grid-col-2 Modal-modal__fileList place-self-center justify-between">
        <TextItem
          contentClassName="flex justify-around"
          className=" TextItem-textItem__outerWrap"
        />
        <TextItem
          contentClassName="flex justify-around"
          className=" TextItem-textItem__outerWrap"
        />
        <TextItem
          contentClassName="flex justify-around"
          className=" TextItem-textItem__outerWrap"
        />
        <TextItem
          contentClassName="flex justify-around"
          className=" TextItem-textItem__outerWrap"
        />
      </div>
      <div className="Modal-modal__subtitle grid-col-2 grid-row-2">
        Upload Files
      </div>
    </Modal>
  );
}

export default App;
