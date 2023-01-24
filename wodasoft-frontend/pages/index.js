import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Task } from "../src/Components/TaskComponents";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <div>
        <Task />
      </div>
    </React.Fragment>
  );
}
