interface TextProps {
    children: string;
}

function createMarkup(text: string) {
    return { __html: text };
}

export function HTMLInline(props: TextProps) {
    if (!props) {
        return <></>;
    }

    return <span dangerouslySetInnerHTML={createMarkup(props.children)} />;
}
