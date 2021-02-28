// import { useState } from "react";

interface Props {
    text: string;
}

export default function Button({ text, ...attributes }: Props) {
    //const [text, setText] = useState('');

    return <button {...attributes}>{text}</button>;
}
