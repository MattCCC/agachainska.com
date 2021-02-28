/**
 * Interfaces
 */
interface Props {
    // text?: string;
}

/**
 * Component
 * @param props
 */
export function Header({ ...props }: Props) {
    //const [text, setText] = useState('');

    return <header {...props}></header>;
}
