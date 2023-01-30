import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Task } from "../src/Components/TaskComponents";
import React from "react";
import { data } from "../src/Components/TaskComponents/Task";

export default function Home() {
  return (
    <React.Fragment>
      <div>
        <Task data={data} />
      </div>
    </React.Fragment>
  );
}
