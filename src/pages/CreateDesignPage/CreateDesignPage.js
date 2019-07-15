import React, { Component } from "react";
import ClientTemplate from "templates/ClientTemplate";
import CreateDesign from "components/Designs/CreateDesign";

class CreateDesignPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <CreateDesign />
     </ClientTemplate>
    );
  }
}

export default CreateDesignPage;
