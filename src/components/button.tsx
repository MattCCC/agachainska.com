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
export default function Button({ text, ...attributes }: Props): JSX.Element {
    return <button {...attributes}>{text}</button>;
}
