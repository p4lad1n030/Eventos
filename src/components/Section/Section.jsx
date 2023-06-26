import React from "react";
import { connect } from "react-redux";

const Section = (props) => {
  const email =props.userEmail;
  const user =props.userLogin;
   

  return (
    <section className="text-center">
      <h1 className="my-4">{email}</h1>
      <h1 className="my-4">logado: {user}</h1>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    userEmail: state.isLog.userEmail,
    userLogin: state.isLog.userLogin,
  };
}

export default connect(mapStateToProps)(Section);
