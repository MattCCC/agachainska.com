// import { useState } from "react";

/**
 * Interfaces
 */
interface Props {
    text: string;
}

/**
 * Component
 * @param props
 */
export default function Button({ text, ...attributes }: Props) {
    //const [text, setText] = useState('');

    return <button {...attributes}>{text}</button>;
}
