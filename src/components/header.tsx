interface Props {
    // text?: string;
}

export default function Header({ ...props }: Props) {
    //const [text, setText] = useState('');

    return <header {...props}></header>;
}
