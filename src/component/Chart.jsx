import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import supabase from "../supabaseClient";
import styles from "./Chart.module.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function Chart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [reg, fav, cart] = await Promise.all([
          supabase.rpc("count_by_month", { table_name: "profiles" }),
          supabase.rpc("count_by_month", { table_name: "favarites" }),
          supabase.rpc("count_by_month", { table_name: "shopping-cart" }),
        ]);

        const months = [
          ...new Set([
            ...(reg.data || []).map((r) => r.month),
            ...(fav.data || []).map((f) => f.month),
            ...(cart.data || []).map((c) => c.month),
          ]),
        ].sort((a, b) => new Date(`01 ${a}`) - new Date(`01 ${b}`));

        const registrations = months.map(
          (m) => reg.data?.find((r) => r.month === m)?.count || 0
        );
        const favorites = months.map(
          (m) => fav.data?.find((f) => f.month === m)?.count || 0
        );
        const carts = months.map(
          (m) => cart.data?.find((c) => c.month === m)?.count || 0
        );

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Registrations",
              data: registrations,
              backgroundColor: "#3498db",
            },
            {
              label: "Favorites",
              data: favorites,
              backgroundColor: "#2ecc71",
            },
            {
              label: "Cart Additions",
              data: carts,
              backgroundColor: "#e67e22",
            },
          ],
        });
      } catch (error) {
        console.error("Error loading chart data:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading chart...</p>;
  if (!chartData)
    return <p style={{ padding: "20px" }}>No data available to display.</p>;

  return (
    <div className={styles.chartContainer}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "#333",
                font: { size: 14 },
              },
            },
          },
          scales: {
            x: {
              ticks: { color: "#333", font: { size: 12 } },
              grid: { display: false },
            },
            y: {
              ticks: { color: "#333", font: { size: 12 } },
              grid: { color: "#eee" },
            },
          },
        }}
      />
    </div>
  );
}
