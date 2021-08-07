import { useEffect } from 'react';
import { removeList } from "../../utils/listOps";
import toggleDimmer from '../../utils/toggleDimmer';

interface Props {
  listToRemove: any;
  isEnabled: boolean;
  setIsEnabled: (arg: boolean) => void;
  refetchData: ()=>void;
}

const VerifyDelete = (props: Props) => {
  useEffect(()=>{
    toggleDimmer(props.isEnabled);
  });
  return (
    <>
      {props.isEnabled && (
        <div className="verify-delete__container">
          <div className="verify-delete">
            <span className="verify-delete__message">
              "<b>{props.listToRemove.listName}</b>" is not empty.
              <br />
              Are you sure you want to delete?
            </span>
            <div className="verify-delete__actions">
              <input
                className="verify-delete__confirm verify-delete__action-input"
                type="button"
                value="Yes"
                onClick={() => {
                  removeList(props.listToRemove.listId)
                  props.setIsEnabled(false);
                  props.refetchData();
                }}
              />
              <input
                className="verify-delete__cancel verify-delete__action-input"
                type="button"
                value="Cancel"
                onClick={() => {
                  props.setIsEnabled(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyDelete;
