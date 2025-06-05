import {
	Sparkles,
	Trophy,
	Code2,
	ScrollText,
	type LucideIcon,
	GraduationCap,
} from "lucide-react";
import type { Work } from "../app/works/workData";

export const categoryIconMap: Record<Work["category"], LucideIcon> = {
	採択: Sparkles,
	受賞: Trophy,
	開発: Code2,
	学内活動: GraduationCap,
	資格: ScrollText,
};

/** カテゴリ用アイコン（24 – 56 px で拡縮） */
export function CategoryIcon({
	category,
	size = 48,
	className,
	...rest
}: {
	category: Work["category"];
	size?: number;
	className?: string;
}) {
	const Icon = categoryIconMap[category];
	return <Icon size={size} strokeWidth={1.5} className={className} {...rest} />;
}
