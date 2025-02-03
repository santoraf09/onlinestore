import React from "react";

const button = ({ text, onclick }) => {
    return <button onclick={onclick}>{text}</button>;
};

export default button;