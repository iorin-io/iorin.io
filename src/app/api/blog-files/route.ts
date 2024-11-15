export const runtime = "edge";

export async function GET() {
	try {
		const res = await fetch(`/blog/blogData.json`);
		const articles = await res.json();

		return new Response(JSON.stringify({ articles }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error fetching blog data:", error);
		return new Response(
			JSON.stringify({ error: "Unable to fetch blog data" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
