import React from "react";
import useContactReducer from "../../custom_hooks/useContactReducer";

const ContactDetails = ({ contact }) => {
  const { id, con_method, con_address } = contact;
  const { removeContact } = useContactReducer();

  return (
    <div className="panel" onClick={() => removeContact(id)}>
      <div className="jc">
        {con_method}: {con_address}
      </div>
    </div>
  );
};

export default ContactDetails;
