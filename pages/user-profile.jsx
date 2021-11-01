function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

//only executes on the server after deployment
export async function getServerSideProps(context) {
  // req and res are default node.js objects used to handle requests
  const { params, req, res } = context;

  //console.log(req);
  //console.log(res);
  //just to show that the code is run in the terminal, even though page is not pre-generated
  console.log("Server side code");

  return {
    props: {
      username: "max",
    },
  };
}
