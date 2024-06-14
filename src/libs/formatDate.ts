export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
};
