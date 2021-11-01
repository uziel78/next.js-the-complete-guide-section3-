import path from "path";
// node.js module
import fs from "fs/promises";
//imports file system module from node.js (core node.js module).
import Link from "next/link";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// getStaticProps is a page function that executed on the server-side and
// it and any code within is never visible to the client (although props are passed along).
// on server-side, on cane work with the file system (se fs import above).

export async function getStaticProps(context) {
  //construct filePath using node.js objects, finding current working directory
  // and establishing a path from here. node.js will treat current files as if in root dir by default (not in pages folder),
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // shows update in development server
  console.log("(RE-)Generating...");

  // using the redirect key to take one to new page if no data
  if (!data) {
    return {
      redirect: {
        destination: "/redirect-path",
      },
    };
  }

  // example if no object returned from props, automatically takes one to the 404 page.
  if (data.products.length === 0) {
    return { notFound: true };
  }

  // return object
  return {
    props: {
      products: data.products,
    },
    // second key used to update content on page every X seconds (optional)
    // note: development server always runs with latest data
    revalidate: 60,
  };
}

export default HomePage;
