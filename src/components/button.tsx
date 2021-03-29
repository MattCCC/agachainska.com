/**
 * Interfaces
 */
interface Props {
    text: string;
}

/**
 * Component
 */
export default function Button({ text, ...attributes }: Props): JSX.Element {
    return <button {...attributes}>{text}</button>;
}
