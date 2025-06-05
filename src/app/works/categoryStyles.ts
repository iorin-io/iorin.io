import type { Work } from "../../app/works/workData";
import { css } from "../../../styled-system/css";

export const categoryStyles: Record<Work["category"], string> = {
	採択: css({ bg: "green.200", color: "green.800" }),
	受賞: css({ bg: "yellow.200", color: "yellow.800" }),
	開発: css({ bg: "purple.200", color: "purple.800" }),
	学内活動: css({ bg: "indigo.200", color: "indigo.800" }),
	資格: css({ bg: "red.200", color: "red.800" }),
};
