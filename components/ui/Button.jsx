import Link from "next/link";
import classes from "./Button.module.css";

function Button(props) {
  //checks if button is a link and return link if accurate
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }
  //else, return a regular button
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
