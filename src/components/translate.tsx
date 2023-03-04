import { Fragment } from "react";

import { useTranslation } from "next-i18next";

interface TranslateProps {
  id: string;
  props?: object;
}

export const Translate = ({ id, ...props }: TranslateProps) => {
  const { t } = useTranslation();

  return (<Fragment>{t(id, props)}</Fragment>);
};
