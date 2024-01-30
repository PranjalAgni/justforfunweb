import React from "react";
import { routes } from "../../routes";
import { Link } from "wouter";
function Home() {
  return (
    <div>
      <ul>
        {routes.map((route, idx) => (
          <li key={idx}>
            <Link href={route.path} className="active">
              {route.name.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
