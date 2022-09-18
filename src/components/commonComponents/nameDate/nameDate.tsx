import React from "react";
import { RowDiv } from "../rowDiv";

export function NameDate({ date }: { date: string }) {
  return (
    <div>
      <p>Joshua Gao - {date}</p>
    </div>
  );
}
