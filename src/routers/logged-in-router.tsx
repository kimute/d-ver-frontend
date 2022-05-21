import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => (
    <div>
        <h1>Logged In</h1>
        <form>
            <input 
              name="email"/>
        </form>
    </div>
);