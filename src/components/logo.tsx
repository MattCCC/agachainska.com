import { useStoreProp } from "store/index";

import { useRouter } from "next/router";

import { Link } from "components/link";
import { Translate } from "components/translate";
import { getLinkProps } from "utils/route";

export function Logo() {
    const [showLogoOnDesktop] = useStoreProp("showLogoOnDesktop");
    const location = useRouter();
    const homeLink = getLinkProps("home", location);

    return (
        <div className="flex items-center h-12 text-primary">
            <div
                className={`animate-logo subpixel-antialiased select-none font-flight text-[24px] text-primary leading-[30px] hidden${
                    showLogoOnDesktop ? " lg:block" : ""
                }`}
            >
                <Link {...homeLink}>
                    <Translate id="header.title" />
                </Link>
            </div>
            <div
                className={
                    "block text-center rounded-full select-none font-fbold text-tertiary bg-primary text-[18px] lg:leading-5 lg:hidden w-[48px] h-[48px] leading-[48px]"
                }
            >
                <Link {...homeLink}>
                    <Translate id="header.logo.title" />
                </Link>
            </div>
        </div>
    );
}
