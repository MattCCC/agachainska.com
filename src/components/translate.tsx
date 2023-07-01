import { Fragment } from "react";
import { TranslationKeys, useTranslation } from "hooks/use-translation";

interface TranslateProps {
    id: string;
}

export const Translate = ({ id }: TranslateProps) => {
    const { t } = useTranslation();

    return <Fragment>{t(id as TranslationKeys)}</Fragment>;
};
