export async function downloadCSV(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/components/export`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "tracking.csv";
  a.click();
}
