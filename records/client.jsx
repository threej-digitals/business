import { RecordsContext } from "@/context/record";
import { useContext } from "react";

export default function ClientRecord() {
  const records = useContext(RecordsContext);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Add</th>
              <th>GST</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
