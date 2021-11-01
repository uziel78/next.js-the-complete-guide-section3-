import path from "path";
// node.js module
import fs from "fs/promises";
//imports file system module from node.js (core node.js module).

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  //super easy loading to use instead of react state management
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  // access url keys/values from context/params/dynamic url values
  // param values is her extracted server-side and not in the browser
  // getStaticProps runs before the component function runs, ideal for preparing data
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  //if product not found, go to 404 page
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// page-restricted function that is required to pre-generate dynamic paths
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,

    //hardcoded examples below
    //[
    // { params: { pid: "p1" } },
    // { params: { pid: "p2" } },
    // { params: { pid: "p3" } },]

    // fallback set to true lets you generate not listed paths, but these ar not pre-generated.
    // They are instead only generated when needed.
    fallback: true,
    // "blocking" can be used instead, in which case the page will not render until everything is loaded.
    // if (!loadedProduct) check above can be removed withy "blocking".
  };
}

export default ProductDetailPage;
