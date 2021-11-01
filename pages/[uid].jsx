function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// no need to use getStaticPaths with getServersideProps,
// as no pages are pre-generated, as the getServerSideProps function is run with every request anyway
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
