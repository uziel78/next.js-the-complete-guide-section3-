import { useEffect, useState } from "react";
import useSWR from "swr";

// Note: props added due to optional getStaticProps function at the bottom
function LastSalesPage(props) {
  //commented out, as belongs to our custom hook that is commented out below
  // initial state "props.sales" comes from getStaticProps function at the bottom, used to set initial states before updates
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-5b745-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  // useEffect used to transform data from from firebase
  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //custom hook commented out, replaced by useSWR hook
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     "https://nextjs-course-5b745-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  //only used with useSWR
  if (error) {
    return <p>Failed to load...</p>;
  }

  //changed from "isLoading" no "data || no sales" with useSWR
  // change to OR (||) operator if not using getStatic Props for initial state
  if (!data && !sales) {
    return <p>Loading...</p>;
  }
  //used with custom hook only
  // if (!sales) {
  //   return <p>No data yet</p>;
  // }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

// optional function to get some initial content rendered server-side
// in combination with client-side data above
// note: getStaticProps cannot use useSWR, as this is a React hook(made for next.js). Fetch can be used however.
export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-5b745-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 30,
  };
}

export default LastSalesPage;
