export async function exportCSV(token: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/components/export`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to export CSV");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics.csv";
    document.body.appendChild(a);
    a.click();

    // Cleanup
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Export CSV error:", error);
    alert("You must be logged in to export analytics");
  }
}
