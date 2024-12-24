import { useState, useEffect } from "react";
import axios from "../api/axios";

type User = {
  username: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
